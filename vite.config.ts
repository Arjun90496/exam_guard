import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Copy dist to backend/public after build
const copyDistPlugin = {
  name: "copy-dist-to-public",
  closeBundle: async () => {
    const src = path.resolve(__dirname, "dist");
    const dest = path.resolve(__dirname, "backend/public");

    if (fs.existsSync(src)) {
      // Remove old public files except .gitkeep and config files
      if (fs.existsSync(dest)) {
        const files = fs.readdirSync(dest);
        files.forEach((file) => {
          if (
            file !== "robots.txt" &&
            file !== ".gitkeep" &&
            file !== "index.php"
          ) {
            const filePath = path.join(dest, file);
            if (fs.lstatSync(filePath).isDirectory()) {
              fs.rmSync(filePath, { recursive: true, force: true });
            } else {
              fs.unlinkSync(filePath);
            }
          }
        });
      }

      // Copy new files
      const copyRecursive = (srcDir: string, destDir: string) => {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        const entries = fs.readdirSync(srcDir);
        entries.forEach((entry) => {
          const srcPath = path.join(srcDir, entry);
          const destPath = path.join(destDir, entry);
          const stat = fs.lstatSync(srcPath);

          if (stat.isDirectory()) {
            copyRecursive(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        });
      };

      copyRecursive(src, dest);
      console.log("✓ Frontend build copied to backend/public");
    }
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    copyDistPlugin,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
