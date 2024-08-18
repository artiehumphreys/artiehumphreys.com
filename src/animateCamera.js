export function animateCamera(camera) {
  const startPosition = { x: 0, y: 50, z: 100, rotationX: -0.5 };
  const endPosition = { x: 0, y: 43, z: 38, rotationX: 0 };

  // eslint-disable-next-line no-unused-vars
  const tween = new TWEEN.Tween(startPosition)
    .to(endPosition, 2000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.position.set(startPosition.x, startPosition.y, startPosition.z);
      camera.rotation.x = startPosition.rotationX;
    })
    .start();
}
