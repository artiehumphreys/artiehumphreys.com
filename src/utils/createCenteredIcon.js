import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";

const paths = {
  "About Me": "about",
  Contact: "contact",
  Experience: "experience",
  Projects: "projects",
};

export async function createCenteredIcon(
  scene,
  texture,
  xPos,
  yPos,
  zPos,
  name,
  width = 12.5,
  height = 8.5
) {
  const planeGeometry = curvePlanes(width, height, xPos, yPos);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(xPos, yPos + 2, zPos + 1.5);
  if (name) {
    plane.userData = { type: "nav", url: paths[name] };
    const iconText = await addText(xPos, yPos, zPos - 0.15, name);
    scene.add(iconText);
  }
  scene.add(plane);
}
