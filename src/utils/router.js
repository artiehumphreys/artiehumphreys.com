import { computer, renderPage } from "../Computer.js";

let isModelLoaded = false;
let scene, camera, renderer;

export function route() {
  if (!isModelLoaded) {
    const result = computer();
    scene = result.scene;
    camera = result.camera;
    renderer = result.renderer;
    isModelLoaded = true;
  }

  // eslint-disable-next-line no-undef
  const router = new Navigo("/", { hash: true });

  router
    .on("/", () => {
      renderPage(scene, camera, renderer, "/");
    })
    .on("/about", () => {
      renderPage(scene, camera, renderer, "/about");
    })
    .on("/projects", () => {
      renderPage(scene, camera, renderer, "/projects");
    })
    .on("/contact", () => {
      renderPage(scene, camera, renderer, "/contact");
    })
    .resolve();

  router.updatePageLinks();
  return router;
}
