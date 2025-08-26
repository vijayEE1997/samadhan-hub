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
  
  // Use relative path for both development and production
  return `./${cleanPath}`;
};

/**
 * Get the path for an image asset
 * @param imageName - The image filename (e.g., 'agnivirya-logo.png')
 * @returns The correct image path
 */
export const getImagePath = (imageName: string): string => {
  return getAssetPath(`assets/${imageName}`);
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
