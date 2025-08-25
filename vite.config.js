/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-index-to-404",
      closeBundle() {
        try {
          const distDir = path.resolve(__dirname, "dist");
          const indexPath = path.join(distDir, "index.html");
          const notFoundPath = path.join(distDir, "404.html");

          // Check if index.html exists before copying
          if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, notFoundPath);
            console.log("Successfully copied index.html to 404.html");
          } else {
            console.warn("index.html not found, skipping 404.html copy");
          }
        } catch (error) {
          console.warn("Failed to copy index.html to 404.html:", error.message);
        }
      },
    },
  ],
  // Remove base path for Netlify deployment
  // base: "/quickMed/",
});
