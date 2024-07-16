import { GLTFLoader } from "GLTFLoader";
import * as THREE from "three";


export function loadModel(scene) {

    function createScreen(model){
        model.traverse(function (node) {
            if (node.isMesh && node.name === "defaultMaterial") {
                const screenMesh = node;
                const screenGeometry = new THREE.PlaneGeometry(50, 34, 32, 32);
                const vertices = screenGeometry.attributes.position.array;

                for (let i = 0; i < vertices.length; i += 3) {
                    const x = vertices[i];
                    const y = vertices[i + 1];
                    const offset = 3;
                    vertices[i + 2] = offset + 2 + Math.cos((x / 65) * Math.PI) * offset - (y / 28) * offset * 0.35;
                }
                screenGeometry.attributes.position.needsUpdate = true;
                screenGeometry.computeVertexNormals();

                const screenMaterial = new THREE.MeshStandardMaterial({
                    map: screenTexture,
                    roughness: 0.0,
                    metalness: 0.0
                });
                const screen = new THREE.Mesh(screenGeometry, screenMaterial);
                screen.position.set(0, 42, 8.8);
                scene.add(screen);
            }
        });
    }

    const textureLoader = new THREE.TextureLoader();
    const screenTexture = textureLoader.load('../models/background.jpg');
    const loader = new GLTFLoader();
    loader.load(
        '../models/scene.glb',
        function (gltf) {
            scene.add(gltf.scene);
            const model = gltf.scene;
            model = createScreen(model);
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