
/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";
const withPWA = withPWAInit({
    dest: "public",
  });
const nextConfig = {
    images: {
        remotePatterns:[
            {
            protocol:"https",
            hostname:"utfs.io",
            port: "",
            pathname: "/**",
            },
        ],
    }
};

export default withPWA(nextConfig);
