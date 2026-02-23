// vite.config.ts
import { defineConfig } from "file:///D:/CSE%207th%20SEMESTER/exam_guard/node_modules/vite/dist/node/index.js";
import react from "file:///D:/CSE%207th%20SEMESTER/exam_guard/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import fs from "fs";
var __vite_injected_original_dirname = "D:\\CSE 7th SEMESTER\\exam_guard";
var copyDistPlugin = {
  name: "copy-dist-to-public",
  closeBundle: async () => {
    const src = path.resolve(__vite_injected_original_dirname, "dist");
    const dest = path.resolve(__vite_injected_original_dirname, "backend/public");
    if (fs.existsSync(src)) {
      if (fs.existsSync(dest)) {
        const files = fs.readdirSync(dest);
        files.forEach((file) => {
          if (file !== "robots.txt" && file !== ".gitkeep" && file !== "index.php") {
            const filePath = path.join(dest, file);
            if (fs.lstatSync(filePath).isDirectory()) {
              fs.rmSync(filePath, { recursive: true, force: true });
            } else {
              fs.unlinkSync(filePath);
            }
          }
        });
      }
      const copyRecursive = (srcDir, destDir) => {
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
      console.log("\u2713 Frontend build copied to backend/public");
    }
  }
};
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    copyDistPlugin
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDU0UgN3RoIFNFTUVTVEVSXFxcXGV4YW1fZ3VhcmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENTRSA3dGggU0VNRVNURVJcXFxcZXhhbV9ndWFyZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ1NFJTIwN3RoJTIwU0VNRVNURVIvZXhhbV9ndWFyZC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuXHJcbi8vIENvcHkgZGlzdCB0byBiYWNrZW5kL3B1YmxpYyBhZnRlciBidWlsZFxyXG5jb25zdCBjb3B5RGlzdFBsdWdpbiA9IHtcclxuICBuYW1lOiBcImNvcHktZGlzdC10by1wdWJsaWNcIixcclxuICBjbG9zZUJ1bmRsZTogYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3Qgc3JjID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpO1xyXG4gICAgY29uc3QgZGVzdCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiYmFja2VuZC9wdWJsaWNcIik7XHJcblxyXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoc3JjKSkge1xyXG4gICAgICAvLyBSZW1vdmUgb2xkIHB1YmxpYyBmaWxlcyBleGNlcHQgLmdpdGtlZXAgYW5kIGNvbmZpZyBmaWxlc1xyXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhkZXN0KSkge1xyXG4gICAgICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoZGVzdCk7XHJcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBmaWxlICE9PSBcInJvYm90cy50eHRcIiAmJlxyXG4gICAgICAgICAgICBmaWxlICE9PSBcIi5naXRrZWVwXCIgJiZcclxuICAgICAgICAgICAgZmlsZSAhPT0gXCJpbmRleC5waHBcIlxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGRlc3QsIGZpbGUpO1xyXG4gICAgICAgICAgICBpZiAoZnMubHN0YXRTeW5jKGZpbGVQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgZnMucm1TeW5jKGZpbGVQYXRoLCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgZm9yY2U6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZnMudW5saW5rU3luYyhmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ29weSBuZXcgZmlsZXNcclxuICAgICAgY29uc3QgY29weVJlY3Vyc2l2ZSA9IChzcmNEaXIsIGRlc3REaXIpID0+IHtcclxuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGVzdERpcikpIHtcclxuICAgICAgICAgIGZzLm1rZGlyU3luYyhkZXN0RGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZW50cmllcyA9IGZzLnJlYWRkaXJTeW5jKHNyY0Rpcik7XHJcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgc3JjUGF0aCA9IHBhdGguam9pbihzcmNEaXIsIGVudHJ5KTtcclxuICAgICAgICAgIGNvbnN0IGRlc3RQYXRoID0gcGF0aC5qb2luKGRlc3REaXIsIGVudHJ5KTtcclxuICAgICAgICAgIGNvbnN0IHN0YXQgPSBmcy5sc3RhdFN5bmMoc3JjUGF0aCk7XHJcblxyXG4gICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xyXG4gICAgICAgICAgICBjb3B5UmVjdXJzaXZlKHNyY1BhdGgsIGRlc3RQYXRoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZzLmNvcHlGaWxlU3luYyhzcmNQYXRoLCBkZXN0UGF0aCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb3B5UmVjdXJzaXZlKHNyYywgZGVzdCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiXHUyNzEzIEZyb250ZW5kIGJ1aWxkIGNvcGllZCB0byBiYWNrZW5kL3B1YmxpY1wiKTtcclxuICAgIH1cclxuICB9LFxyXG59O1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBzZXJ2ZXI6IHtcclxuICAgIGhvc3Q6IFwiOjpcIixcclxuICAgIHBvcnQ6IDgwODAsXHJcbiAgICBobXI6IHtcclxuICAgICAgb3ZlcmxheTogZmFsc2UsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGNvcHlEaXN0UGx1Z2luLFxyXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgfSxcclxuICB9LFxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1IsU0FBUyxvQkFBb0I7QUFDblQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFFBQVE7QUFIZixJQUFNLG1DQUFtQztBQU16QyxJQUFNLGlCQUFpQjtBQUFBLEVBQ3JCLE1BQU07QUFBQSxFQUNOLGFBQWEsWUFBWTtBQUN2QixVQUFNLE1BQU0sS0FBSyxRQUFRLGtDQUFXLE1BQU07QUFDMUMsVUFBTSxPQUFPLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFFckQsUUFBSSxHQUFHLFdBQVcsR0FBRyxHQUFHO0FBRXRCLFVBQUksR0FBRyxXQUFXLElBQUksR0FBRztBQUN2QixjQUFNLFFBQVEsR0FBRyxZQUFZLElBQUk7QUFDakMsY0FBTSxRQUFRLENBQUMsU0FBUztBQUN0QixjQUNFLFNBQVMsZ0JBQ1QsU0FBUyxjQUNULFNBQVMsYUFDVDtBQUNBLGtCQUFNLFdBQVcsS0FBSyxLQUFLLE1BQU0sSUFBSTtBQUNyQyxnQkFBSSxHQUFHLFVBQVUsUUFBUSxFQUFFLFlBQVksR0FBRztBQUN4QyxpQkFBRyxPQUFPLFVBQVUsRUFBRSxXQUFXLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFBQSxZQUN0RCxPQUFPO0FBQ0wsaUJBQUcsV0FBVyxRQUFRO0FBQUEsWUFDeEI7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUdBLFlBQU0sZ0JBQWdCLENBQUMsUUFBUSxZQUFZO0FBQ3pDLFlBQUksQ0FBQyxHQUFHLFdBQVcsT0FBTyxHQUFHO0FBQzNCLGFBQUcsVUFBVSxTQUFTLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFBQSxRQUMzQztBQUNBLGNBQU0sVUFBVSxHQUFHLFlBQVksTUFBTTtBQUNyQyxnQkFBUSxRQUFRLENBQUMsVUFBVTtBQUN6QixnQkFBTSxVQUFVLEtBQUssS0FBSyxRQUFRLEtBQUs7QUFDdkMsZ0JBQU0sV0FBVyxLQUFLLEtBQUssU0FBUyxLQUFLO0FBQ3pDLGdCQUFNLE9BQU8sR0FBRyxVQUFVLE9BQU87QUFFakMsY0FBSSxLQUFLLFlBQVksR0FBRztBQUN0QiwwQkFBYyxTQUFTLFFBQVE7QUFBQSxVQUNqQyxPQUFPO0FBQ0wsZUFBRyxhQUFhLFNBQVMsUUFBUTtBQUFBLFVBQ25DO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUVBLG9CQUFjLEtBQUssSUFBSTtBQUN2QixjQUFRLElBQUksZ0RBQTJDO0FBQUEsSUFDekQ7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ047QUFBQSxFQUNGLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
