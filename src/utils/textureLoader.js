import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export function loadSectionTextures() {
  const aboutMeTexture = textureLoader.load("../../icons/aboutme.png");
  const contactTexture = textureLoader.load("../../icons/contact.png");
  const experienceTexture = textureLoader.load("../../icons/experience.png");
  const projectTexture = textureLoader.load("../../icons/projects.png");

  return {
    aboutMeTexture,
    contactTexture,
    experienceTexture,
    projectTexture,
  };
}

export function loadContactTextures() {
  const emailTexture = textureLoader.load("../../icons/email.png");
  const linkedinTexture = textureLoader.load("../../icons/linkedin.png");
  const githubTexture = textureLoader.load("../../icons/github.png");

  return {
    emailTexture,
    linkedinTexture,
    githubTexture,
  };
}

export function loadTcfTexture() {
  return textureLoader.load("../../demos/tcf-demo.png");
}

export function loadWhistleblowerTexture() {
  return textureLoader.load("../../demos/whistleblower-demo.png");
}

export function loadScreenTexture() {
  return textureLoader.load("../../background.jpg");
}

export function loadPortraitTexture() {
  return textureLoader.load("../../artiehumphreys.jpg");
}

export function loadAnnouncementTexture() {
  return textureLoader.load("../../icons/info.png");
}

export function loadBackArrowTexture() {
  return textureLoader.load("../../icons/backarrow.png");
}
