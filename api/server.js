#!/usr/bin/env node
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Import constants and services
const {
  ENV,
  API,
  SECURITY,
  MESSAGES,
  LOGGING
} = require('./constants');

// Create local copies of constants with fallback values
const localSecurity = {
  ...SECURITY,
  HELMET_CSP: SECURITY?.HELMET_CSP || false
};

const localMessages = {
  ...MESSAGES,
  HEALTH: {
    STATUS: MESSAGES?.HEALTH?.STATUS || 'OK',
    MESSAGE: MESSAGES?.HEALTH?.MESSAGE || 'Server is running!'
  }
};

const localApi = {
  ...API,
  ENDPOINTS: {
    HEALTH: API?.ENDPOINTS?.HEALTH || '/health',
    CONFIG: API?.ENDPOINTS?.CONFIG || '/api/config'
  }
};

const localEnv = {
  ...ENV,
  IS_VERCEL: ENV?.IS_VERCEL || (process.env.VERCEL === '1'),
  IS_DEV: ENV?.IS_DEV || (process.env.NODE_ENV === 'development'),
  IS_PROD: ENV?.IS_PROD || (process.env.NODE_ENV === 'production')
};

const localLogging = {
  ...LOGGING,
  FORMAT: LOGGING?.FORMAT || 'combined',
  LEVEL: LOGGING?.LEVEL || 'info'
};





// Dynamic configuration from environment variables
const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cashfreeMode: process.env.CASHFREE_MODE || 'production',
  cashfreeClientId: process.env.CASHFREE_CLIENT_ID,
  cashfreeClientSecret: process.env.CASHFREE_CLIENT_SECRET,
  productName: process.env.PRODUCT_NAME || 'Samadhan Hub - Wellness Guide',
  productPrice: process.env.PRODUCT_PRICE,
  productCurrency: process.env.PRODUCT_CURRENCY || 'INR',
  productPdfFileName: process.env.PRODUCT_PDF_FILENAME || 'samadhan-wellness-guide-2025.pdf',
  productDescription: process.env.PRODUCT_DESCRIPTION || 'Complete wellness guide with ancient and modern wellness practices',
  returnUrl: process.env.RETURN_URL,
  domain: process.env.DOMAIN || 'localhost:5000',
  protocol: process.env.PROTOCOL || 'http',
  // Add missing properties that the code references
  server: {
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    enableSSR: process.env.ENABLE_SSR !== 'false',
    enableCors: process.env.ENABLE_CORS !== 'false',
    enableHelmet: process.env.ENABLE_HELMET !== 'false',
    enableLogging: process.env.ENABLE_LOGGING !== 'false',
    enableRateLimiting: process.env.ENABLE_RATE_LIMITING === 'true'
  },
  api: {
    version: process.env.API_VERSION || 'v1',
    rateLimit: parseInt(process.env.API_RATE_LIMIT || '100'),
    timeout: parseInt(process.env.API_TIMEOUT || '30000')
  },
  mode: process.env.APP_MODE || (process.env.NODE_ENV === 'production' ? 'prod' : 'dev'),
  environment: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://samadhanhub.com'),
    credentials: process.env.NODE_ENV === 'development',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
  }
};

console.log(config);
// Validate required configuration
const requiredConfig = ['cashfreeClientId', 'cashfreeClientSecret'];
const missingConfig = requiredConfig.filter(key => !config[key]);

if (missingConfig.length > 0) {
  console.error(`❌ Missing required configuration: ${missingConfig.join(', ')}`);
  console.error('Please check your .env file');
  process.exit(1);
}

const app = express();

// API Routes
app.get(localApi.ENDPOINTS.HEALTH, (req, res) => {
  res.json({
    status: localMessages.HEALTH.STATUS,
    message: localMessages.HEALTH.MESSAGE,
    mode: config.mode,
    environment: config.environment,
    timestamp: new Date().toISOString()
  });
});

