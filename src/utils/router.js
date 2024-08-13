import { computer, renderPage } from "../Computer.js";

export function route() {
  const { scene, camera, renderer } = computer();

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
