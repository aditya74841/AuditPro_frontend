

// Get the directory name of the current module

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // ✅ cleaned up
  },
  env: {
    MASTER_SERVER_URL: 'http://localhost:8080/api/v1/master',
    USER_SERVER_URL: 'http://localhost:8080/api/v1/users',
  },
 
};

export default nextConfig;
