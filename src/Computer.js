import * as THREE from "three";
import { setupLights } from "./lights.js";
import { loadModel } from "./loadComputerModel.js";
import { animateCamera } from "./animateCamera.js";
import { handleIconClickEvents } from "./handleIconClickEvents.js";
import { aboutPage, hideAboutPage } from "./pages/about.js";
import { hideHomePage, createIcons } from "./pages/home.js";
import { contactPage } from "./pages/contact.js";

export function computer() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  setupLights(scene);
  loadModel(scene);

  camera.position.set(0, 43, 38);

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  window.addEventListener(
    "click",
    handleIconClickEvents(scene, camera, raycaster, mouse),
    false
  );

  return { scene, camera, renderer };
}

let prevRoute = null;
let doAnimation = true;
export function renderPage(scene, camera, renderer, route) {
  if (route === prevRoute) {
    return;
  }
  prevRoute = route;

  switch (prevRoute) {
    case "/about":
      hideAboutPage(scene);
      break;
    case "/projects":
      break;
    case "/experience":
      break;
    case "/contact":
      break;
    default:
      hideHomePage(scene);
      break;
  }

  switch (route) {
    case "/about":
      hideHomePage(scene);
      aboutPage(scene);
      break;
    case "/projects":
      break;
    case "/experience":
      break;
    case "/contact":
      contactPage();
      break;
    default: {
      hideAboutPage(scene);
      createIcons(scene);
      if (doAnimation === true) {
        camera.position.set(0, 50, 100);
        camera.rotation.set(-0.5, 0, 0);
        animateCamera(camera);
        setTimeout(() => {
          doAnimation = false;
        }, 2000);
      }
      break;
    }
  }
  function animate(time) {
    requestAnimationFrame(animate);
    if (doAnimation === true) {
      TWEEN.update(time);
    }
    renderer.render(scene, camera);
  }
  animate();
}
