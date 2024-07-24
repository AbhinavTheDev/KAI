import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-404",
      writeBundle() {
        fs.copyFileSync(
          path.resolve(__dirname, "404.html"),
          path.resolve(__dirname, "dist", "404.html")
        );
      },
    },
  ],
  base: "/KAI/",
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
});
