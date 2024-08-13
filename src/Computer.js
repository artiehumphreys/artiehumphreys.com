import * as THREE from "three";
import { setupLights } from "./lights.js";
import { loadModel } from "./loadComputerModel.js";
import { animateCamera } from "./animateCamera.js";
import { handleIconClickEvents } from "./handleIconClickEvents.js";
import { aboutPage } from "./pages/about.js";
import { hideIcons, createIcons } from "./pages/home.js";

export function computer() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const canvas = document.getElementById("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  setupLights(scene);

  loadModel(scene);

  camera.position.set(0, 42, 38);
  loadPage();

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

  function loadPage() {
    const path = window.location.hash;
    console.log(path);
    switch (path) {
      case "#/about":
        console.log("Loading About Page");
        hideIcons(scene);
        aboutPage(scene);
        break;
      case "#/projects":
        break;
      case "#/experience":
        break;
      default:
        createIcons(scene);
        camera.position.set(0, 50, 100);
        camera.rotation.set(-0.5, 0, 0);

        animateCamera(camera);

        animate();
        break;
    }
  }

  function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
    renderer.render(scene, camera);
  }
}
