import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      GLTFLoader: "three/examples/jsm/loaders/GLTFLoader.js",
      DRACOLoader: "three/examples/jsm/loaders/DRACOLoader.js",
      FontLoader: "three/examples/jsm/loaders/FontLoader.js",
      TextGeometry: "three/examples/jsm/geometries/TextGeometry.js",
    },
  },
});
