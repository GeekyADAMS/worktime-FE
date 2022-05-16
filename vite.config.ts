import { fileURLToPath, URL } from "url";
import Pages from "vite-plugin-pages";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    plugins: [
      vue({
        include: [/\.vue$/],
      }),

      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ["vue"],
        routeBlockLang: "yaml",
      }),
    ],

    resolve: {
      alias: {
        "~/": `${path.resolve(__dirname, "src")}/`,
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@components/": fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
        "@services/": fileURLToPath(new URL("./src/services", import.meta.url)),
      },
    },

    define: {
      "process.env": process.env,
    },

    server: {
      proxy: {
        "/api": {
          target: env.VITE_DEV_API_BASE_URL,
          changeOrigin: true,
          ws: false,
        },
      },
    },
  };
});
