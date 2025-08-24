/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";


/** @type {import("next").NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'aceternity.com',
				port: '',
				pathname: '/images/products/thumbnails/new/**',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'image.thum.io',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default config;
