module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  async redirects() {
    return [
      {
        source: '/notebook',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
