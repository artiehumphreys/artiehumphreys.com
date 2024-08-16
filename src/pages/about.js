import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadPortraitTexture } from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";

export async function aboutPage(scene) {
  const texture = loadPortraitTexture();

  const plane = createImage(texture);

  const [paragraph1, paragraph2] = await Promise.all([
    addText(
      6,
      56.5,
      8.7,
      "Hi, I'm Artie Humphreys, a third-year student at the University \nof Virginia, pursuing a double major in Computer Science \nand Mathematics. I'm passionate about leveraging computer \nscience to drive innovation and create meaningful solutions \nacross different fields, including finance, sports science, \nand business consulting."
    ),
    addText(
      5.4,
      45,
      8.7,
      "With several years of experience developing enterprise-scale \nsoftware, I’ve worked with a wide array of technologies and \nframeworks. I'm a curious learner, always eager to dive into \ncutting-edge innovations and explore new tools."
    ),
  ]);

  scene.add(plane);
  scene.add(paragraph1);
  scene.add(paragraph2);

  function handleScroll(event) {
    const scrollY = event.scrollY;
    plane.position.y = 48 + scrollY;
    paragraph1.position.y = 56.5 + scrollY;
    paragraph2.position.y = 45 + scrollY;
  }

  window.addEventListener("scroll", handleScroll);

  function createImage(texture) {
    const xOffset = -15.25;
    const yOffset = 48;

    const planeGeometry = curvePlanes(12, 14.5, xOffset, yOffset);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 1,
      metalness: 0.2,
      emissiveIntensity: 0.5,
      transparent: true,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xOffset, yOffset, 10.5);
    plane.userData = { type: "image", text: "Artie Humphreys Portrait" };
    return plane;
  }
}

export function hideAboutPage(scene) {
  const objectsToRemove = [];
  scene.children.forEach((child) => {
    if (["image", "text"].includes(child.userData.type)) {
      objectsToRemove.push(child);
    }
    objectsToRemove.forEach((object) => {
      scene.remove(object);
    });
  });
}
