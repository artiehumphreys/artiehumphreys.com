import { computer } from "../Computer.js";

export function route() {
  // eslint-disable-next-line no-undef
  const router = new Navigo("/", { hash: true });

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
