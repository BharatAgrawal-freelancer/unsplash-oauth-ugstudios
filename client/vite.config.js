import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import history from "connect-history-api-fallback"

export default defineConfig({
  plugins: [
    react(),
    {
      name: "spa-fallback",
      configureServer(server) {
        // 👇 This ensures /auth/success and all other client routes fallback to index.html
        server.middlewares.use(
          history({
            disableDotRule: true,
            htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
          })
        )
      },
    },
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
})
