import * as THREE from "three";
import { TextGeometry } from "TextGeometry";
import { FontLoader } from "FontLoader";
import { curveText } from "./geometryUtils.js";

export async function addText(scene, xPos, yPos, zPos, name) {
  const fontLoader = new FontLoader();
  const font = await new Promise((resolve, reject) => {
    fontLoader.load(
      "https://unpkg.com/three@0.166.1/examples/fonts/gentilis_bold.typeface.json",
      resolve,
      undefined,
      reject
    );
  });
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
  textMesh.position.set(xPos - textWidth / 2, yPos - 2, zPos * 2 - 5);
  textMesh.userData = { type: "text", text: name };

  curveText(textGeometry, xPos - textWidth / 2, yPos - 2);

  scene.add(textMesh);
}
