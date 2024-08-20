import * as THREE from "three";
import { curvePlanes } from "../utils/geometryUtils.js";
import { addText } from "../utils/textUtils.js";

export async function experiencePage(scene) {
  const header = await addText(0, 56.5, 8.7, "Experience", 2);
  const xPos = -13;
  const zPos = 8.7;

  scene.add(header);
}
