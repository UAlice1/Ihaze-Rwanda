const backend = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.AGRI_API_ORIGIN || 'http://127.0.0.1:8765';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async rewrites() { 
    return [
      { 
        source: '/api/:path*', 
        destination: `${backend}/api/:path*` 
      }
    ]; 
  },
  // Empty turbopack config to enable Turbopack without custom webpack
  turbopack: {},
};

export default nextConfig;
