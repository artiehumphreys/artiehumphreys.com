import * as THREE from "three";
import { loadContactTextures } from "../utils/textureLoader.js";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";

export function contactPage(scene) {
  const xPos = -3;
  const zPos = 8.7;
  const textures = loadContactTextures();
  createIcon(textures.linkedinTexture, 45, "LinkedIn");

  async function createIcon(texture, yPos, name) {
    const planeGeometry = curvePlanes(12.5, 8.5, xPos, yPos);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xPos, yPos + 2, zPos + 1.5);
    plane.userData = { type: "icon", text: name };
    const iconText = await createIconText(xPos, yPos, name);
    scene.add(plane);
    scene.add(iconText);
  }

  async function createIconText(xPos, yPos, name) {
    const offset = 2;
    const iconText = await addText(xPos + offset, yPos, zPos, name);
    return iconText;
  }
}

export function hideContactPage(scene) {
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
