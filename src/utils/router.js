import { computer } from "../Computer.js";

export function route() {
  const router = new Navigo("/", { hash: false });

  router
    .on("/", () => {
      computer("/");
    })
    .on("/about", () => {
      computer("/about");
    })
    .on("/projects", () => {
      computer("/projects");
    })
    .on("/contact", () => {
      computer("/contact");
    })
    .resolve();

  router.updatePageLinks();
  return router;
}
