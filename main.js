import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// Caméra débug
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();

// textures
const textureLoader = new THREE.TextureLoader();

const roughnessTexture = textureLoader.load(
  "/textures/Metal_Pattern_008_roughness.png"
);
const normalTexture = textureLoader.load(
  "/textures/Metal_Pattern_008_normal.png"
);
const heightTexture = textureLoader.load(
  "/textures/Metal_Pattern_008_height.png"
);
const emissiveTexture = textureLoader.load(
  "/textures/Metal_Pattern_008_metallic.png"
);
const baseColorTexture = textureLoader.load(
  "/textures/Metal_Pattern_008_basecolor.png"
);
const ambientOcclusionTexture = textureLoader.load(
  "/textures/Metal_Pattern_008_ambientOcclusion.png"
);

const texturesToLoad = {
  roughnessMap: roughnessTexture,
  normalMap: normalTexture,
  displacementMap: heightTexture,
  emissiveMap: emissiveTexture,
  map: baseColorTexture,
  aoMap: ambientOcclusionTexture,
};
const textures = Object.fromEntries(
  Object.entries(texturesToLoad).map(([textureKey, texture]) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set = (2, 2);

    return [textureKey, texture];
  })
);

const Material = new THREE.MeshStandardMaterial({
  ...textures,
  displacementScale: 0.1,
});
// les 2 joueurs
const player1Geometry = new THREE.BoxGeometry(0.1, 1.5, 0.5);
const player1Material = new THREE.MeshBasicMaterial({ color: "white" });
const player1Mesh = new THREE.Mesh(player1Geometry, player1Material);
player1Mesh.position.x = -4;
player1Mesh.position.y = 0;
player1Mesh.position.z = 0;
scene.add(player1Mesh);

const player2Geometry = new THREE.BoxGeometry(0.1, 1.5, 0.5);
const player2Material = new THREE.MeshBasicMaterial({ color: "white" });
const player2Mesh = new THREE.Mesh(player2Geometry, player2Material);
player2Mesh.position.x = 4;
player2Mesh.position.y = 0;
player2Mesh.position.z = 0;

scene.add(player2Mesh);

// Model 3d de la balle (oui c'est un pot de charbon)

const gltfLoader = new GLTFLoader();
gltfLoader.load("../model/glTF/PotOfCoals.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

// Le background environnemental
const backgroundGeometry = new THREE.PlaneGeometry(15, 15);
const backgroundMesh = new THREE.Mesh(backgroundGeometry, Material);
backgroundMesh.position.x = 0;
backgroundMesh.position.y = 0;
backgroundMesh.position.z = -1;

scene.add(backgroundMesh, Material);

// le mur du haut et du bas
const wallUpGeometry = new THREE.PlaneGeometry(15, 15);
const wallUpMesh = new THREE.Mesh(wallUpGeometry, Material);
wallUpMesh.position.x = 0;
wallUpMesh.position.y = 3;
wallUpMesh.position.z = -1;

wallUpMesh.rotation.x = Math.PI / 2;

scene.add(wallUpMesh, Material);

const wallDownGeometry = new THREE.PlaneGeometry(15, 15);
const wallDownMesh = new THREE.Mesh(wallDownGeometry, Material);
wallDownMesh.position.x = 0;
wallDownMesh.position.y = -3;
wallDownMesh.position.z = -1;

wallDownMesh.rotation.x = Math.PI / -2;

scene.add(wallDownMesh, Material);

// mur gauche et droite

const wallRightGeometry = new THREE.PlaneGeometry(15, 15);
const wallRightMesh = new THREE.Mesh(wallRightGeometry, Material);
wallRightMesh.position.x = 4.5;
wallRightMesh.position.y = 3;
wallRightMesh.position.z = -1;

wallRightMesh.rotation.y = Math.PI / -2;
scene.add(wallRightMesh, Material);

const wallLeftGeometry = new THREE.PlaneGeometry(15, 15);
const wallLeftMesh = new THREE.Mesh(wallLeftGeometry, Material);
wallLeftMesh.position.x = -4.5;
wallLeftMesh.position.y = 3;
wallLeftMesh.position.z = -1;

wallLeftMesh.rotation.y = Math.PI / 2;
scene.add(wallLeftMesh, Material);

// plein écran
const viewportSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  viewportSize.width / viewportSize.height
);
scene.add(camera);

const canvas = document.querySelector("canvas#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(viewportSize.width, viewportSize.height);

// débug caméra (Il y a la caméra fixe et la caméra orbite pour regarder l'environnement, juste décommenter les blocs)

// caméra fixe

camera.position.z = 3;
renderer.render(scene, camera);

// Caméra débug

// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// camera.position.x = 1;
// camera.position.y = 1;
// camera.position.z = 3;
// camera.lookAt(player1Mesh.position);

// resize camera
window.addEventListener("resize", () => {
  viewportSize.width = window.innerWidth;
  viewportSize.height = window.innerHeight;
  camera.aspect = viewportSize.width / viewportSize.heigth;
  camera.updateProjectionMatrix();
  renderer.setSize(viewportSize.width, viewportSize.height);
});

// mouvement joueur
let moveUp1 = false;
let moveDown1 = false;

window.addEventListener("keydown", (event) => {
  if (event.key === "z" || event.key === "Z") {
    moveUp1 = true;
  }
  if (event.key === "s" || event.key === "S") {
    moveDown1 = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "z" || event.key === "Z") {
    moveUp1 = false;
  }
  if (event.key === "s" || event.key === "S") {
    moveDown1 = false;
  }
});

let moveUp2 = false;
let moveDown2 = false;
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    moveUp2 = true;
  }
  if (event.key === "ArrowDown") {
    moveDown2 = true;
  }
});
window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp") {
    moveUp2 = false;
  }
  if (event.key === "ArrowDown") {
    moveDown2 = false;
  }
});
// animation de mouvement
const clock = new THREE.Clock();
const tick = () => {
  if (moveUp1) {
    player1Mesh.position.y += 0.1;
  }
  if (moveDown1) {
    player1Mesh.position.y -= 0.1;
  }
  if (moveUp2) {
    player2Mesh.position.y += 0.1;
  }
  if (moveDown2) {
    player2Mesh.position.y -= 0.1;
  }
  const boundary = 2;
  if (player1Mesh.position.y > boundary) {
    player1Mesh.position.y = boundary;
  }
  if (player1Mesh.position.y < -boundary) {
    player1Mesh.position.y = -boundary;
  }
  if (player2Mesh.position.y > boundary) {
    player2Mesh.position.y = boundary;
  }
  if (player2Mesh.position.y < -boundary) {
    player2Mesh.position.y = -boundary;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();

//Lumières
const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xffffff, 0.9);
scene.add(hemisphereLight);
const helper = new THREE.HemisphereLightHelper(directionalLight, 5);
scene.add(helper);
