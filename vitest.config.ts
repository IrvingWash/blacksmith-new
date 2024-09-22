import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// biome-ignore lint/style/noDefaultExport: Config file
export default defineConfig({
    test: {
        passWithNoTests: true,
    },
    plugins: [tsconfigPaths()],
});
