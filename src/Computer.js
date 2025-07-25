import * as THREE from "three";
import { setupLights } from "./lights.js";
import { loadModel } from "./loadComputerModel.js";
import { animateCamera } from "./animateCamera.js";
import { handleClickEvents, handleHoverEvents } from "./handleMouseEvents.js";
import { aboutPage } from "./pages/about.js";
import { homePage } from "./pages/home.js";
import { contactPage } from "./pages/contact.js";
import { experiencePage } from "./pages/experience.js";
import { projectPage } from "./pages/projects.js";
import { hidePageContent } from "./pages/hidePageContent.js";
import { createBackArrow } from "./utils/backArrow.js";

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
    "mousedown",
    handleClickEvents(scene, camera, raycaster, mouse),
    false
  );

  window.addEventListener(
    "mousemove",
    handleHoverEvents(scene, camera, raycaster, mouse),
    false
  );

  return { scene, camera, renderer };
}

let doAnimation = true;
let prevRoute = null;
export let isDropdownAnimating = false;

export function setDropdownAnimating(state) {
  isDropdownAnimating = state;
}

export function renderPage(scene, camera, renderer, route) {
  if (prevRoute == route) {
    return;
  }
  prevRoute = route;
  hidePageContent(scene);

  switch (route) {
    case "/about":
      createBackArrow(scene);
      aboutPage(scene);
      break;
    case "/projects":
      projectPage(scene, createBackArrow(scene));
      break;
    case "/experience":
      createBackArrow(scene);
      experiencePage(scene);
      break;
    case "/contact":
      createBackArrow(scene);
      contactPage(scene);
      break;
    default: {
      homePage(scene);
      if (doAnimation) {
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
}
