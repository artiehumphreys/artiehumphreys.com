import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadSectionTextures } from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";

const yPos = 42;
const zPos = 8.85;
let clicked = false;
const paths = {
  "About Me": "about",
  Contact: "contact",
  Experience: "experience",
  Projects: "projects",
};

export function homePage(scene) {
  const textures = loadSectionTextures();

  createCenteredIcon(textures.aboutMeTexture, -15, "About Me");
  createCenteredIcon(textures.contactTexture, 15, "Contact");
  createCenteredIcon(textures.experienceTexture, 5, "Experience");
  createCenteredIcon(textures.projectTexture, -5, "Projects");

  async function createCenteredIcon(texture, xPos, name) {
    const planeGeometry = curvePlanes(12.5, 8.5, xPos, yPos);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(xPos, yPos + 2, zPos + 1.5);
    plane.userData = { type: "nav", text: paths[name] };
    scene.add(plane);
    const iconText = await addText(xPos, yPos, zPos, name);
    scene.add(iconText);
    await createMenu(scene);
  }
}

let menuGroup;
console.log(menuGroup);

export function createMenu(scene) {
  if (menuGroup) return;

  menuGroup = new THREE.Group();
  menuGroup.userData = { type: "dropdown" };

  const barWidth = 3;
  const barHeight = 0.3;
  const barSpacing = 0.6;
  const xPos = 22.2;
  const yPos = 57;
  const barColor = 0xffffff;

  const barGeometry = curvePlanes(barWidth, barHeight, xPos, yPos);
  const barMaterial = new THREE.MeshStandardMaterial({ color: barColor });

  const bar1 = new THREE.Mesh(barGeometry, barMaterial);
  const bar2 = new THREE.Mesh(barGeometry, barMaterial);
  const bar3 = new THREE.Mesh(barGeometry, barMaterial);

  [bar1, bar2, bar3].forEach((bar, index) => {
    bar.position.set(0, barSpacing - index * barSpacing, 0);
    bar.userData = {
      type: "dropdown",
    };
    menuGroup.add(bar);
  });

  menuGroup.position.set(xPos, yPos, 11.75);
  menuGroup.scale.set(0.7, 0.7, 0.7);

  scene.add(menuGroup);

  async function openMenu() {
    new TWEEN.Tween(bar1.rotation)
      .to({ z: Math.PI / 4 }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    new TWEEN.Tween(bar3.rotation)
      .to({ z: -Math.PI / 4 }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    new TWEEN.Tween(bar1.position)
      .to({ y: 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    new TWEEN.Tween(bar3.position)
      .to({ y: 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    bar2.visible = false;

    const menuText = ["Resume", "Transcript"];
    const yStart = yPos - 1;
    const texts = await Promise.all(
      menuText.map((text, index) =>
        createText(22 - text.length / 5, yStart - index * 2, text)
      )
    );

    console.log(texts);
    texts.forEach((text) => {
      scene.add(text);
    });
  }

  function closeMenu() {
    new TWEEN.Tween(bar1.rotation)
      .to({ z: 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    new TWEEN.Tween(bar3.rotation)
      .to({ z: 0 }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    new TWEEN.Tween(bar1.position)
      .to({ y: barSpacing }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    new TWEEN.Tween(bar3.position)
      .to({ y: -barSpacing }, 500)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();

    bar2.visible = true;

    removeMenuText(scene);
  }

  function removeMenuText(scene) {
    ["Resume", "Transcript"].forEach((name) => {
      const text = scene.getObjectByName(name);
      if (text) scene.remove(text);
    });
  }

  async function createText(xPos, yPos, name) {
    const iconText = await addText(xPos, yPos, zPos, name, 1);
    return iconText;
  }

  menuGroup.onClick = async () => {
    if (clicked) {
      closeMenu();
    } else {
      await openMenu();
    }
    clicked = !clicked;
  };
}

export function click() {
  menuGroup.onClick();
}
