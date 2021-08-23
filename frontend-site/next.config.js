module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/generate-english-qa/:path*',
        destination: 'http://34.87.146.224:8000/:path*',
      },
      {
        source: '/generate-indonesia-qa/:path*',
        destination: 'http://sqna.us-east-1.elasticbeanstalk.com/:path*',
      },
    ]
  },
}
