import * as THREE from "three";
import { Tween, Easing } from "@tweenjs/tween.js";
import { animationGroup } from "../animationGroup.js";
import { curvePlanes } from "../utils/geometryUtils.js";
import { loadSectionTextures } from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";
import { setDropdownAnimating } from "../Computer.js";
import {
  createCenteredIcon,
  createBlogNotice,
} from "../utils/createCenteredIcon.js";

const yPos = 42;
const zPos = 8.85;

let clicked = false;
let isAnimating = false;
export default isAnimating;

export async function homePage(scene) {
  const textures = loadSectionTextures();

  const icons = [
    {
      texture: textures.aboutMeTexture,
      xPos: -15,
      yPos,
      zPos,
      name: "About Me",
    },
    { texture: textures.contactTexture, xPos: 15, yPos, zPos, name: "Contact" },
    {
      texture: textures.experienceTexture,
      xPos: 5,
      yPos,
      zPos,
      name: "Experience",
    },
    {
      texture: textures.projectTexture,
      xPos: -5,
      yPos,
      zPos,
      name: "Projects",
    },
  ];

  for (const iconConfig of icons) {
    await createCenteredIcon(scene, iconConfig);
  }

  await createBlogNotice(scene, { xPos: -14, yPos: 30, zPos });
  createMenu(scene);
}

let menuGroup = null;

export function createMenu(scene) {
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
    bar.userData = { type: "dropdown" };
    menuGroup.add(bar);
  });

  menuGroup.position.set(xPos, yPos, 11.75);
  menuGroup.scale.set(0.7, 0.7, 0.7);

  const menuGroupClick = createClickArea(
    menuGroup,
    menuGroup.userData.type,
    menuGroup.userData.type
  );
  scene.add(menuGroup);
  scene.add(menuGroupClick);

  async function openMenu() {
    // Rotate bars outward
    const tweenBR1 = new Tween(bar1.rotation)
      .to({ z: Math.PI / 4 }, 500)
      .easing(Easing.Quadratic.Out);
    animationGroup.add(tweenBR1);
    tweenBR1.start();

    const tweenBR3 = new Tween(bar3.rotation)
      .to({ z: -Math.PI / 4 }, 500)
      .easing(Easing.Quadratic.Out);
    animationGroup.add(tweenBR3);
    tweenBR3.start();

    const tweenBP1 = new Tween(bar1.position)
      .to({ y: 0 }, 500)
      .easing(Easing.Quadratic.Out);
    animationGroup.add(tweenBP1);
    tweenBP1.start();

    const tweenBP3 = new Tween(bar3.position)
      .to({ y: 0 }, 500)
      .easing(Easing.Quadratic.Out);
    animationGroup.add(tweenBP3);
    tweenBP3.start();

    bar2.visible = false;

    // Build menu text entries
    const menuText = {
      Resume: "artiehumphreys.com/Resume_Artie_Humphreys.pdf",
      Transcript: "artiehumphreys.com/Summer_2025_Transcript.pdf",
    };
    const yStart = yPos - 1;
    const texts = await Promise.all(
      Object.entries(menuText).map(([text], index) =>
        createText(22 - text.length / 5, yStart - index * 2, text)
      )
    );

    texts.forEach((text) => {
      text.userData.url = menuText[text.userData.text];
      const empty = createClickArea(text, "redirect", text.userData.url);
      scene.add(empty);
      scene.add(text);
    });
  }

  function closeMenu() {
    // Rotate bars back
    const tweenCR1 = new Tween(bar1.rotation)
      .to({ z: 0 }, 500)
      .easing(Easing.Quadratic.Out);
    animationGroup.add(tweenCR1);
    tweenCR1.start();

    const tweenCR3 = new Tween(bar3.rotation)
      .to({ z: 0 }, 500)
      .easing(Easing.Quadratic.Out);
    animationGroup.add(tweenCR3);
    tweenCR3.start();

    const tweenCP1 = new Tween(bar1.position)
      .to({ y: barSpacing }, 500)
      .easing(Easing.Quadratic.Out);
    animationGroup.add(tweenCP1);
    tweenCP1.start();

    const tweenCP3 = new Tween(bar3.position)
      .to({ y: -barSpacing }, 500)
      .easing(Easing.Quadratic.Out);
    animationGroup.add(tweenCP3);
    tweenCP3.start();

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
    setDropdownAnimating(true);
    if (clicked) closeMenu();
    else await openMenu();
    clicked = !clicked;
    setTimeout(() => setDropdownAnimating(false), 500);
  };
}

export function click() {
  menuGroup.onClick();
}

export function createClickArea(textMesh, type, name) {
  const boundingBox = new THREE.Box3().setFromObject(textMesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  const center = new THREE.Vector3();
  boundingBox.getCenter(center);

  const clickGeometry = curvePlanes(size.x, size.y, center.x, center.y);
  const clickMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
  });

  const clickMesh = new THREE.Mesh(clickGeometry, clickMaterial);
  switch (type) {
    case "redirect":
      clickMesh.position.set(center.x, center.y, center.z - 2);
      break;
    case "dropdown":
      clickMesh.position.set(center.x, center.y, center.z - 4.25);
      break;
  }
  clickMesh.userData = { type: type, url: name };
  return clickMesh;
}
