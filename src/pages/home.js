import * as THREE from "three";
import { TextGeometry } from "TextGeometry";
import { FontLoader } from "FontLoader";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadIconTextures } from "../utils/textureLoader.js";

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

  function createCenteredIcon(texture, xPos, name) {
    const planeGeometry = curvePlanes(12.5, 8.5);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xPos, yPos + 2, zPos + 0.05);
    plane.userData = { type: "icon", text: paths[name] };
    scene.add(plane);
    addIconText(xPos, name);
  }

  function addIconText(xPos, name) {
    const fontLoader = new FontLoader();
    fontLoader.load(
      "https://unpkg.com/three@0.166.1/examples/fonts/gentilis_bold.typeface.json",
      function (font) {
        const textGeometry = new TextGeometry(name, {
          font: font,
          depth: 0.1,
          size: 0.75,
          curveSegments: 12,
          bevelEnabled: false,
        });
        const textMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
        });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textGeometry.computeBoundingBox();
        const textWidth =
          textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        textMesh.position.set(xPos - textWidth / 2, yPos - 2, zPos * 2 - 0.7);
        textMesh.userData = { type: "text" };
        scene.add(textMesh);
      }
    );
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