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
    domains: ["res.cloudinary.com"]
  },
};

module.exports = withBundleAnalyzer(nextConfig)
