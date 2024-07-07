import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader";

const loader = new GLTFLoader();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 100)
camera.rotation.set(-0.4, 0, 0)

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true; 
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(50, 80, 75);
directionalLight1.target.position.set(0, 0, -10);
directionalLight1.castShadow = true;
directionalLight1.shadow.mapSize.width = 1024;
directionalLight1.shadow.mapSize.height = 1024;
directionalLight1.shadow.camera.near = 0.1;
directionalLight1.shadow.camera.far = 500;

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(-50, 80, 75);
directionalLight2.target.position.set(0, 0, -10);
directionalLight2.castShadow = true;
directionalLight2.shadow.mapSize.width = 1024;
directionalLight2.shadow.mapSize.height = 1024;
directionalLight2.shadow.camera.near = 0.1;
directionalLight2.shadow.camera.far = 500;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

scene.add(directionalLight1);
scene.add(directionalLight1.target);
scene.add(directionalLight2);
scene.add(directionalLight2.target);
scene.add(ambientLight);

loader.load(
    '../models/scene.glb',
    function ( gltf ) {
        scene.add( gltf.scene );
    },
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    function ( error ) {
        console.log( 'An error happened' );
    }
);

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const startPosition = { x: 0, y: 50, z: 100, rotationX: -0.4 };
const endPosition = { x: 0, y: 43, z: 38, rotationX: 0 };

const tween = new TWEEN.Tween(startPosition)
    .to(endPosition, 1500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(() => {
        camera.position.set(startPosition.x, startPosition.y, startPosition.z);
        camera.rotation.x = startPosition.rotationX;
    })
    .start();



