import Navigo from "navigo";
import { renderPage } from "../Computer.js";

const router = new Navigo("/", { hash: true });

export function setupRouter(scene, camera, renderer) {
  router
    .on("/", () => renderPage(scene, camera, renderer, "/"))
    .on("/about", () => renderPage(scene, camera, renderer, "/about"))
    .on("/projects", () => renderPage(scene, camera, renderer, "/projects"))
    .on("/experience", () => renderPage(scene, camera, renderer, "/experience"))
    .on("/contact", () => renderPage(scene, camera, renderer, "/contact"));
}

export { router };
