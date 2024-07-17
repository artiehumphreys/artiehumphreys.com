import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export function loadIconTextures() {
  const aboutMeTexture = textureLoader.load("../../models/aboutme.png");
  const contactTexture = textureLoader.load("../../models/contact.png");
  const experienceTexture = textureLoader.load("../../models/experience.png");
  const projectTexture = textureLoader.load("../../models/projects.png");

  return {
    aboutMeTexture,
    contactTexture,
    experienceTexture,
    projectTexture,
  };
}

export function loadScreenTexture() {
  return textureLoader.load("../../models/background.jpg");
}
