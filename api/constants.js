// Server-side constants for the samadhan application

// Environment and Mode Constants
const ENV = {
  APP_MODE: process.env.APP_MODE || (process.env.NODE_ENV === 'production' ? 'prod' : 'dev'),
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_VERCEL: process.env.VERCEL === '1' || process.env.VERCEL_DEPLOYMENT === 'true',
  IS_DEV: process.env.APP_MODE === 'dev' || process.env.APP_MODE === 'local' || process.env.APP_MODE === 'sandbox',
  IS_PROD: process.env.APP_MODE === 'prod' || process.env.APP_MODE === 'production'
};

// Server Configuration Constants
const SERVER = {
  PORT: process.env.PORT || 5000,
  HOST: process.env.HOST || 'localhost',
  ENABLE_LOGGING: process.env.ENABLE_LOGGING !== 'false',
  ENABLE_CORS: process.env.ENABLE_CORS !== 'false',
  ENABLE_SSR: process.env.ENABLE_SSR !== 'false',
  ENABLE_HELMET: process.env.ENABLE_HELMET !== 'false',
  ENABLE_RATE_LIMITING: process.env.ENABLE_RATE_LIMITING === 'true'
};


// API Configuration Constants
const API = {
  VERSION: process.env.API_VERSION || 'v1',
  RATE_LIMIT: parseInt(process.env.API_RATE_LIMIT) || 100,
  TIMEOUT: parseInt(process.env.API_TIMEOUT) || 30000,
  ENDPOINTS: {
    HEALTH: '/api/health',
    CONFIG: '/api/config'
  }
};

// CORS Configuration Constants
const CORS = {
  origin: process.env.CORS_ORIGIN || (ENV.IS_DEV ? 'http://localhost:3000' : 'https://samadhanhub.com'),
  credentials: ENV.IS_DEV,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

// Deployment Configuration Constants
const DEPLOYMENT = {
  DOMAIN: process.env.PROD_DOMAIN || 'samadhanhub.com',
  IS_VERCEL: ENV.IS_VERCEL,
  IS_PRODUCTION: ENV.IS_PROD
};

// Security Constants
const  SECURITY = {
  SENSITIVE_KEYS: ['PASSWORD', 'SECRET', 'KEY', 'TOKEN', 'AUTH', 'PRIVATE'],
  MASKED_VALUE: '***MASKED***',
  HELMET_CSP: ENV.IS_DEV ? false : undefined
};

// Response Message Constants
const MESSAGES = {
  HEALTH: {
    STATUS: 'OK',
    MESSAGE: 'Server is running!'
  },
  ERROR: {
    CONFIG_FETCH: 'Failed to fetch config',
    SSR_RENDER: 'Failed to render SSR content',
    FILE_NOT_FOUND: 'File not found',
    UNAUTHORIZED: 'Unauthorized access',
    INTERNAL_ERROR: 'Internal server error'
  }
};
// Logging Constants
const LOGGING = {
  FORMAT: ENV.IS_DEV ? 'dev' : 'combined',
  LEVEL: ENV.IS_DEV ? 'debug' : 'info'
};

// Export all constants
module.exports = {
  ENV,
  SERVER,
  API,
  CORS,
  DEPLOYMENT,
  SECURITY,
  MESSAGES,
  LOGGING
};
