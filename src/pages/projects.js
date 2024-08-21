import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";
import { createClickArea } from "./home.js";
import { loadTcfTexture } from "../utils/textureLoader.js";

export async function projectPage(scene) {
  const scrollableObjects = [];

  const header = await addText(0, 56.5, 8.7, "Projects", 2);
  scene.add(header);

  await createBvhGlbDemo();
  await createTcfDemo();

  const [track, thumb] = createScrollbar();
  scene.add(track);
  scene.add(thumb);
  scrollableObjects.push(thumb);

  document.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      handleScroll(event.deltaY);
    },
    { passive: false }
  );

  function handleScroll(delta) {
    delta = delta > 0 ? Math.min(delta, 10) : Math.max(delta, -10);
    delta /= 5;

    const minHeaderThresh = 51.4;

    const currentPos = scrollableObjects[0].position.y;

    header.visible = currentPos + delta <= minHeaderThresh;

    const thumbMinY = 39.25;
    const thumbMaxY = 47.25;
    const thumbConstant = 8 / 28;

    const minY = 51.4;
    const maxY = 80;

    if (currentPos + delta < minY) {
      delta = minY - currentPos;
    } else if (currentPos + delta > maxY) {
      delta = maxY - currentPos;
    }
    scrollableObjects.forEach((obj) => {
      let newYPos;
      if (obj.userData?.name === "thumb") {
        newYPos = obj.position.y - delta * thumbConstant;
        newYPos = Math.max(Math.min(newYPos, thumbMaxY), thumbMinY);

        if (newYPos >= thumbMinY && newYPos <= thumbMaxY) {
          obj.position.z += (delta * thumbConstant) / 26;
        }

        obj.position.y = newYPos;
      } else {
        obj.position.y += delta;
        obj.position.z -= delta / 26;
      }
    });
  }

  async function createBvhGlbDemo() {
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

    [header, body, skills, bvhDemo].forEach((item) => {
      scene.add(item);
      scrollableObjects.push(item);
    });

    scene.add(
      createClickArea(
        header,
        "redirect",
        "github.com/artiehumphreys/bvh-to-glb"
      )
    );
  }

  async function createTcfDemo() {
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

    [header, body, skills, tcfImage].forEach((item) => {
      scene.add(item);
      scrollableObjects.push(item);
    });

    scene.add(createClickArea(header, "redirect", "thecourseforum.com/"));
  }

  function createVideoTexture(videoName, xPos, yPos, url) {
    const video = document.createElement("video");
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
    const geometry = curvePlanes(16, 9, xPos, yPos);
    const videoMesh = new THREE.Mesh(geometry, videoMaterial);

    videoMesh.position.set(xPos, yPos, 10.4);
    videoMesh.userData = { type: "redirect", url: url };
    return videoMesh;
  }

  async function createIcon(texture, xPos, yPos, width, height, url) {
    const planeGeometry = curvePlanes(width, height, xPos, yPos);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0,
    });
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.encoding = THREE.sRGBEncoding;
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.userData = { type: "redirect", url: url };
    plane.position.set(xPos, yPos, 10.4);
    return plane;
  }

  function createScrollbar() {
    const trackHeight = 12;
    const thumbHeight = 4;
    const xPos = 14.5;
    const yPos = 43.25;
    const zPos = 17.5;

    const trackGeometry = curvePlanes(0.5, trackHeight, xPos, yPos);
    const trackMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.position.set(xPos, yPos, zPos);

    const thumbGeometry = curvePlanes(
      0.5,
      thumbHeight,
      xPos - 0.0125,
      yPos + thumbHeight
    );
    const thumbMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
    const thumb = new THREE.Mesh(thumbGeometry, thumbMaterial);
    thumb.position.set(xPos - 0.0125, yPos + thumbHeight, zPos + 0.01);
    thumb.userData = {
      name: "thumb",
    };

    return [track, thumb];
  }
}
