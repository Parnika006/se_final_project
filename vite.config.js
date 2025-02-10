import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist", // Ensures output to the 'dist' folder
    rollupOptions: {
      input: "index.html", // Main entry point, ensure this is correct
    },
  },
});
