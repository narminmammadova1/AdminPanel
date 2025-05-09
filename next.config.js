module.exports = {
  // experimental: {
  //   appDir: true,  
  // },
}

/* @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  
experimental: {
  turbo: false,
}

  
}

module.exports = nextConfig