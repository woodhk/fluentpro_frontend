/**
 * Constants exports
 * Maintains backwards compatibility
 */

// Export individual modules
export * from './assets';
export * from './routes';
export * from './config';
export * from './data';

// For backwards compatibility - some files use { data }
export { data } from './data';