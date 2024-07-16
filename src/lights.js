import * as THREE from "three";

export function setupLights(scene) {
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(50, 80, 75);
    directionalLight1.target.position.set(0, 0, -10);
    directionalLight1.castShadow = true;
    directionalLight1.shadow.mapSize.width = 1024;
    directionalLight1.shadow.mapSize.height = 1024;
    directionalLight1.shadow.camera.near = 0.1;
    directionalLight1.shadow.camera.far = 500;

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-50, 80, 75);
    directionalLight2.target.position.set(0, 0, -10);
    directionalLight2.castShadow = true;
    directionalLight2.shadow.mapSize.width = 1024;
    directionalLight2.shadow.mapSize.height = 1024;
    directionalLight2.shadow.camera.near = 0.1;
    directionalLight2.shadow.camera.far = 500;

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);

    scene.add(directionalLight1);
    scene.add(directionalLight1.target);
    scene.add(directionalLight2);
    scene.add(directionalLight2.target);
    scene.add(ambientLight);
}
