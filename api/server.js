// Vercel serverless function for API endpoints
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import constants and services
const {
  ENV,
  SERVER,
  API,
  CORS,
  DEPLOYMENT,
  SECURITY,
  USERS,
  SSR,
  PATHS,
  HTTP_STATUS,
  MESSAGES,
  RATE_LIMIT,
  LOGGING
} = require('../server/constants');

const CashfreeService = require('../server/services/cashfreeService');

const app = express();

// Configuration object using constants
const config = {
  mode: ENV.APP_MODE,
  environment: ENV.NODE_ENV,
  isDev: ENV.IS_DEV,
  isProd: ENV.IS_PROD,
  isVercel: ENV.IS_VERCEL,
  server: SERVER,
  api: API,
  cors: CORS,
  deployment: DEPLOYMENT
};

// Middleware configuration
if (config.server.enableHelmet) {
  app.use(helmet({
    contentSecurityPolicy: SECURITY.HELMET_CSP,
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
  app.use(morgan(LOGGING.FORMAT));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle CORS preflight requests
app.options('*', cors());

// API Routes
app.get(API.ENDPOINTS.HEALTH, (req, res) => {
  res.json({ 
    status: MESSAGES.HEALTH.STATUS, 
    message: MESSAGES.HEALTH.MESSAGE,
    mode: config.mode,
    environment: config.environment,
    timestamp: new Date().toISOString()
  });
});

// Configuration API
app.get(API.ENDPOINTS.CONFIG, (req, res) => {
  try {
    const envVars = process.env;
    const safeConfig = {};
    
    Object.keys(envVars).forEach(key => {
      const value = envVars[key];
      const isSensitive = SECURITY.SENSITIVE_KEYS.some(sensitive => 
        key.toUpperCase().includes(sensitive)
      );
      
      if (isSensitive) {
        safeConfig[key] = value ? SECURITY.MASKED_VALUE : value;
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
        isVercel: ENV.IS_VERCEL,
        isDev: ENV.IS_DEV,
        isProd: ENV.IS_PROD,
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
        isProduction: ENV.IS_PROD,
        isDevelopment: ENV.IS_DEV,
        isVercel: ENV.IS_VERCEL,
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

// Users API
app.get('/api/users', (req, res) => {
  const users = USERS;
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json(newUser);
});

// Payment API Routes
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { email, amount = 99, currency = 'INR' } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const orderResult = await CashfreeService.createOrder({
      email,
      amount,
      currency,
      returnUrl: `${req.protocol}://${req.get('host')}/success`
    });

    res.json({
      success: true,
      message: 'Order created successfully',
      data: orderResult
    });

  } catch (error) {
    console.error('❌ Payment order creation error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create payment order',
      message: error.message 
    });
  }
});

app.get('/api/payment/verify/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    const verificationResult = await CashfreeService.verifyPayment(orderId);

    res.json({
      success: true,
      message: 'Payment verification completed',
      data: verificationResult
    });

  } catch (error) {
    console.error('❌ Payment verification error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to verify payment',
      message: error.message 
    });
  }
});

app.post('/api/webhook/cashfree', (req, res) => {
  try {
    const webhookData = req.body;
    console.log('🔔 Cashfree webhook received:', webhookData);
    
    res.json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Export the app for Vercel
module.exports = app;
