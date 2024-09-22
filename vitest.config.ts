import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: Config file
export default defineConfig({
    test: {
        passWithNoTests: true,
    },
});