// Configuration API
app.get(localApi.ENDPOINTS.CONFIG, (req, res) => {
  try {
    const envVars = process.env;
    const safeConfig = {};

    Object.keys(envVars).forEach(key => {
      const value = envVars[key];
      const isSensitive = localSecurity.SENSITIVE_KEYS.some(sensitive =>
        key.toUpperCase().includes(sensitive)
      );

      if (isSensitive) {
        safeConfig[key] = value ? localSecurity.MASKED_VALUE : value;
      } else {
        safeConfig[key] = value;
      }
    });

    const response = {
      mode: config.mode,
      environment: config.environment,
      timestamp: new Date().toISOString(),
      server: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        port: config.server.port,
        host: config.server.host,
      },
      features: {
        ssr: config.server.enableSSR,
        api: true,
        cors: config.server.enableCors,
        helmet: config.server.enableHelmet,
        logging: config.server.enableLogging,
        rateLimiting: config.server.enableRateLimiting,
      },
      deployment: {
        isVercel: localEnv.IS_VERCEL,
        isDev: localEnv.IS_DEV,
        isProd: localEnv.IS_PROD,
        enableCDN: process.env.ENABLE_CDN === 'true',
        enableCompression: process.env.ENABLE_COMPRESSION === 'true',
      },
      api: {
        version: config.api.version,
        rateLimit: config.api.rateLimit,
        timeout: config.api.timeout,
      },
      variables: safeConfig,
      computed: {
        isProduction: localEnv.IS_PROD,
        isDevelopment: localEnv.IS_DEV,
        isVercel: localEnv.IS_VERCEL,
        port: config.server.port,
        corsOrigin: config.cors.origin,
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Config API Error:', error);
    res.status(500).json({
      error: 'Failed to load configuration',
      message: error.message
    });
  }
});

// Test API endpoint
app.get('/api/test', (req, res) => {
  console.log('🔍 Test API endpoint hit:', req.path);
  res.json({
    success: true,
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    server: 'unified-server',
    environment: config.nodeEnv
  });
});

// Test payment config endpoint
app.get('/api/payments/test', (req, res) => {
  console.log('🔍 Test payment endpoint hit:', req.path);
  res.json({
    success: true,
    message: 'Payment test endpoint working!',
    timestamp: new Date().toISOString(),
    server: 'unified-server',
    environment: config.nodeEnv
  });
});

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    server: 'unified-server',
    environment: config.nodeEnv
  });
});

// Middleware configuration
if (config.server.enableHelmet) {
  app.use(helmet({
    contentSecurityPolicy: localSecurity.HELMET_CSP,
  }));
}

// Always enable CORS in Vercel
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

if (config.server.enableLogging) {
  app.use(morgan(localLogging.FORMAT));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle CORS preflight requests
app.options('*', cors());

// Build paths
const mainDistPath = path.join(__dirname, '..', 'client-agnivirya', 'dist');
const clientDistPath = path.join(__dirname, '..', 'client-agnivirya', 'dist');

// Security middleware (only in production)
if (config.nodeEnv === 'production') {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        connectSrc: ["'self'", "https://sandbox.cashfree.com", "https://api.cashfree.com"],
      },
    },
  }));

  // Rate limiting for production
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api/', limiter);
}

// Middleware - only apply compression to non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
    // Skip compression for API routes
    return next();
  }
  // Apply compression for non-API routes
  compression()(req, res, next);
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${path} - ${ip}`);
  
  // Add additional logging for API routes
  if (path.startsWith('/api/')) {
    console.log(`🔍 API Route Request: ${method} ${path}`);
    console.log(`🔍 Headers:`, req.headers);
    console.log(`🔍 Request ID: ${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  }
  
  next();
});

