import * as THREE from "three";
import { curvePlanes } from "./utils/geometryUtils.js";

const yPos = 42;
const zPos = 8.8;

export function createComputerScreen(scene, model, screenTexture){
    model.traverse(function (node) {
        if (node.isMesh && node.name === "defaultMaterial") {
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
