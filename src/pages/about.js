import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadPortraitTexture } from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";

export async function aboutPage(scene) {
  const texture = loadPortraitTexture();

  const plane = createImage(texture);

  const textData = [
    {
      position: [0, 56.5, 8.7],
      content: "About Me",
    },
    {
      position: [5.5, 53.8, 8.7],
      content:
        "Hi, I'm Artie Humphreys, and I'm passionate about leveraging computer \nscience to drive innovation and create impactful solutions across \ndifferent fields, including finance, sports science, and technology.",
    },
    { position: [-6.75, 48.5, 8.7], content: "Education" },
    {
      position: [3.35, 46.5, 8.7],
      content:
        "I'm a third-year student at the Univeristy of Virginia, double-\nmajoring in Computer Science and Mathematics.",
    },
    { position: [-7.05, 42.8, 8.7], content: "Interests" },
    {
      position: [5.45, 40.8, 8.7],
      content:
        "I have a deep passion for sports, especially basketball, which led me to \njoin the UVA Men's Basketball Team as a Student Manager. In my free \ntime, I enjoy reading and building side projects.",
    },
    { position: [-8, 35.5, 8.7], content: "Skills" },
    {
      position: [6.15, 33.5, 8.7],
      content:
        "Proficient in: Python, Django, Go, JavaScript, React, Java, Bash, SQL, C, Git",
    },
  ];

  const headers = ["About Me", "Education", "Interests", "Skills"];

  const paragraphs = await Promise.all(
    textData.map(({ position, content }) =>
      addText(
        ...position,
        content,
        headers.includes(content) ? (content === "About Me" ? 2 : 1) : 0.7
      )
    )
  );
  [...paragraphs, plane].forEach((item) => {
    scene.add(item);
  });

  function createImage(texture) {
    const xOffset = -17.2;
    const yOffset = 42.3;

    const planeGeometry = curvePlanes(12, 14, xOffset, yOffset);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.encoding = THREE.sRGBEncoding;
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: false,
    });

    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xOffset, yOffset, 10.4);
    plane.userData = { type: "image", text: "Artie Humphreys Portrait" };
    return plane;
  }
}
