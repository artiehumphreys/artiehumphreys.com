export function curvePlanes(width, height) {
    const screenGeometry = new THREE.PlaneGeometry(width, height, 25, 17);
    const vertices = screenGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const offset = 3;
        vertices[i + 2] = offset + 2 + Math.cos((x / 65) * Math.PI) * offset - (y / 28) * offset * 0.35;
    }
    screenGeometry.attributes.position.needsUpdate = true;
    screenGeometry.computeVertexNormals();
    return screenGeometry;
}