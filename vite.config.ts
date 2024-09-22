// biome-ignore lint/correctness/noNodejsModules: Config file
import { resolve } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

// biome-ignore lint/style/noDefaultExport: Config file
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    css: {
        modules: {
            localsConvention: "camelCaseOnly",
        },
    },
});
