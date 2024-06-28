import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// import { visualizer } from 'rollup-plugin-visualizer';
import process from 'process';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: "",
    plugins: [
      react(),
      nodePolyfills(),
      splitVendorChunkPlugin(),
      // visualizer({
      //   open: true,
      //   filename: 'stats.html'
      // })
    ],
    preview: {
      host: true,
    },
    server: {
      host: true,
    },  
    build: {
      rollupOptions: {
        output: {
          sourcemap: false,
        //   manualChunks(id) {
        //     if (id.includes('node_modules')) {
        //       const modulesToChunk = ['perspective', 'mermaid', 'elk', 'lodash', 'chakra', 'opentelemetry', 'loaders'];
        //       const chunk = modulesToChunk.find(module => id.includes(module));
        //       if (chunk) {
        //         return `vendor-${chunk}`;
        //       }

        //       return 'vendor-others';
        //     }
        //   },
        },
      }
    },
    resolve: {
      mainFields: [],
      alias: {
        "@": resolve(__dirname, "src")
      },
    },
  }
});
