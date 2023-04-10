/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"api.lorem.space",
			"www.readersdigest.ca",
		],
	},
};

module.exports = nextConfig;
