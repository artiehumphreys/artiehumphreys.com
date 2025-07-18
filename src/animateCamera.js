import { Tween, Easing } from "@tweenjs/tween.js";
import { animationGroup } from "./animationGroup.js";

export function animateCamera(camera) {
  const start = { x: 0, y: 50, z: 100, rotationX: -0.5 };
  const end = { x: 0, y: 43, z: 38, rotationX: 0 };

  const camTween = new Tween(start)
    .to(end, 2000)
    .easing(Easing.Quadratic.InOut)
    .onUpdate(() => {
      camera.position.set(start.x, start.y, start.z);
      camera.rotation.x = start.rotationX;
    });

  animationGroup.add(camTween);
  camTween.start();
}
