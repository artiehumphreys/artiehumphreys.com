import * as THREE from "three";
import { loadContactTextures } from "../utils/textureLoader.js";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";

export async function contactPage(scene) {
  const xPos = -12.35;
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
    "linkedin.com/in/artiehumphreys",
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
      name === "github.com/artiehumphreys"
        ? xPos + 13.5
        : name === "artieh2003@gmail.com"
        ? xPos + 11.9
        : xPos + 15,
      yPos + 1.5,
      name
    );
    const clickArea = createClickArea(iconText, name);

    scene.add(plane);
    scene.add(iconText);
    scene.add(clickArea);
  }

  async function createIconText(xPos, yPos, name) {
    const iconText = await addText(xPos, yPos, zPos, name, 1);
    return iconText;
  }

  function createClickArea(textMesh, name) {
    const boundingBox = new THREE.Box3().setFromObject(textMesh);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    const clickGeometry = new THREE.PlaneGeometry(size.x, size.y);
    const clickMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    });

    const clickMesh = new THREE.Mesh(clickGeometry, clickMaterial);

    clickMesh.position.set(
      textMesh.position.x,
      textMesh.position.y,
      textMesh.position.z + 0.1
    );

    clickMesh.userData = { type: "redirect", text: name };

    return clickMesh;
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
