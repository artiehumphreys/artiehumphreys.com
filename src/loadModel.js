import { GLTFLoader } from "GLTFLoader";
import { TextGeometry } from "TextGeometry";
import { FontLoader } from "FontLoader";
import * as THREE from "three";


export function loadModel(scene) {

    const yPos = 42;
    const zPos = 8.8;

    function createComputerScreen(model){
        model.traverse(function (node) {
            if (node.isMesh && node.name === "defaultMaterial") {
                const screenMesh = node;
                const width = 50;
                const height = 34;
                const screenGeometry = curvePlanes(width, height);

                const screenMaterial = new THREE.MeshStandardMaterial({
                    map: screenTexture,
                    roughness: 0.2,
                    metalness: 0.0,
                    emissive: new THREE.Color(0x444444),
                    emissiveIntensity: 0.25
                });
                const screen = new THREE.Mesh(screenGeometry, screenMaterial);
                screen.position.set(0, yPos, zPos);
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

    function createCenteredIcon(texture, positionX, name) {
        const planeGeometry = curvePlanes(12.5, 8.5);
        const planeMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.1,
            metalness: 0.2,
            transparent: true,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(positionX, yPos + 2, zPos + 0.05);
        plane.userData = { type: 'icon', text: name };
        scene.add(plane);
        addIconText(positionX, name);
    }

    function addIconText(positionX, name){
        const fontLoader = new FontLoader();
        fontLoader.load("https://unpkg.com/three@0.166.1/examples/fonts/gentilis_bold.typeface.json", function(font) {
            const textGeometry = new TextGeometry(name, {
                font: font,
                size: 1,
                depth: 0.1,
                size: 0.75,
                curveSegments: 12,
                bevelEnabled: false
            });
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textGeometry.computeBoundingBox();
            const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.position.set(positionX - textWidth / 2, yPos - 2, zPos * 2 - 0.7);
            scene.add(textMesh);
        });
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
            createComputerScreen(model);
            createCenteredIcon(aboutMeTexture, -15, "About Me");
            createCenteredIcon(contactTexture, 15, "Contact");
            createCenteredIcon(experienceTexture, 5, "Experience");
            createCenteredIcon(projectTexture, -5, "Projects");
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened: ' + error);
        }
    );
}