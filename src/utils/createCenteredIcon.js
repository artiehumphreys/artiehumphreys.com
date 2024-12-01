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
  name
) {
  const planeGeometry = curvePlanes(12.5, 8.5, xPos, yPos);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(xPos, yPos + 2, zPos + 1.5);
  plane.userData = { type: "nav", url: paths[name] };
  scene.add(plane);
  const iconText = await addText(xPos, yPos, zPos - 0.15, name);
  scene.add(iconText);
}
