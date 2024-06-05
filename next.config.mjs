/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay the rebuild after the first change
        ignored: /node_modules/, // Ignore node_modules directory
      };
    }
    return config;
  },
};

export default nextConfig;
