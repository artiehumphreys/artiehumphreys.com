import { GLTFLoader } from "GLTFLoader";
import { createComputerScreen } from "./createComputerScreen.js";
import { createIcons } from "./pages/home.js";

export function loadModel(scene) {
  const loader = new GLTFLoader();
  loader.load(
    "../models/scene.glb",
    function (gltf) {
      scene.add(gltf.scene);
      const model = gltf.scene;
      createComputerScreen(scene, model);
      createIcons(scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error happened: " + error);
    }
  );
}
