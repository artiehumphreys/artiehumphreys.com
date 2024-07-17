import { GLTFLoader } from "GLTFLoader";
import { createComputerScreen } from "./createComputerScreen.js";
import { createIcons } from "./createIcons.js";
import { loadScreenTexture, loadIconTextures } from "./utils/textureLoader.js";

export function loadModel(scene) {
  const screenTexture = loadScreenTexture();
  const iconTextures = loadIconTextures();
  const loader = new GLTFLoader();
  loader.load(
    "../models/scene.glb",
    function (gltf) {
      scene.add(gltf.scene);
      const model = gltf.scene;
      createComputerScreen(scene, model, screenTexture);
      createIcons(scene, iconTextures);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error happened: " + error);
    }
  );
}
