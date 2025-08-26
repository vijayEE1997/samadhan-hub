// Path constants for the project
export const PATHS = {
  // Source directory
  SRC: './src',
  
  // Component directories
  COMPONENTS: './src/components',
  SECTIONS: './src/components/sections',
  UI: './src/components/ui',
  
  // Other directories
  ASSETS: './assets',
  CONTEXTS: './src/contexts',
  HOOKS: './src/hooks',
  LIB: './src/lib',
  PAGES: './src/pages',
  SERVICES: './src/services',
  UTILS: './src/utils',
  
  // Aliases for vite config
  ALIASES: {
    '@': './src',
    '@components': './src/components',
    '@sections': './src/components/sections',
    '@ui': './src/components/ui',
    '@assets': './assets',
    '@contexts': './src/contexts',
    '@hooks': './src/hooks',
    '@lib': './src/lib',
    '@pages': './src/pages',
    '@services': './src/services',
    '@utils': './src/utils',
  }
} as const

// Type for path aliases
export type PathAlias = keyof typeof PATHS.ALIASES
