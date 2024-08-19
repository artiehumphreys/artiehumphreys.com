import * as THREE from "three";
import { loadContactTextures } from "../utils/textureLoader.js";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";

export async function contactPage(scene) {
  const xPos = -12;
  const zPos = 8.7;
  const textures = loadContactTextures();
  await createIcon(textures.emailTexture, 38, "artieh2003@gmail.com", 8, 7.5);
  await createIcon(
    textures.githubTexture,
    44,
    "github.com/artiehumphreys",
    5,
    4.75
  );
  await createIcon(
    textures.linkedinTexture,
    50,
    "linkedin.com/artiehumphreys",
    4.5,
    4.25
  );

  async function createIcon(texture, yPos, name, width, height) {
    const planeGeometry = curvePlanes(width, height, xPos, yPos);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xPos, yPos, zPos + 2);
    plane.userData = { type: "icon", text: name };
    const iconText = await createIconText(
      name === "artieh2003@gmail.com" ? xPos + 12.35 : xPos + 12.5,
      yPos + 1.5,
      name
    );
    scene.add(plane);
    scene.add(iconText);
  }

  async function createIconText(xPos, yPos, name) {
    const iconText = await addText(xPos + 2, yPos, zPos, name, 1);
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
