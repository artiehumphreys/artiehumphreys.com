import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadPortraitTexture } from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";

export async function aboutPage(scene) {
  const texture = loadPortraitTexture();

  const plane = createImage(texture);

  const textData = [
    {
      position: [-0.25, 55.5, 8.7],
      content: "About Me",
    },
    {
      position: [6, 51.5, 8.7],
      content:
        "Hi, I'm Artie Humphreys, a third-year student at the University \nof Virginia, double-majoring in Computer Science and \nMathematics. I'm passionate about using computer science \nto drive innovation and create solutions in different fields, \nsuch as finance, sports science, and business consulting.",
    },
    {
      position: [5.4, 40.5, 8.7],
      content:
        "With several years of experience developing enterprise-scale \nsoftware, I’ve worked with a wide array of technologies and \nframeworks. I'm a curious learner, always eager to dive into \ncutting-edge innovations and explore new tools.",
    },
    {
      position: [-1, 29.5, 8.72],
      content:
        "My passion for computer science began in high school, where I actively sought to expand \nmy knowledge, exploring topics ranging from the inner workings of the World Wide Web \nto mimicking particle motion and collisions. As a senior, I interned with Volley, where I \ndeveloped a deep interest in data analytics and the software development life cycle.",
    },
    {
      position: [-1, 18.5, 8.72],
      content:
        "Eager to leverage my newly-found skills, I joined Sitscape the following summer, where I \nutilized my mathematical background to enhance the search functionality within their \ncommercial software. This experience inspired me to join theCourseForum at UVA, and \nlater Biocore, where I focused on improving NFL player safety using computer vision.",
    },
    {
      position: [-2.75, 7.5, 8.73],
      content:
        "I'm excited to take on new challenges and apply my skills to new opportunities. \nYou can explore my contributions, projects, and organizations on my GitHub.",
    },
  ];

  const paragraphs = await Promise.all(
    textData.map(({ position, content }) =>
      addText(...position, content, content === "About Me" ? 2 : 0.75)
    )
  );

  const scrollBar = createScrollbar();
  [...scrollBar, ...paragraphs, plane].forEach((item) => {
    scene.add(item);
  });

  function handleScroll(delta) {
    delta > 0 ? (delta = Math.min(delta, 10)) : (delta = Math.max(delta, -10));
    delta = delta / 5;
    if (plane.position.y + delta < 43 || plane.position.y + delta > 82) {
      return;
    }
    [plane, ...paragraphs].forEach((item) => {
      item.position.y += delta;
      item.position.z -= delta / 26;
    });
  }

  function createScrollbar() {
    const trackHeight = 12;
    const thumbHeight = 4;
    const xPos = 14.5;
    const yPos = 43.25;
    const zPos = 17.5;

    const trackGeometry = curvePlanes(0.5, trackHeight, xPos, yPos);
    const trackMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.position.set(xPos, yPos, zPos);

    const thumbGeometry = curvePlanes(0.5, thumbHeight, xPos, yPos);
    const thumbMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
    const thumb = new THREE.Mesh(thumbGeometry, thumbMaterial);
    thumb.position.set(xPos - 0.15, yPos + thumbHeight, zPos + 0.01);

    return [track, thumb];
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
    const yOffset = 43;

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
