import * as THREE from "three";

export function curvePlanes(width, height, xOffset = 0, yOffset = 0) {
  const screenGeometry = new THREE.PlaneGeometry(width, height, 25, 17);
  const vertices = screenGeometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i] + xOffset;
    const y = vertices[i + 1] + yOffset;
    const offset = 3;
    vertices[i + 2] =
      offset +
      2 +
      Math.cos((x / 65) * Math.PI) * offset -
      (y / 28) * offset * 0.35;
  }
  screenGeometry.attributes.position.needsUpdate = true;
  screenGeometry.computeVertexNormals();
  return screenGeometry;
}

export function curveText(textGeometry, xOffset = 0, yOffset = 0) {
  const vertices = textGeometry.attributes.position.array;
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i] + xOffset;
    const y = vertices[i + 1] + yOffset;
    const offset = 3;

    vertices[i + 2] =
      offset + Math.cos((x / 65) * Math.PI) * offset - (y / 28) * offset * 0.35;
  }
  textGeometry.attributes.position.needsUpdate = true;
  textGeometry.computeVertexNormals();
}
