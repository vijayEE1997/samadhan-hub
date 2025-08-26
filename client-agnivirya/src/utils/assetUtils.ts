/**
 * Utility functions for handling asset paths in both development and production
 */

import { API_ENDPOINTS } from "@/constants";

/**
 * Get the correct path for an asset
 * @param assetPath - The asset path relative to the public/assets folder
 * @returns The correct asset path for the current environment
 */
export const getAssetPath = (assetPath: string): string => {
  // Remove leading slash if present
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  
  // Always use absolute path - this works in both development and production
  // In development, Vite dev server handles this
  // In production, our Express server serves the /assets route
  const finalPath = `/${cleanPath}`;
  console.log(`🔍 Asset path generated: ${assetPath} -> ${finalPath}`);
  return finalPath;
};

/**
 * Get the path for an image asset
 * @param imageName - The image filename (e.g., 'agnivirya-logo.png')
 * @returns The correct image path
 */
export const getImagePath = (imageName: string): string => {
  const imagePath = getAssetPath(`assets/${imageName}`);
  console.log(`🖼️ Image path generated: ${imageName} -> ${imagePath}`);
  return imagePath;
};

/**
 * Get the path for a favicon
 * @returns The correct favicon path
 */
export const getFaviconPath = (): string => {
  return '/favicon.ico';
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
