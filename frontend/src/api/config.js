/** Backend base URL — set VITE_API_BASE_URL in Netlify / local .env */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
