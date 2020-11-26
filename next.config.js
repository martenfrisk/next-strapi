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
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dyxbjaih4/'
  },
};

module.exports = withBundleAnalyzer(nextConfig)
