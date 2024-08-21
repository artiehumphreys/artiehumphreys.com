import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";
import { createClickArea } from "./home.js";
import { loadTcfTexture } from "../utils/textureLoader.js";
import { loadHoopVisionTexture } from "../utils/textureLoader.js";

let hoopVisionTexture1, hoopVisionTexture2;
let isPictureDisplayed = false;

function switchDisplay() {
  isPictureDisplayed = !isPictureDisplayed;
  if (isPictureDisplayed) {
    hoopVisionTexture2.position.z -= 0.01;
    hoopVisionTexture1.position.z += 0.01;
  } else {
    hoopVisionTexture2.position.z += 0.01;
    hoopVisionTexture1.position.z -= 0.01;
  }

  const nextSwitchTime = isPictureDisplayed ? 3000 : 8000;
  setTimeout(switchDisplay, nextSwitchTime);
}
export async function projectPage(scene) {
  const scrollableObjects = [];

  const header = await addText(0, 56.5, 8.7, "Projects", 2);
  scene.add(header);

  await createBvhGlbDemo();
  await createTcfDemo();
  await createHoopVisionDemo();

  const [track, thumb] = createScrollbar();
  scene.add(track);
  scene.add(thumb);
  scrollableObjects.push(thumb);

  switchDisplay();

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
    const thumbConstant = 8 / 27;

    const minY = 51.4;
    const maxY = 79;

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

    const empty = createClickArea(
      header,
      "redirect",
      "github.com/artiehumphreys/bvh-to-glb"
    );
    [header, body, skills, bvhDemo, empty].forEach((item) => {
      scene.add(item);
      scrollableObjects.push(item);
    });
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

    const empty = createClickArea(header, "redirect", "thecourseforum.com/");
    [header, body, skills, tcfImage, empty].forEach((item) => {
      scene.add(item);
      scrollableObjects.push(item);
    });
  }

  async function createHoopVisionDemo() {
    const header = await addText(-17, 31.2, 8.71, "Hoop Vision", 1.2);
    const body = await addText(
      -9.15,
      29.2,
      8.71,
      "Designed and created an ML pipeline to track basketball \nplayers in broadcast footage. Achieved 97% accuracy \nin player detection and 90% accuracy in event prediction.",
      0.7
    );
    const skills = await addText(
      -16.45,
      24.2,
      8.71,
      "Skills: Python, OpenCV, PyTorch",
      0.5
    );
    hoopVisionTexture1 = await createIcon(
      loadHoopVisionTexture(),
      12.75,
      26.15,
      16,
      9,
      "github.com/artiehumphreys/hoop-vision"
    );

    hoopVisionTexture2 = createVideoTexture(
      "hoop-vision-demo-2",
      12.75,
      26.15,
      "github.com/artiehumphreys/hoop-vision?tab=readme-ov-file#hoop-vision"
    );

    hoopVisionTexture2.position.z += 0.01;

    const empty = createClickArea(
      header,
      "redirect",
      "github.com/artiehumphreys/hoop-vision"
    );

    [
      header,
      body,
      skills,
      hoopVisionTexture1,
      hoopVisionTexture2,
      empty,
    ].forEach((item) => {
      scene.add(item);
      scrollableObjects.push(item);
    });
  }

  function createVideoTexture(
    videoName,
    xPos,
    yPos,
    url,
    width = 16,
    height = 9
  ) {
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
    const geometry = curvePlanes(width, height, xPos, yPos);
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
