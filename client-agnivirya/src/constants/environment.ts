// Environment-specific configuration for the client application

// Type definitions for Vite environment variables
// interface ImportMetaEnv {
//   DEV: boolean;
//   PROD: boolean;
//   MODE: string;
// }

// Determine the current environment
const isDevelopment = (import.meta as any).env?.DEV || false;
const isProduction = (import.meta as any).env?.PROD || false;

// Server configuration
export const SERVER_CONFIG = {
  // In development, the client runs on port 3000 and server on port 5000
  // In production, they might be on the same domain
  BASE_URL: isDevelopment ? 'http://localhost:5000' : '',
  API_BASE_URL: isDevelopment ? 'http://localhost:5000/api' : '/api',
  PORT: isDevelopment ? 5000 : undefined,
} as const;

// Environment flags
export const ENV = {
  IS_DEV: isDevelopment,
  IS_PROD: isProduction,
  NODE_ENV: (import.meta as any).env?.MODE || 'development',
} as const;

// API endpoints with full URLs
export const API_ENDPOINTS = {
  CONFIG: `${SERVER_CONFIG.API_BASE_URL}/api/config`,
  PAYMENT: {
    CREATE_ORDER: `${SERVER_CONFIG.API_BASE_URL}/api/payments/create-order`,
    VERIFY: `${SERVER_CONFIG.API_BASE_URL}/api/payments/verify`,
  },
  WEBHOOK: `${SERVER_CONFIG.API_BASE_URL}/api/webhook/cashfree`,
} as const;
