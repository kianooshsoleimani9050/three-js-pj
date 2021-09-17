import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// const renderer = new THREE.WebGLRenderer({
//   canvas : document.querySelector("#three-bg")
// });
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//
const geometery = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xc0fdff,
  wireframe: true,
});
const torus = new THREE.Mesh(geometery, material);
scene.add(torus);
//

const ligth = new THREE.PointLight(0xffffff);
// const ambLigth = new THREE.AmbientLight(0xffffff);
ligth.position.set(100, 100, 100);
scene.add(
  ligth
  // , ambLigth
);

//

// const gridHelper = new THREE.GridHelper(200, 50, 0x99aa8f, 0x786362);
// scene.add(gridHelper);

//

const oribitControl = new OrbitControls(camera, renderer.domElement);
scene.add(oribitControl);

//
const addStar = () => {
  const geometery = new THREE.SphereGeometry(0.55, 10, 10);
  const material = new THREE.MeshStandardMaterial({
    color: 0xf3c4fb,
    wireframe: true,
  });
  const star = new THREE.Mesh(geometery, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
};
Array(200).fill().forEach(addStar);
//
const sceneBackgroud = new THREE.TextureLoader().load("sky-three-js-pj.jpg");
scene.background = sceneBackgroud;
//

camera.position.z = 70;
const animate = () => {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  oribitControl.update();
  renderer.render(scene, camera);
};
animate();
