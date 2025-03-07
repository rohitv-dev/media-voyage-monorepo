import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts"],
  format: ["cjs"],
  clean: true,
  minify: !options.watch,
}));
