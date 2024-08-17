import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadPortraitTexture } from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";

export async function aboutPage(scene) {
  const texture = loadPortraitTexture();

  const plane = createImage(texture);

  const [paragraph1, paragraph2, paragraph3, paragraph4, paragraph5] =
    await Promise.all([
      addText(
        6,
        53.5,
        8.7,
        "Hi, I'm Artie Humphreys, a third-year student at the University \nof Virginia, pursuing a double major in Computer Science \nand Mathematics. I'm passionate about leveraging computer \nscience to drive innovation and create meaningful solutions \nacross different fields, including finance, sports science, \nand business consulting."
      ),
      addText(
        5.4,
        42,
        8.7,
        "With several years of experience developing enterprise-scale \nsoftware, I’ve worked with a wide array of technologies and \nframeworks. I'm a curious learner, always eager to dive into \ncutting-edge innovations and explore new tools."
      ),
      addText(
        -1,
        30,
        8.72,
        "My passion for computer science began in high school, where I actively sought to expand \nmy knowledge, exploring topics ranging from the inner workings of the World Wide Web \nto mimicking particle motion and collisions. As a senior, I interned with Volley, where I \ndeveloped a deep interest in data analytics and the software development life cycle."
      ),
      addText(
        -1,
        21,
        8.72,
        "Eager to leverage my newly-found skills, I joined Sitscape the following summer, where I \nutilized my mathematical background to enhance the search functionality within their \ncommerical software. This experience inspried me to join theCourseForum at UVA, and \nlater Biocore, where I focused on improving NFL player safety using computer vision."
      ),
      addText(
        -2.75,
        9,
        8.73,
        "I'm excited to take on new challenges and apply my skills to new opportunities. \nYou can explore my contributions, projects, and organizations on my GitHub."
      ),
    ]);

  scene.add(plane);
  scene.add(paragraph1);
  scene.add(paragraph2);
  scene.add(paragraph3);
  scene.add(paragraph4);
  scene.add(paragraph5);

  function handleScroll(delta) {
    delta > 0 ? (delta = Math.min(delta, 10)) : (delta = Math.max(delta, -10));
    delta = delta / 5;
    if (plane.position.y + delta < 45) {
      return;
    }
    [plane, paragraph1, paragraph2, paragraph3, paragraph4, paragraph5].forEach(
      (item) => {
        item.position.y += delta;
        item.position.z -= delta / 26;
      }
    );
  }

  document.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      handleScroll(event.deltaY);
    },
    { passive: false }
  );

  function createImage(texture) {
    const xOffset = -15.25;
    const yOffset = 45;

    const planeGeometry = curvePlanes(12, 14.5, xOffset, yOffset);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 1,
      metalness: 0.2,
      emissiveIntensity: 0.5,
      transparent: true,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xOffset, yOffset, 10.4);
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
