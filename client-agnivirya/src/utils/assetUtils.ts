/**
 * Utility functions for handling asset paths in both development and production
 */

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
 * Get the path for a PDF asset
 * @param pdfName - The PDF filename (e.g., 'agnivirya-complete-wellness-guide-2025.pdf')
 * @returns The correct PDF path
 */
export const getPdfPath = (pdfName: string): string => {
  return getAssetPath(`agnivirya/${pdfName}`);
};
