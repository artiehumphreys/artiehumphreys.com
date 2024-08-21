import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
export function projectPage(scene) {
  const bvhDemo = createVideoTexture(
    "bvh-to-glb-demo",
    7,
    47,
    "github.com/artiehumphreys/bvh-to-glb?tab=readme-ov-file#video-demo"
  );
  scene.add(bvhDemo);
  console.log(scene.children);

  function createVideoTexture(videoName, xPos, yPos, url) {
    const video = document.createElement("video");
    const width = 16;
    const height = 9;
    video.src = `./public/demos/${videoName}.mp4`;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    const videoMaterial = new THREE.MeshBasicMaterial({ map: videoTexture });

    const geometry = curvePlanes(width, height, xPos, yPos);
    const videoMesh = new THREE.Mesh(geometry, videoMaterial);

    videoMesh.position.set(xPos, yPos, 15);
    videoMesh.userData = {
      type: "redirect",
      url: url,
    };
    return videoMesh;
  }
}