// Payment API Routes
app.get('/api/payments/config', async (req, res) => {
  try {
    console.log('🔍 Payment config endpoint hit:', req.path);
    console.log('🔍 Request method:', req.method);
    console.log('🔍 Request headers:', req.headers);
    console.log('🔍 Request ID:', Date.now());
    
    // CRITICAL: Ensure this is an API request, not a static file request
    if (req.path.startsWith('/api/')) {
      console.log('✅ Confirmed: This is an API request');
    } else {
      console.log('❌ ERROR: This should not happen - API route being treated as non-API');
    }
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      console.log('🔍 Handling OPTIONS request');
      res.status(200).end();
      return;
    }

    // Dynamic return URL - prioritize config.returnUrl, then build from domain
    let dynamicReturnUrl;
    if (config.returnUrl) {
      dynamicReturnUrl = config.returnUrl;
    } else {
      // Build return URL using the same domain logic as /api/config
      const isVercel = process.env.VERCEL === '1';
      const isLocal = config.nodeEnv === 'development';

      let domain;
      if (config.domain) {
        // Use explicitly set DOMAIN from environment (highest priority)
        domain = config.domain;
        console.log(`🔒 Using explicit DOMAIN: ${domain}`);
      } else if (isVercel && process.env.VERCEL_URL) {
        // Fallback to VERCEL_URL only if DOMAIN is not set
        domain = process.env.VERCEL_URL;
        console.log(`🔄 Using VERCEL_URL: ${domain}`);
      } else if (isLocal) {
        // Local development
        domain = 'localhost:5000';
        console.log(`🏠 Using localhost: ${domain}`);
      } else {
        // Production fallback
        domain = 'samadhanhub.com';
        console.log(`🌍 Using production fallback: ${domain}`);
      }

      const protocol = isVercel ? 'https' : (isLocal ? 'http' : 'https');
      dynamicReturnUrl = `${protocol}://${domain}/download`;
    }

    const response = {
      mode: config.cashfreeMode,
      clientId: config.cashfreeClientId || 'CONFIGURED',
      product: {
        name: config.productName,
        price: config.productPrice,
        currency: config.productCurrency,
        description: config.productDescription,
        pdfFileName: config.productPdfFileName,
      },
      returnUrl: dynamicReturnUrl,
      environment: config.nodeEnv,
      domain: config.domain,
      server: 'unified-server',
      debug: {
        endpoint: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
      }
    };
    
    console.log('🔍 Sending payment config response:', JSON.stringify(response, null, 2));
    
    // CRITICAL: Double-check response headers
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    console.log('🔍 Response headers set:', {
      'Content-Type': res.getHeader('Content-Type'),
      'Cache-Control': res.getHeader('Cache-Control'),
      'Pragma': res.getHeader('Pragma'),
      'Expires': res.getHeader('Expires')
    });
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Payment config error:', error);
    res.status(500).json({ error: 'Failed to get payment config' });
  }
});

