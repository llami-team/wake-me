import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/wake-me.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
});
