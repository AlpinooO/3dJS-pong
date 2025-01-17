import * as THREE from "three";
const scene = new THREE.Scene();
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

// mettre le truc en plein écran
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

camera.position.z = 3;
renderer.render(scene, camera);

// resize camera
window.addEventListener("resize", () => {
  viewportSize.width = window.innerWidth;
  viewportSize.height = window.innerHeight;
  camera.aspect = viewportSize.width / viewportSize.heigth;
  camera.updateProjectionMatrix();
  renderer.setSize(viewportSize.width, viewportSize.height);
});

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (evt) => {
  cursor.x = (evt.clientX / viewportSize.width) * 2 - 1;
  cursor.y = 1 - (evt.clientY / viewportSize.height) * 2;
});
