import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export function loadSectionTextures() {
  const aboutMeTexture = textureLoader.load("../../public/icons/aboutme.png");
  const contactTexture = textureLoader.load("../../public/icons/contact.png");
  const experienceTexture = textureLoader.load(
    "../../public/icons/experience.png"
  );
  const projectTexture = textureLoader.load("../../public/icons/projects.png");

  return {
    aboutMeTexture,
    contactTexture,
    experienceTexture,
    projectTexture,
  };
}

export function loadContactTextures() {
  const emailTexture = textureLoader.load("../../public/icons/email.png");
  const linkedinTexture = textureLoader.load("../../public/icons/linkedin.png");
  const githubTexture = textureLoader.load("../../public/icons/github.png");

  return {
    emailTexture,
    linkedinTexture,
    githubTexture,
  };
}

export function loadTcfTexture() {
  return textureLoader.load("../../public/demos/tcf-demo.png");
}

export function loadWhistleblowerTexture() {
  return textureLoader.load("../../public/demos/whistleblower-demo.png");
}

export function loadScreenTexture() {
  return textureLoader.load("../../public/background.jpg");
}

export function loadPortraitTexture() {
  return textureLoader.load("../../public/artiehumphreys.jpg");
}

export function loadAnnouncementTexture() {
  return textureLoader.load("../../public/icons/info.png");
}

export function loadBackArrowTexture() {
  return textureLoader.load("../../public/icons/backarrow.png");
}
