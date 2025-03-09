import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ target: "react", autoCodeSplitting: true }), react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log("Received Response from the Target:", proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
