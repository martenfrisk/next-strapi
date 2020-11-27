require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  env: {
    API_URL: 'https://next-testbutik.herokuapp.com'
  },
  target: 'serverless',
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dyxbjaih4/'
  },
};

module.exports = withBundleAnalyzer(nextConfig)
