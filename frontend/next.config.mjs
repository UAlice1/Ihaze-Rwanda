const backend = process.env.AGRI_API_ORIGIN || 'http://127.0.0.1:8765';
export default {
  poweredByHeader: false,
  async rewrites() { return [{ source: '/api/:path*', destination: `${backend}/api/:path*` }]; }
};
