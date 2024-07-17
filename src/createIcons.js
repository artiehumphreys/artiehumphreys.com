
import { TextGeometry } from "TextGeometry";
import { FontLoader } from "FontLoader";
import { curvePlanes } from "./utils/geometryUtils";

const yPos = 42;
const zPos = 8.8;

export function createIcons(scene, textures) {
    createCenteredIcon(scene, textures.aboutMeTexture, -15, "About Me", yPos, zPos);
    createCenteredIcon(scene, textures.contactTexture, 15, "Contact", yPos, zPos);
    createCenteredIcon(scene, textures.experienceTexture, 5, "Experience", yPos, zPos);
    createCenteredIcon(scene, textures.projectTexture, -5, "Projects", yPos, zPos);

    function createCenteredIcon(texture, positionX, name) {
        const planeGeometry = curvePlanes(12.5, 8.5);
        const planeMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.1,
            metalness: 0.2,
            transparent: true,
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(positionX, yPos + 2, zPos + 0.05);
        plane.userData = { type: 'icon', text: name };
        scene.add(plane);
        addIconText(positionX, name);
    }

    function addIconText(positionX, name){
        const fontLoader = new FontLoader();
        fontLoader.load("https://unpkg.com/three@0.166.1/examples/fonts/gentilis_bold.typeface.json", function(font) {
            const textGeometry = new TextGeometry(name, {
                font: font,
                size: 1,
                depth: 0.1,
                size: 0.75,
                curveSegments: 12,
                bevelEnabled: false
            });
            const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textGeometry.computeBoundingBox();
            const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.position.set(positionX - textWidth / 2, yPos - 2, zPos * 2 - 0.7);
            scene.add(textMesh);
        });
    }
}