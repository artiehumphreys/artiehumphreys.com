import * as THREE from "three";
import { loadBackArrowTexture } from "./textureLoader.js";
import { curvePlanes } from "./geometryUtils.js";

export async function createBackArrow(scene) {
  let xPos = -19.4;
  let yPos = 55.5;
  let zPos = 10.5;
  let width = 2.5;
  let height = 1.75;

  const backArrowTexture = loadBackArrowTexture();

  const planeGeometry = curvePlanes(width, height, xPos, yPos);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: backArrowTexture,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(xPos, yPos, zPos);
  plane.userData = {
    type: "nav",
    url: "/",
  };
  scene.add(plane);
  return plane;
}
