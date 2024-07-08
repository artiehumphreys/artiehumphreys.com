import { GLTFLoader } from "GLTFLoader";
import * as THREE from "three";


export function loadModel(scene) {

    const textureLoader = new THREE.TextureLoader();
    const screenTexture = textureLoader.load('../models/hi.png');
    const loader = new GLTFLoader();
    loader.load(
        '../models/scene.glb',
        function (gltf) {
            scene.add(gltf.scene);
            const model = gltf.scene;
            model.traverse(function (node) {
                if (node.isMesh && node.name === "defaultMaterial") {
                    const screenMesh = node;
                    const newMaterial = new THREE.MeshBasicMaterial({
                        map: screenTexture
                    });

                    const screenGeometry = new THREE.PlaneGeometry(1, 1);
                    screenGeometry.scale(47, 28, 1);
                    screenGeometry.translate(0, 10, 0.5);

                    const screen = new THREE.Mesh(screenGeometry, newMaterial);
                    screen.position.set(0, 34, 16);
                    scene.add(screen);
                        }
                    });
            scene.add(model);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.log('An error happened');
        }
    );
}
