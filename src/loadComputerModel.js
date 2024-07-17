import { GLTFLoader } from "GLTFLoader";
import * as THREE from "three";
import { createComputerScreen } from "./createComputerScreen";
import { createIcons } from "./createIcons";
import { loadScreenTexture } from "./utils/textureLoader";


export function loadModel(scene) {
    const textureLoader = new THREE.TextureLoader();
    const screenTexture = loadScreenTexture();
    const loader = new GLTFLoader();
    loader.load(
        '../models/scene.glb',
        function (gltf) {
            scene.add(gltf.scene);
            const model = gltf.scene;
            createComputerScreen(model);
            createIcons(aboutMeTexture, -15, "About Me");
            createIcons(contactTexture, 15, "Contact");
            createIcons(experienceTexture, 5, "Experience");
            createIcons(projectTexture, -5, "Projects");
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened: ' + error);
        }
    );
}