app.post('/api/payments/initiate', async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const { customerName, customerEmail, customerPhone, amount, currency, productName, returnUrl } = req.body;

    // Validate input
    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ error: 'Missing required customer information' });
    }

    // Get Cashfree credentials from configuration
    const clientSecret = config.cashfreeClientSecret;
    const clientId = config.cashfreeClientId;
    const cashfreeMode = config.cashfreeMode;

    if (!clientSecret || !clientId) {
      console.error('❌ CRITICAL: Cashfree credentials not configured!');
      return res.status(500).json({ error: 'Payment system not configured' });
    }

    // Determine the correct Cashfree API URL based on mode
    const cashfreeBaseUrl = cashfreeMode === 'production'
      ? 'https://api.cashfree.com'
      : 'https://sandbox.cashfree.com';

    console.log(`🔄 Using Cashfree ${cashfreeMode.toUpperCase()} mode: ${cashfreeBaseUrl}`);

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Dynamic return URL - prioritize returnUrl from request, then config.returnUrl, then build from domain
    let dynamicReturnUrl;
    if (returnUrl) {
      dynamicReturnUrl = returnUrl;
    } else if (config.returnUrl) {
      dynamicReturnUrl = config.returnUrl;
    } else {
      // Build return URL using the same domain logic
      const isVercel = process.env.VERCEL === '1';
      const isLocal = config.nodeEnv === 'development';

      let domain;
      if (config.domain) {
        // Use explicitly set DOMAIN from environment (highest priority)
        domain = config.domain;
        console.log(`🔒 Using explicit DOMAIN: ${domain}`);
      } else if (isVercel && process.env.VERCEL_URL) {
        // Fallback to VERCEL_URL only if DOMAIN is not set
        domain = process.env.VERCEL_URL;
        console.log(`🔄 Using VERCEL_URL: ${domain}`);
      } else if (isLocal) {
        // Local development
        domain = 'localhost:5000';
        console.log(`🏠 Using localhost: ${domain}`);
      } else {
        // Production fallback
        domain = 'samadhanhub.com';
        console.log(`🌍 Using production fallback: ${domain}`);
      }

      const protocol = isVercel ? 'https' : (isLocal ? 'http' : 'https');
      dynamicReturnUrl = `${protocol}://${domain}/download`;
    }

    // Build notify URL using the same domain logic
    const isVercel = process.env.VERCEL === '1';
    const isLocal = config.nodeEnv === 'development';

    let notifyDomain;
    if (config.domain) {
      // Use explicitly set DOMAIN from environment (highest priority)
      notifyDomain = config.domain;
      console.log(`🔒 Using explicit DOMAIN for notify: ${notifyDomain}`);
    } else if (isVercel && process.env.VERCEL_URL) {
      // Fallback to VERCEL_URL only if DOMAIN is not set
      notifyDomain = process.env.VERCEL_URL;
      console.log(`🔄 Using VERCEL_URL for notify: ${notifyDomain}`);
    } else if (isLocal) {
      // Local development
      notifyDomain = 'localhost:5000';
      console.log(`🏠 Using localhost for notify: ${notifyDomain}`);
          } else {
        // Production fallback
        notifyDomain = 'samadhanhub.com';
        console.log(`🌍 Using production fallback for notify: ${notifyDomain}`);
      }

    const notifyProtocol = isVercel ? 'https' : (isLocal ? 'http' : 'https');
    const dynamicNotifyUrl = `${notifyProtocol}://${notifyDomain}/api/payments/webhook`;

    // Create payment session with Cashfree
    const requestBody = {
      order_id: orderId,
      order_amount: parseFloat(amount || config.productPrice),
      order_currency: currency || config.productCurrency,
      customer_details: {
        customer_id: `customer_${Date.now()}`,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone
      },
      order_meta: {
        return_url: dynamicReturnUrl,
        notify_url: dynamicNotifyUrl,
        payment_methods: "cc,dc,nb,upi,paylater,emi,cardlessemi"
      }
    };

    console.log('🔄 Creating Cashfree payment session with data:', JSON.stringify(requestBody, null, 2));

    // Step 1: Create the order first
    console.log('🔄 Step 1: Creating Cashfree order...');
    const orderResponse = await fetch(`${cashfreeBaseUrl}/pg/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json().catch(() => ({}));
      console.error('❌ Cashfree Order Creation Error:', orderResponse.status, errorData);
      throw new Error(`Cashfree Order Creation Error: ${orderResponse.status} - ${errorData.message || 'Unknown error'}`);
    }

    const orderResult = await orderResponse.json();
    console.log('✅ Cashfree order created successfully:', JSON.stringify(orderResult, null, 2));

    // Check if payment session is already created automatically
    if (orderResult.payment_session_id) {
      console.log('🎉 Payment session already created automatically by Cashfree!');
      console.log(`   Payment Session ID: ${orderResult.payment_session_id}`);

      // Extract the payment session ID from the order response
      const sessionId = orderResult.payment_session_id;

      if (!sessionId) {
        console.error('❌ No payment_session_id in order response:', orderResult);
        throw new Error('Payment session ID not received from Cashfree order creation');
      }

      // Construct the payment URL manually since Cashfree doesn't return payment_link in order response
      const paymentUrl = `https://checkout.cashfree.com/pg/view/sessions/${sessionId}`;
      console.log(`🔗 Constructed payment URL: ${paymentUrl}`);

      console.log('✅ Using existing payment session from order creation');

      res.status(200).json({
        success: true,
        paymentUrl: paymentUrl,
        orderId: orderId,
        cfOrderId: orderResult.cf_order_id, // Cashfree's order ID
        sessionId: sessionId,
        message: 'Payment session created successfully (automatic)',
        mode: cashfreeMode,
        environment: config.nodeEnv,
        domain: config.domain,
        server: 'unified-server'
      });
      return;
    }

    // If no automatic payment session, then create one manually (fallback)
    console.log('⚠️ No automatic payment session, creating manually...');

    // Extract order ID from the created order - use cf_order_id as priority
    const createdOrderId = orderResult.cf_order_id || orderResult.order_id;
    if (!createdOrderId) {
      console.error('❌ No order_id in order creation response:', orderResult);
      throw new Error('Order ID not received from Cashfree order creation');
    }

    console.log(`🔍 Order ID Debug:`);
    console.log(`   Our custom order_id: ${orderResult.order_id}`);
    console.log(`   Cashfree cf_order_id: ${orderResult.cf_order_id}`);
    console.log(`   Using for payment session: ${createdOrderId}`);

    // Step 2: Create payment session using the correct endpoint
    console.log('🔄 Step 2: Creating payment session for order:', createdOrderId);

    // According to Cashfree docs, we should use the payment-sessions endpoint directly
    const sessionResponse = await fetch(`${cashfreeBaseUrl}/pg/orders/payment-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify({
        order_id: createdOrderId,
        order_amount: parseFloat(amount || config.productPrice),
        order_currency: currency || config.productCurrency,
        customer_details: {
          customer_id: `customer_${Date.now()}`,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone
        },
        order_meta: {
          return_url: dynamicReturnUrl,
          notify_url: dynamicNotifyUrl,
          payment_methods: "cc,dc,nb,upi,paylater,emi,cardlessemi"
        }
      })
    });

    if (!sessionResponse.ok) {
      const errorData = await sessionResponse.json().catch(() => ({}));
      console.error('❌ Cashfree Payment Session Error:', sessionResponse.status, errorData);
      throw new Error(`Cashfree Payment Session Error: ${sessionResponse.status} - ${errorData.message || 'Unknown error'}`);
    }

    const result = await sessionResponse.json();
    console.log('✅ Cashfree payment session created successfully:', JSON.stringify(result, null, 2));

    // Extract the payment session ID and URL
    const sessionId = result.payment_session_id;
    const paymentUrl = result.payment_link;

    if (!sessionId) {
      console.error('❌ No payment_session_id in response:', result);
      throw new Error('Payment session ID not received from Cashfree');
    }

    if (!paymentUrl) {
      console.error('❌ No payment_link in response:', result);
      throw new Error('Payment URL not received from Cashfree');
    }

    res.status(200).json({
      success: true,
      paymentUrl: paymentUrl,
      orderId: orderId,
      cfOrderId: orderResult.cf_order_id, // Cashfree's order ID
      sessionId: sessionId,
      message: 'Payment session created successfully',
      mode: cashfreeMode,
      environment: config.nodeEnv,
      domain: config.domain,
      server: 'unified-server'
    });

  } catch (error) {
    console.error('Payment initiation failed:', error);
    res.status(500).json({
      success: false,
      error: 'Payment initiation failed',
      details: error.message
    });
  }
});

app.get('/api/payments/verify/:orderId', async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Get Cashfree credentials from configuration
    const clientSecret = config.cashfreeClientSecret;
    const clientId = config.cashfreeClientId;
    const cashfreeMode = config.cashfreeMode;

    if (!clientSecret || !clientId) {
      console.error('❌ CRITICAL: Cashfree credentials not configured!');
      return res.status(500).json({ error: 'Payment system not configured' });
    }

    // Determine the correct Cashfree API URL based on mode
    const cashfreeBaseUrl = cashfreeMode === 'production'
      ? 'https://api.cashfree.com'
      : 'https://sandbox.cashfree.com';

    console.log(`🔄 Verifying payment for order: ${orderId} using ${cashfreeMode.toUpperCase()} mode`);

    // Verify payment status with Cashfree
    console.log(`🔍 Attempting to verify order: ${orderId} with Cashfree API`);
    console.log(`🔍 API URL: ${cashfreeBaseUrl}/pg/orders/${orderId}`);

    const response = await fetch(`${cashfreeBaseUrl}/pg/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
        'x-api-version': '2023-08-01'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Cashfree verification API error:', response.status, errorData);
      console.error('❌ Full error response:', JSON.stringify(errorData, null, 2));
      throw new Error(`Cashfree API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const result = await response.json();
    console.log('✅ Payment verification result:', JSON.stringify(result, null, 2));
    console.log('✅ Order status from Cashfree:', result.order_status);
    console.log('✅ Payment details:', result.payment_details);

    // Extract relevant information
    const status = result.order_status;
    const amount = result.order_amount;
    const currency = result.order_currency;
    const customerDetails = result.customer_details;
    const paymentDetails = result.payment_details;

    res.status(200).json({
      success: true,
      status: status || 'unknown',
      orderId: orderId,
      amount: amount || '0',
      currency: currency || 'INR',
      customerDetails: customerDetails || {},
      paymentDetails: paymentDetails || {},
      timestamp: new Date().toISOString(),
      mode: cashfreeMode,
      environment: config.nodeEnv,
      domain: config.domain,
      server: 'unified-server'
    });

  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({
      success: false,
      error: 'Payment verification failed',
      details: error.message
    });
  }
});

// Webhook endpoint
app.post('/api/payments/webhook', async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const webhookData = req.body;

    console.log('🔄 Cashfree webhook received:', JSON.stringify(webhookData, null, 2));

    // Validate webhook data - Cashfree sends data in a nested structure
    if (!webhookData || !webhookData.data || !webhookData.data.order) {
      console.error('❌ Invalid webhook data received');
      return res.status(400).json({ error: 'Invalid webhook data' });
    }

    // Extract payment information from nested structure
    const { data } = webhookData;
    const {
      order: { order_id, order_amount, order_currency },
      payment: { payment_status, payment_amount, payment_currency, payment_message },
      customer_details
    } = data;

    // Log payment details
    console.log('✅ Payment webhook processed:');
    console.log(`   Order ID: ${order_id}`);
    console.log(`   Amount: ${order_amount} ${order_currency}`);
    console.log(`   Payment Status: ${payment_status}`);
    console.log(`   Payment Amount: ${payment_amount} ${payment_currency}`);
    console.log(`   Payment Message: ${payment_message}`);
    console.log(`   Customer: ${customer_details?.customer_name} (${customer_details?.customer_email})`);

    // Here you can add your business logic:
    // - Update database
    // - Send confirmation emails
    // - Trigger download links
    // - etc.

    // IMPORTANT: Store successful payment in a way that frontend can access
    // This will help when Cashfree redirects without proper parameters
    if (payment_status === 'SUCCESS') {
      console.log('🎉 SUCCESSFUL PAYMENT DETECTED - Storing for frontend access');

      // You could store this in a database, Redis, or even a simple in-memory store
      // For now, we'll log it prominently so you can see it's working
      console.log('✅ PAYMENT VERIFIED VIA WEBHOOK:');
      console.log(`   Order ID: ${order_id}`);
      console.log(`   Customer: ${customer_details?.customer_name}`);
      console.log(`   Email: ${customer_details?.customer_email}`);
      console.log(`   Amount: ${payment_amount} ${payment_currency}`);
      console.log(`   Time: ${new Date().toISOString()}`);
    }

    // For now, just acknowledge receipt
    res.status(200).json({
      success: true,
      message: 'Webhook received successfully',
      orderId: order_id,
      paymentStatus: payment_status,
      orderAmount: order_amount,
      paymentAmount: payment_amount,
      currency: order_currency,
      customerDetails: customer_details,
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
      domain: config.domain,
      server: 'unified-server'
    });

  } catch (error) {
    console.error('Webhook processing failed:', error);
    res.status(500).json({
      success: false,
      error: 'Webhook processing failed',
      details: error.message
    });
  }
});

// Download endpoint for successful payments
app.get('/download', (req, res) => {
  try {
    // This endpoint should handle successful payment downloads
    // For now, we'll return a success message
    res.json({
      success: true,
      message: 'Download endpoint reached. Payment verification required.',
      timestamp: new Date().toISOString(),
      server: 'unified-server'
    });
  } catch (error) {
    console.error('Download endpoint error:', error);
    res.status(500).json({
      success: false,
      error: 'Download failed',
      details: error.message
    });
  }
});

// ============================================================================
// STATIC FILE SERVING - MUST COME AFTER ALL API ROUTES
// ============================================================================

// Check environment and build status
const isDevelopment = config.nodeEnv === 'development';
const mainDistExists = fs.existsSync(mainDistPath);
const clientDistExists = fs.existsSync(clientDistPath);

// If we have built files, serve them regardless of environment
if (mainDistExists && clientDistExists) {
  console.log('🏭 Built files detected - serving React app from unified server');
  console.log('📱 Samadhan Hub app will be served from /');
  
  // CRITICAL: Add a pre-check middleware to block API routes BEFORE static file serving
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
      console.log(`🚫 PRE-BLOCKED: API route ${req.path} before static file serving`);
      return next(); // Let the API route handlers deal with it
    }
    next();
  });

  // Serve built React apps from unified server
  // Static file serving for main app - ONLY for non-API routes
  app.use('/', (req, res, next) => {
    // CRITICAL: Explicitly block API routes from static file serving
    if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
      console.log(`🚫 BLOCKED: API route ${req.path} from static file serving`);
      return next();
    }
    
    console.log(`📁 Serving static file for route: ${req.path}`);
    // Serve static files for non-API routes
    express.static(mainDistPath, {
      maxAge: '1y',
      setHeaders: (res, filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.js') {
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        } else if (ext === '.css') {
          res.setHeader('Content-Type', 'text/css; charset=utf-8');
        } else if (ext === '.html') {
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
        }
      }
    })(req, res, next);
  });

  // Catch-all route for SPA - ONLY for non-API routes
  app.get('*', (req, res) => {
    // CRITICAL: Double-check for API routes to prevent HTML serving
    if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
      console.log(`🚫 BLOCKED: API route ${req.path} from being served as HTML`);
      return res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.path} not found`,
        timestamp: new Date().toISOString(),
        server: 'unified-server'
      });
    }
    
    console.log(`📱 Serving SPA for route: ${req.path}`);
    // Serve index.html for SPA routes
    res.sendFile(path.join(mainDistPath, 'index.html'));
  });
} else if (isDevelopment) {
  // Development mode - redirect to Vite dev servers
  console.log('🔄 Development mode - no built files found');
  console.log('🔄 Redirecting to Vite dev server for frontend app');
  console.log('🔄 Backend APIs will work on this server (port 5000)');

  // In development, redirect frontend requests to Vite dev server
  app.get('/', (req, res) => {
    res.redirect('http://localhost:3000');
  });

  app.get('*', (req, res) => {
    // Only redirect if it's not an API call
    if (!req.path.startsWith('/api/') && !req.path.startsWith('/health')) {
      res.redirect('http://localhost:3000');
    }
  });
} else {
  // Production mode but no built files - error
  console.log('❌ Production mode but no built files found');
  console.log('❌ Please run: npm run build');
  process.exit(1);
}

