import { computer } from "./Computer.js";

function webgl_support() {
  //https://stackoverflow.com/questions/11871077/proper-way-to-detect-webgl-support
  try {
    var canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

webgl_support()
  ? computer()
  : console.error(
      "WebGL is not supported on your browser. Please visit https://get.webgl.org/webgl2/ for more."
    );
