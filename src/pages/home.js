import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import {
  loadAnnouncementTexture,
  loadSectionTextures,
} from "../utils/textureLoader.js";
import { addText } from "../utils/textUtils.js";
import { setDropdownAnimating } from "../Computer.js";
import { createCenteredIcon } from "../utils/createCenteredIcon.js";

const yPos = 42;
const zPos = 8.85;

let clicked = false;
let isAnimating = false;
export default isAnimating;

export function homePage(scene) {
  const textures = loadSectionTextures();

  createCenteredIcon(
    scene,
    textures.aboutMeTexture,
    -15,
    yPos,
    zPos,
    "About Me"
  );
  createCenteredIcon(scene, textures.contactTexture, 15, yPos, zPos, "Contact");
  createCenteredIcon(
    scene,
    textures.experienceTexture,
    5,
    yPos,
    zPos,
    "Experience"
  );
  createCenteredIcon(
    scene,
    textures.projectTexture,
    -5,
    yPos,
    zPos,
    "Projects"
  );

  createMenu(scene);
  createLinkedInNotification(scene);
}

export async function createLinkedInNotification(scene) {
  const width = 7;
  const height = 5;
  const xPos = -14;
  const message = "I just posted on LinkedIn! Check out the post here.";

  const announcementTexture = loadAnnouncementTexture();
  createCenteredIcon(
    scene,
    announcementTexture,
    xPos,
    30,
    8.85,
    null,
    width,
    height
  );
  const planeGeometry = curvePlanes(width, height, xPos, 30);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: announcementTexture,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(xPos + 24, 32, 8.85 + 1.5);
  plane.userData = {
    type: "redirect",
    url: "www.linkedin.com/feed/?shareActive=true&view=management",
  };

  const announcementText = await addText(0, 34, zPos - 0.15, message);
  scene.add(announcementText);
  scene.add(plane);
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
    bar.userData = {
      type: "dropdown",
    };
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

    const menuText = {
      Resume: "s3.amazonaws.com/artiehumphreys.com/Resume_Artie_Humphreys.pdf",
      Transcript:
        "s3.amazonaws.com/artiehumphreys.com/Summer+2024+Transcript.pdf",
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
    setDropdownAnimating(true);
    if (clicked) {
      closeMenu();
    } else {
      await openMenu();
    }
    clicked = !clicked;
    setTimeout(() => {
      setDropdownAnimating(false);
    }, 500);
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
