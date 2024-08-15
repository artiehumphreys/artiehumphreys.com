import * as THREE from "three";
import { TextGeometry } from "TextGeometry";
import { FontLoader } from "FontLoader";

export function addText(scene, xPos, yPos, zPos, name) {
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