// ============================================================================
// APP ROUTES - Must come AFTER API routes
// ============================================================================

// CRITICAL: The order of middleware and routes is crucial:
// 1. API routes are defined FIRST (above this section)
// 2. Static file serving comes LAST (in the section above)
// 3. This ensures API routes take precedence over static file serving
// 4. No API route should ever be served as HTML

// Note: App routes are now handled in the development mode check above
// In development: redirects to Vite dev server
// In production: served by static file middleware

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.path} not found`,
    timestamp: new Date().toISOString(),
    server: 'unified-server'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message || 'Something went wrong',
    timestamp: new Date().toISOString(),
    server: 'unified-server'
  });
});

// ============================================================================
// GRACEFUL SHUTDOWN
// ============================================================================

const gracefulShutdown = (signal) => {
  console.log(`\n📴 Received ${signal}. Shutting down unified server gracefully...`);
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// ============================================================================
// START SERVER
// ============================================================================

app.listen(config.port, () => {
  console.log('🚀 ==========================================');
  console.log('🚀 Unified Server Started');
  console.log('🚀 ==========================================');
  console.log(`📱 Samadhan Hub APIs: ${config.protocol}://${config.domain}`);
  console.log(`🏥 Health check: ${config.protocol}://${config.domain}/health`);
  console.log(`🧪 API test: ${config.protocol}://${config.domain}/api/test`);
  console.log(`💳 Payment API: ${config.protocol}://${config.domain}/api/payments/*`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🌍 Cashfree Mode: ${config.cashfreeMode}`);
  console.log(`🌍 Port: ${config.port}`);
  console.log(`🌍 Domain: ${config.domain}`);
  console.log(`🌍 Protocol: ${config.protocol}`);
  console.log(`🔧 Services: Payment APIs + Samadhan Hub App`);
  if (config.nodeEnv === 'production') {
    console.log(`🔒 Security: Helmet, Rate Limiting, CORS enabled`);
  }
  console.log('🚀 ==========================================');
  console.log('💡 This server handles everything in one place!');
  console.log('🚀 ==========================================');
});

// Export the app for Vercel
module.exports = app;
