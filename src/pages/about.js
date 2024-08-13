import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadPortraitTexture } from "../utils/textureLoader.js";

export function aboutPage(scene) {
  const texture = loadPortraitTexture();
  const planeGeometry = curvePlanes(25, 17.5);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(5, 15, 8.9);
  plane.userData = { type: "image", text: "Artie Humphreys Portrait" };
  scene.add(plane);
}
