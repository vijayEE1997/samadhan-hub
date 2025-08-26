const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import constants
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
} = require('./constants');

// Import services
const CashfreeService = require('./services/cashfreeService');

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

// Middleware configuration based on mode
if (config.server.enableHelmet) {
  app.use(helmet({
    contentSecurityPolicy: SECURITY.HELMET_CSP,
  }));
}

// Always enable CORS in development, conditional in production
if (ENV.IS_DEV || config.server.enableCors) {
  console.log('🔒 CORS enabled with config:', config.cors);
  app.use(cors(config.cors));
} else {
  console.log('🔒 CORS disabled in production mode');
}

if (config.server.enableLogging) {
  app.use(morgan(LOGGING.FORMAT));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle CORS preflight requests
app.options('*', cors(config.cors));

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

// Configuration API - Expose environment variables to client
app.get(API.ENDPOINTS.CONFIG, (req, res) => {
  try {
    // Get all environment variables
    const envVars = process.env;
    
    // Filter and sanitize sensitive variables
    const safeConfig = {};
    
    Object.keys(envVars).forEach(key => {
      const value = envVars[key];
      
      // Check if key contains sensitive information
      const isSensitive = SECURITY.SENSITIVE_KEYS.some(sensitive => 
        key.toUpperCase().includes(sensitive)
      );
      
      if (isSensitive) {
        // Mask sensitive values
        safeConfig[key] = value ? SECURITY.MASKED_VALUE : value;
      } else {
        // Safe to expose
        safeConfig[key] = value;
      }
    });
    
    // Enhanced configuration response
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

app.get('/api/users', (req, res) => {
  // Mock user data
  const users = USERS;
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Mock user creation
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

    // Create order using Cashfree
    const orderResult = await CashfreeService.createOrder({
      email,
      amount,
      currency,
      returnUrl: `${req.protocol}://${req.get('host').replace('5000', '3000')}/success`
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

    // Verify payment using Cashfree
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
    
    // Handle webhook data (payment status updates, etc.)
    // In production, you should verify webhook signature
    
    res.json({ success: true, message: 'Webhook received' });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// SSR Function
async function renderApp(url, initialState = {}) {
  try {
    // In production mode, this would be the built React app
    if (ENV.IS_PROD) {
      const { renderToString } = require('react-dom/server');
      const React = require('react');
      
      // Import the built app component
      const App = require(SSR.CLIENT_DIST_PATH).default;
      
      const app = React.createElement(App, { initialState, url });
      const html = renderToString(app);
      
      return html;
    } else {
      // Development mode - return a placeholder
      return `
        <div id="root">
          <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1>🚀 React Fullstack App (SSR Enabled)</h1>
            <p>This route is being server-side rendered!</p>
            <p>Current URL: ${url}</p>
            <p>Mode: ${config.mode}</p>
            <p>Environment: ${config.environment}</p>
            <p>In development mode, the full React app will load client-side.</p>
            <p>In production mode, this will be fully server-rendered.</p>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error('SSR Error:', error);
    return `
      <div id="root">
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
          <h1>⚠️ SSR Error</h1>
          <p>Something went wrong during server-side rendering.</p>
          <p>Error: ${error.message}</p>
        </div>
      </div>
    `;
  }
}

// HTML Template Function
function getHTMLTemplate(ssrContent, initialState = {}) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React Fullstack App - ${config.mode.toUpperCase()} Mode</title>
        <meta name="description" content="Full-stack React application with Server-Side Rendering - ${config.mode} mode" />
        <style>
          body { 
            margin: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #f5f5f5;
          }
          #root { min-height: 100vh; }
          .loading { 
            text-align: center; 
            padding: 50px; 
            color: #666; 
          }
        </style>
      </head>
      <body>
        <div id="root">${ssrContent}</div>
        <script>
          // Hydration data
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          window.__SSR_ENABLED__ = true;
          window.__APP_MODE__ = '${config.mode}';
          window.__ENVIRONMENT__ = '${config.environment}';
        </script>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  `;
}

// SSR Route Handler - This handles ALL frontend routes
app.get('*', async (req, res) => {
  try {
    const url = req.url;
    const initialState = {
      currentUrl: url,
      timestamp: new Date().toISOString(),
      ssr: true,
      mode: config.mode,
      environment: config.environment
    };

    // Render the app server-side
    const ssrContent = await renderApp(url, initialState);
    
    // Send the complete HTML with SSR content
    const html = getHTMLTemplate(ssrContent, initialState);
    
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
    
  } catch (error) {
    console.error('SSR Route Error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
        <head><title>SSR Error</title></head>
        <body>
          <h1>Server-Side Rendering Error</h1>
          <p>Something went wrong: ${error.message}</p>
          <p>Mode: ${config.mode}</p>
        </body>
      </html>
    `);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Vercel compatibility - export the app
module.exports = app;

// Only start the server if not on Vercel (for local development)
if (!ENV.IS_VERCEL) {
  const PORT = SERVER.PORT;
  const HOST = SERVER.HOST;
  
  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running in ${config.mode.toUpperCase()} mode`);
    console.log(`🌍 Environment: ${config.environment}`);
    console.log(`📡 Server: http://${HOST}:${PORT}`);
    console.log(`📱 API: http://${HOST}:${PORT}/api`);
    console.log(`⚙️  Config API: http://${HOST}:${PORT}${API.ENDPOINTS.CONFIG}`);
    console.log(`🌐 SSR: ${config.server.enableSSR ? 'Enabled' : 'Disabled'}`);
    console.log(`🔒 Helmet: ${config.server.enableHelmet ? 'Enabled' : 'Disabled'}`);
    console.log(`📊 Logging: ${config.server.enableLogging ? 'Enabled' : 'Disabled'}`);
    console.log(`🌍 CORS: ${config.server.enableCors ? 'Enabled' : 'Disabled'}`);
    console.log(`⏱️  Rate Limiting: ${config.server.enableRateLimiting ? 'Enabled' : 'Disabled'}`);
  });
} else {
  console.log(`🚀 Vercel deployment detected - Serverless mode`);
  console.log(`🌍 Environment: ${config.environment}`);
  console.log(`📱 API endpoints available`);
  console.log(`🌐 SSR: ${config.server.enableSSR ? 'Enabled' : 'Disabled'}`);
}
