import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadIconTextures } from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";

const yPos = 42;
const zPos = 8.85;
const paths = {
  "About Me": "about",
  Contact: "contact",
  Experience: "experience",
  Projects: "projects",
};

export function createIcons(scene) {
  const textures = loadIconTextures();

  createCenteredIcon(textures.aboutMeTexture, -15, "About Me");
  createCenteredIcon(textures.contactTexture, 15, "Contact");
  createCenteredIcon(textures.experienceTexture, 5, "Experience");
  createCenteredIcon(textures.projectTexture, -5, "Projects");

  async function createCenteredIcon(texture, xPos, name) {
    const planeGeometry = curvePlanes(12.5, 8.5, xPos, yPos);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xPos, yPos + 2, zPos + 1.5);
    plane.userData = { type: "icon", text: paths[name] };
    scene.add(plane);
    await addText(scene, xPos, yPos, zPos, name);
  }
}

export function hideIcons(scene) {
  const objectsToRemove = [];
  scene.children.forEach((child) => {
    if (["icon", "text"].includes(child.userData.type)) {
      objectsToRemove.push(child);
    }
  });
  objectsToRemove.forEach((object) => {
    scene.remove(object);
  });
}
