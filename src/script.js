import { computer } from "./Computer.js";
import { route } from "./utils/router.js";

function webgl_support() {
  //https://stackoverflow.com/questions/11871077/proper-way-to-detect-webgl-support
  try {
    var canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return false;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const _ = route();
  webgl_support()
    ? computer()
    : console.error(
        "WebGL is not supported on your browser. Please visit https://get.webgl.org/webgl2/ for more."
      );
});
