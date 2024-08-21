import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";
import { createClickArea } from "./home.js";
import { loadTcfTexture } from "../utils/textureLoader.js";
export async function projectPage(scene) {
  const header = await addText(0, 56.5, 8.7, "Projects", 2);
  await bvhGlbDemo();
  await tcfDemo();

  scene.add(header);

  async function bvhGlbDemo() {
    const header = await addText(-17.75, 53.2, 8.7, "bvh-to-glb", 1.2);
    const body = await addText(
      -8.75,
      51.2,
      8.7,
      "A script that converts player positional data to a multi-view \n3D web animation using the Blender API. Showcased at NBA \nTech Expo 2024.",
      0.7
    );
    const skills = await addText(
      -16,
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

  async function tcfDemo() {
    const header = await addText(-15.5, 42.2, 8.7, "theCourseForum", 1.2);
    const body = await addText(
      -9.2,
      40.2,
      8.7,
      "Implemented trigram/reverse-indexing search algorithm \nand in-memory caching for previous searches, decreasing \nresponse time for queries by up to 75%.",
      0.7
    );
    const skills = await addText(
      -12.1,
      35.2,
      8.7,
      "Skills: Python (Django), HTML/CSS, PostgreSQL, Digital Ocean",
      0.5
    );
    const tcfImage = await createIcon(
      loadTcfTexture(),
      12.75,
      37.15,
      16,
      9,
      "thecourseforum.com/"
    );

    scene.add(createClickArea(header, "redirect", "thecourseforum.com/"));
    [header, body, skills, tcfImage].forEach((item) => {
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
    videoTexture.encoding = THREE.sRGBEncoding;

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

  async function createIcon(texture, xPos, yPos, width, height, url) {
    const zPos = 8.4;
    const planeGeometry = curvePlanes(width, height, xPos, yPos);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0,
    });
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.encoding = THREE.sRGBEncoding;
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.userData = {
      type: "redirect",
      url: url,
    };
    plane.position.set(xPos, yPos, zPos + 2);

    return plane;
  }
}
