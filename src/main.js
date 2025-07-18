import { computer } from "./Computer.js";
import { setupRouter, router } from "./utils/router.js";
import { animationGroup } from "./animationGroup.js";

const { scene, camera, renderer } = computer();

setupRouter(scene, camera, renderer);

router.resolve();
router.updatePageLinks();

function animate(time) {
  requestAnimationFrame(animate);
  animationGroup.update(time);
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);
