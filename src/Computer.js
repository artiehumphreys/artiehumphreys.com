import * as THREE from "three";
import { GLTFLoader } from "GLTFLoader"

const loader = new GLTFLoader();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 25, 75)

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
directionalLight.position.set(0, 75, 75).normalize();
directionalLight.target.position.set(0, 0, -25)
scene.add(directionalLight);
scene.add(directionalLight.target);
scene.add(ambientLight);

loader.load(
    '../models/old_pc_low_poly_game_model.glb',
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

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();



