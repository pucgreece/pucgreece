export default defineConfig({
  base: '/pucgreece/',   // ✅ THIS FIXES BLANK PAGE

  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),     // optional, can keep
    // ❌ REMOVE THESE:
    // vitePluginManusRuntime(),
    // vitePluginManusDebugCollector(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },

  root: path.resolve(import.meta.dirname, "client"),

  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
