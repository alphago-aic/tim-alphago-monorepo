module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return process.env.NODE_ENV === "development" ? [
      {
        source: '/generate-english-qa/:path*',
        destination: 'http://34.87.146.224:8000/:path*',
      },
      {
        source: '/generate-indonesia-qa/:path*',
        destination: 'http://sqna.us-east-1.elasticbeanstalk.com/:path*',
      },
    ] : []
  },
}
