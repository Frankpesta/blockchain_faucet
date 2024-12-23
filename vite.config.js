import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
	plugins: [
		react(),
		nodePolyfills({
			protocolImports: true,
		}),
	],
	define: {
		"process.env": {},
		"process.argv": "[]",
		"process.browser": "true", // Shim `process.browser` as true for browser compatibility
		"process.version": '"0.0.0"', // Provide a dummy value for `process.version`
	},
});
