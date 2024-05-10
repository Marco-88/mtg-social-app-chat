/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {protocol: 'https', hostname: 'media.wizards.com'},
            {protocol: 'http', hostname: 'res.cloudinary.com'},
            {protocol: 'https', hostname: 'avatars.githubusercontent.com'},
        ]
    }
};

export default nextConfig;
