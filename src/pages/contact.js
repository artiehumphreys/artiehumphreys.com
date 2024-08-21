import * as THREE from "three";
import { loadContactTextures } from "../utils/textureLoader.js";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";

export async function contactPage(scene) {
  const xPos = -11;
  const zPos = 8.7;
  const textures = loadContactTextures();
  const header = await addText(0, 56.5, 8.7, "Contact", 2);
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
        ? xPos + 12.2
        : name === "artieh2003@gmail.com"
        ? xPos + 10.5
        : xPos + 13.5,
      yPos + 1.6,
      name
    );
    iconText.userData.url = name;
    const clickArea = createClickArea(iconText, name);

    scene.add(plane);
    scene.add(header);
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

    const center = new THREE.Vector3();
    boundingBox.getCenter(center);

    const clickGeometry = new THREE.PlaneGeometry(size.x, size.y);
    const clickMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    });

    const clickMesh = new THREE.Mesh(clickGeometry, clickMaterial);

    const offsets = {
      "artieh2003@gmail.com": -0.75,
      "linkedin.com/in/artiehumphreys": 1.5,
      "github.com/artiehumphreys": 0.5,
    };

    clickMesh.position.set(center.x, center.y + offsets[name], center.z + 0.1);

    clickMesh.userData = { type: "redirect", url: name };

    return clickMesh;
  }
}
