import * as THREE from "three";
import { curvePlanes } from "./geometryUtils.js";
import { addText } from "./textUtils.js";
import { loadAnnouncementTexture } from "./textureLoader.js";

const paths = {
  "About Me": "about",
  Contact: "contact",
  Experience: "experience",
  Projects: "projects",
};

export async function createCenteredIcon(scene, config) {
  const {
    texture,
    xPos,
    yPos,
    zPos,
    name = null,
    width = 12.5,
    height = 8.5,
  } = config;

  const planeGeometry = curvePlanes(width, height, xPos, yPos);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(xPos, yPos + 2, zPos + 1.5);

  plane.userData = { type: "icon" };
  if (name) {
    plane.userData = { type: "nav", url: paths[name] };
    const iconText = await addText(xPos, yPos, zPos - 0.15, name);
    scene.add(iconText);
  }
  scene.add(plane);
}

export async function createLinkedInNotification(scene, config) {
  const {
    xPos = -13.5,
    yPos = 30,
    zPos = 8.85,
    width = 7,
    height = 5,
  } = config;

  const message = "I just posted on LinkedIn! Check out the post here.";
  const url =
    "www.linkedin.com/feed/update/urn:li:activity:7269387344116383744/";

  const announcementTexture = loadAnnouncementTexture();

  await createCenteredIcon(scene, {
    texture: announcementTexture,
    xPos,
    yPos,
    zPos,
    width,
    height,
  });

  const planeGeometry = curvePlanes(width / 2, height / 2, xPos, yPos);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: announcementTexture,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
  });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.set(xPos + 25.5, yPos + 1, zPos);
  plane.userData = {
    type: "redirect",
    url: url,
  };

  const announcementText = await addText(0, yPos + 4, zPos - 0.15, message);
  scene.add(announcementText);
  scene.add(plane);
}
