import { reactRouter } from "@react-router/dev/vite";
import { componentTagger } from "shopable-tagger";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(async ({ mode }) => {
  const packageJsonPath = path.resolve(__dirname, "package.json");
  const packageJson = await fs.readFile(packageJsonPath, "utf-8");
  const dependencies = Object.keys(JSON.parse(packageJson).dependencies).filter((dependency) => {
    if (dependency.startsWith("@react-router")) {
      return false;
    }

    return true;
  });

  return {
    plugins: [reactRouter(), tsconfigPaths(), mode === "development" && componentTagger()].filter(Boolean),
    server: {
      port: 8000,
      host: "0.0.0.0",
      hmr: {
        overlay: false,
      },
      allowedHosts: true,
    },
    build: {
      sourcemap: false,
    },
    optimizeDeps: {
      include: dependencies,
    },
    ssr: {
      noExternal: ["@medusajs/js-sdk"],
      external: ["cloudflare:sockets"],
    },
    define: {
      SHOPABLE_DEV_SERVER: JSON.stringify(process.env.SHOPABLE_DEV_SERVER),
    },
  };
});
