import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";
import { createClickArea } from "./home.js";
export async function projectPage(scene) {
  const header = await addText(0, 56.5, 8.7, "Projects", 2);
  await bvhGlbDemo();

  scene.add(header);

  async function bvhGlbDemo() {
    const header = await addText(-18, 53.2, 8.7, "bvh-to-glb", 1.2);
    const body = await addText(
      -9,
      51.2,
      8.7,
      "A script that converts player positional data to a multi-view \n3D web animation using the Blender API. Showcased at NBA \nTech Expo 2024.",
      0.7
    );
    const skills = await addText(
      -16.25,
      46.2,
      8.7,
      "Skills: Python, JavaScript, Bash, bpy",
      0.5
    );
    const bvhDemo = createVideoTexture(
      "bvh-to-glb-demo",
      12.75,
      48.15,
      "github.com/artiehumphreys/bvh-to-glb?tab=readme-ov-file#video-demo"
    );
    scene.add(
      createClickArea(
        header,
        "redirect",
        "github.com/artiehumphreys/bvh-to-glb"
      )
    );
    [header, body, skills, bvhDemo].forEach((item) => {
      scene.add(item);
    });
  }

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

    videoMesh.position.set(xPos, yPos, 10.4);
    videoMesh.userData = {
      type: "redirect",
      url: url,
    };
    return videoMesh;
  }
}
