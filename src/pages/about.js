import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadPortraitTexture } from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";

export function aboutPage(scene) {
  const texture = loadPortraitTexture();

  const plane = createImage(texture);

  scene.add(plane);
  addText(
    scene,
    4,
    54.25,
    10.5,
    "My Name is Artie Humphreys, I'm a third-year \nstudent at the Univeristy of Virginia, double-\nmajoring in Computer Science and Mathematics.\
    \n\n\nI'm extremely passionate about the applications \nof computer science within different fields, such \nas finance, sports science, and machine learning."
  );

  console.log(scene.children);

  function createImage(texture) {
    const xOffset = -15.25;
    const yOffset = 48;

    const planeGeometry = curvePlanes(12, 14.5, xOffset, yOffset);
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
