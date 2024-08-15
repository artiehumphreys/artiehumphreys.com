import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadPortraitTexture } from "../utils/textureLoader.js";

export function aboutPage(scene) {
  const texture = loadPortraitTexture();

  const plane = createImage(texture);

  scene.add(plane);
  console.log(scene.children);

  function createImage(texture) {
    const xOffset = -15;
    const yOffset = 48.5;

    const planeGeometry = curvePlanes(12.5, 15, xOffset, yOffset);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 1,
      metalness: 0,
      emissiveIntensity: 0.5,
      transparent: true,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xOffset, yOffset, 10.5);
    plane.userData = { type: "image", text: "Artie Humphreys Portrait" };
    return plane;
  }
}
