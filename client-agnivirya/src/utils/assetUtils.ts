/**
 * Utility functions for handling asset paths in both development and production
 */

import { API_ENDPOINTS } from "@/constants";

/**
 * Get the correct path for an image asset from the server
 * @param imageName - The image filename (e.g., 'agnivirya-logo.png')
 * @returns The server-side image API path
 */
export const getImagePath = (imageName: string): string => {
  // Always fetch from server-side API for consistent MIME types and caching
  const serverImagePath = `/api/images/${imageName}`;
  console.log(`🖼️ Image path generated: ${imageName} -> ${serverImagePath}`);
  return serverImagePath;
};

/**
 * Get the correct path for an asset (legacy support)
 * @param assetPath - The asset path relative to the public/assets folder
 * @returns The server-side asset path
 */
export const getAssetPath = (assetPath: string): string => {
  // Remove leading slash if present
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  
  // Check if we're in development mode
  const isDevelopment = (import.meta as any).env?.DEV || false;
  
  if (isDevelopment) {
    // In development, Vite serves assets from the public folder
    const finalPath = `/${cleanPath}`;
    console.log(`🔍 Asset path generated (DEV): ${assetPath} -> ${finalPath}`);
    return finalPath;
  } else {
    // In production, serve from server-side API
    const serverPath = `/api/images/${cleanPath}`;
    console.log(`🔍 Asset path generated (PROD): ${assetPath} -> ${serverPath}`);
    return serverPath;
  }
};

/**
 * Get the path for a favicon
 * @returns The server-side favicon path
 */
export const getFaviconPath = (): string => {
  return '/favicon.ico'; // This will be served by the server-side favicon route
};

/**
 * Get the path for a PDF asset using the download API
 * @param language - The language for the PDF ('english' or 'hindi')
 * @returns The correct PDF download API path
 */
export const getPdfPath = (language: 'english' | 'hindi' = 'english'): string => {
  return `${API_ENDPOINTS.DOWNLOAD}?language=${language}`;
};

/**
 * Get the path for a specific PDF file (legacy support)
 * @param pdfName - The PDF filename
 * @returns The correct PDF path
 */
export const getPdfFilePath = (pdfName: string): string => {
  return getAssetPath(`agnivirya/${pdfName}`);
};
