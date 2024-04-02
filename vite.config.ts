import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";

import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), svgr()],
});
