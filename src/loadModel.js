import { GLTFLoader } from "GLTFLoader";

export function loadModel(scene) {
    const loader = new GLTFLoader();
    loader.load(
        '../models/scene.glb',
        function (gltf) {
            scene.add(gltf.scene);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );
}
