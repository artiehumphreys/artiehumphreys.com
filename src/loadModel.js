import { GLTFLoader } from "GLTFLoader";
import * as THREE from "three";


export function loadModel(scene) {

    function createScreen(model){
        model.traverse(function (node) {
            if (node.isMesh && node.name === "defaultMaterial") {
                const screenMesh = node;
                const width = 50;
                const height = 34;
                const screenGeometry = curvePlanes(width, height);

                const screenMaterial = new THREE.MeshStandardMaterial({
                    map: screenTexture,
                    roughness: 0.1,
                    metalness: 0.0
                });
                const screen = new THREE.Mesh(screenGeometry, screenMaterial);
                screen.position.set(0, 42, 8.8);
                scene.add(screen);
            }
        });
    }

    function curvePlanes(width, height){
        const screenGeometry = new THREE.PlaneGeometry(width, height, 25, 17);
        const vertices = screenGeometry.attributes.position.array;

        for (let i = 0; i < vertices.length; i += 3) {
            const x = vertices[i];
            const y = vertices[i + 1];
            const offset = 3;
            vertices[i + 2] = offset + 2 + Math.cos((x / 65) * Math.PI) * offset - (y / 28) * offset * 0.35;
        }

        screenGeometry.attributes.position.needsUpdate = true;
        screenGeometry.computeVertexNormals();
        return screenGeometry

    }

    function createCenteredIcon(texture, positionX) {
        const planeGeometry = curvePlanes(12.5, 8.5);
        const planeMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.1,
            metalness: 0.0,
            transparent: true
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(positionX, 42, 8.8);
        scene.add(plane);
    }

    const textureLoader = new THREE.TextureLoader();
    const screenTexture = textureLoader.load('../models/background.jpg');
    const aboutMeTexture = textureLoader.load('../models/aboutme.png');
    const contactTexture = textureLoader.load('../models/contact.png');
    const experienceTexture = textureLoader.load('../models/experience.png');
    const projectTexture = textureLoader.load('../models/projects.png');
    const loader = new GLTFLoader();
    loader.load(
        '../models/scene.glb',
        function (gltf) {
            scene.add(gltf.scene);
            const model = gltf.scene;
            createScreen(model);
            createCenteredIcon(aboutMeTexture, -15);
            createCenteredIcon(contactTexture, 5);
            createCenteredIcon(experienceTexture, 15);
            createCenteredIcon(projectTexture, -5);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened: ' + error);
        }
    );
}