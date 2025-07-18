import { GLTFLoader } from "GLTFLoader";
import { DRACOLoader } from "DRACOLoader";
import { createComputerScreen } from "./createComputerScreen.js";

export function loadModel(scene) {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    "../models/scene.glb",
    function (gltf) {
      scene.add(gltf.scene);
      const model = gltf.scene;
      createComputerScreen(scene, model);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error("An error happened: " + error);
    }
  );
}
