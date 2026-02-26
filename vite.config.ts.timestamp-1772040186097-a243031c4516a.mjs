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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDU0UgN3RoIFNFTUVTVEVSXFxcXGV4YW1fZ3VhcmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXENTRSA3dGggU0VNRVNURVJcXFxcZXhhbV9ndWFyZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovQ1NFJTIwN3RoJTIwU0VNRVNURVIvZXhhbV9ndWFyZC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuXHJcbi8vIENvcHkgZGlzdCB0byBiYWNrZW5kL3B1YmxpYyBhZnRlciBidWlsZFxyXG5jb25zdCBjb3B5RGlzdFBsdWdpbiA9IHtcclxuICBuYW1lOiBcImNvcHktZGlzdC10by1wdWJsaWNcIixcclxuICBjbG9zZUJ1bmRsZTogYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3Qgc3JjID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpO1xyXG4gICAgY29uc3QgZGVzdCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiYmFja2VuZC9wdWJsaWNcIik7XHJcblxyXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMoc3JjKSkge1xyXG4gICAgICAvLyBSZW1vdmUgb2xkIHB1YmxpYyBmaWxlcyBleGNlcHQgLmdpdGtlZXAgYW5kIGNvbmZpZyBmaWxlc1xyXG4gICAgICBpZiAoZnMuZXhpc3RzU3luYyhkZXN0KSkge1xyXG4gICAgICAgIGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoZGVzdCk7XHJcbiAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBmaWxlICE9PSBcInJvYm90cy50eHRcIiAmJlxyXG4gICAgICAgICAgICBmaWxlICE9PSBcIi5naXRrZWVwXCIgJiZcclxuICAgICAgICAgICAgZmlsZSAhPT0gXCJpbmRleC5waHBcIlxyXG4gICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGRlc3QsIGZpbGUpO1xyXG4gICAgICAgICAgICBpZiAoZnMubHN0YXRTeW5jKGZpbGVQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgZnMucm1TeW5jKGZpbGVQYXRoLCB7IHJlY3Vyc2l2ZTogdHJ1ZSwgZm9yY2U6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgZnMudW5saW5rU3luYyhmaWxlUGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ29weSBuZXcgZmlsZXNcclxuICAgICAgY29uc3QgY29weVJlY3Vyc2l2ZSA9IChzcmNEaXI6IHN0cmluZywgZGVzdERpcjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRlc3REaXIpKSB7XHJcbiAgICAgICAgICBmcy5ta2RpclN5bmMoZGVzdERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGVudHJpZXMgPSBmcy5yZWFkZGlyU3luYyhzcmNEaXIpO1xyXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHNyY1BhdGggPSBwYXRoLmpvaW4oc3JjRGlyLCBlbnRyeSk7XHJcbiAgICAgICAgICBjb25zdCBkZXN0UGF0aCA9IHBhdGguam9pbihkZXN0RGlyLCBlbnRyeSk7XHJcbiAgICAgICAgICBjb25zdCBzdGF0ID0gZnMubHN0YXRTeW5jKHNyY1BhdGgpO1xyXG5cclxuICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgICAgICAgY29weVJlY3Vyc2l2ZShzcmNQYXRoLCBkZXN0UGF0aCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmcy5jb3B5RmlsZVN5bmMoc3JjUGF0aCwgZGVzdFBhdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29weVJlY3Vyc2l2ZShzcmMsIGRlc3QpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIlx1MjcxMyBGcm9udGVuZCBidWlsZCBjb3BpZWQgdG8gYmFja2VuZC9wdWJsaWNcIik7XHJcbiAgICB9XHJcbiAgfSxcclxufTtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjo6XCIsXHJcbiAgICBwb3J0OiA4MDgwLFxyXG4gICAgaG1yOiB7XHJcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjb3B5RGlzdFBsdWdpbixcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNSLFNBQVMsb0JBQW9CO0FBQ25ULE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxRQUFRO0FBSGYsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxpQkFBaUI7QUFBQSxFQUNyQixNQUFNO0FBQUEsRUFDTixhQUFhLFlBQVk7QUFDdkIsVUFBTSxNQUFNLEtBQUssUUFBUSxrQ0FBVyxNQUFNO0FBQzFDLFVBQU0sT0FBTyxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBRXJELFFBQUksR0FBRyxXQUFXLEdBQUcsR0FBRztBQUV0QixVQUFJLEdBQUcsV0FBVyxJQUFJLEdBQUc7QUFDdkIsY0FBTSxRQUFRLEdBQUcsWUFBWSxJQUFJO0FBQ2pDLGNBQU0sUUFBUSxDQUFDLFNBQVM7QUFDdEIsY0FDRSxTQUFTLGdCQUNULFNBQVMsY0FDVCxTQUFTLGFBQ1Q7QUFDQSxrQkFBTSxXQUFXLEtBQUssS0FBSyxNQUFNLElBQUk7QUFDckMsZ0JBQUksR0FBRyxVQUFVLFFBQVEsRUFBRSxZQUFZLEdBQUc7QUFDeEMsaUJBQUcsT0FBTyxVQUFVLEVBQUUsV0FBVyxNQUFNLE9BQU8sS0FBSyxDQUFDO0FBQUEsWUFDdEQsT0FBTztBQUNMLGlCQUFHLFdBQVcsUUFBUTtBQUFBLFlBQ3hCO0FBQUEsVUFDRjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFHQSxZQUFNLGdCQUFnQixDQUFDLFFBQWdCLFlBQW9CO0FBQ3pELFlBQUksQ0FBQyxHQUFHLFdBQVcsT0FBTyxHQUFHO0FBQzNCLGFBQUcsVUFBVSxTQUFTLEVBQUUsV0FBVyxLQUFLLENBQUM7QUFBQSxRQUMzQztBQUNBLGNBQU0sVUFBVSxHQUFHLFlBQVksTUFBTTtBQUNyQyxnQkFBUSxRQUFRLENBQUMsVUFBVTtBQUN6QixnQkFBTSxVQUFVLEtBQUssS0FBSyxRQUFRLEtBQUs7QUFDdkMsZ0JBQU0sV0FBVyxLQUFLLEtBQUssU0FBUyxLQUFLO0FBQ3pDLGdCQUFNLE9BQU8sR0FBRyxVQUFVLE9BQU87QUFFakMsY0FBSSxLQUFLLFlBQVksR0FBRztBQUN0QiwwQkFBYyxTQUFTLFFBQVE7QUFBQSxVQUNqQyxPQUFPO0FBQ0wsZUFBRyxhQUFhLFNBQVMsUUFBUTtBQUFBLFVBQ25DO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUVBLG9CQUFjLEtBQUssSUFBSTtBQUN2QixjQUFRLElBQUksZ0RBQTJDO0FBQUEsSUFDekQ7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ047QUFBQSxFQUNGLEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
