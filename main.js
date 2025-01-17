import * as THREE from "three";
const scene = new THREE.Scene();
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x11eef4 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.x = 0;
boxMesh.position.y = 0;
boxMesh.position.z = 0;

scene.add(boxMesh);

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
