import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import gsap from "./node_modules/gsap/gsap-core.js";
// import { gsap, ScrollTrigger } from "./node_modules/gsap/all.js";
import { EffectComposer } from "/node_modules/three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "/node_modules/three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "/node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js";

// gsap.registerPlugin(ScrollTrigger);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// let explore = document.getElementById("explore");
// var explorer = false;
// explore.addEventListener("click", () => {
//   console.log("apple");
//   // camera.position.z = explorer ? 20 : 10;

//   gsap.to(camera.position, {
//     duration: 1,
//     z: explorer ? 5 : 10,
//     ease: "power3.in",
//   });
//   explore.innerHTML = explorer ? "Exploring..." : "Explore";
//   explorer = !explorer;
// });

const scene = new THREE.Scene();

//setting camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.z =  10;

const canvas = document.getElementById("canv");

// Load manager to keep track of loaded textures
var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log("Loaded:", item, loaded, total);
  // Calculate loading progress percentage
  var percentLoaded = (loaded / total) * 100;
  // Update loading screen with progress information
  document.getElementById("loading").innerText = "Loading... ";
};
manager.onLoad = function () {
  console.log("All textures loaded");
  // Remove loading screen once all textures are loaded
  document.getElementById("loading").style.opacity = 0;
  // Start rendering the scene
};

const loader = new THREE.TextureLoader(manager);

const allImageURLs = [
  "./public/texture/galaxy1.png",
  "./public/texture/earthmap1.jpg",
  "./public/texture/bump.jpg",
  "./public/texture/earthCloud.png",
  "./public/texture/moonmap4k.jpg",
  "./public/texture/moonbump4k.jpg",
];
const allTextures = [];

let assetCount = 0;
let assetTotal = allImageURLs.length;

// Iterate through all image paths & load them
function loadAssets() {
  for (let i = 0; i < assetTotal; i++) {
    allTextures[i] = loader.load(allImageURLs[i], function (texture) {
      checkProgress();
    });
  }
}

// Gets called after each asset completes
function checkProgress() {
  assetCount++;

  if (assetCount >= assetTotal) {
    loadingComplete();
  }
}

// Called when all assets have finished loading
function loadingComplete() {
  console.log("All assets are loaded!");
  console.log(allTextures);

  // ... Hide preloader bar
  // ... Start rendering scene with new assets
}

loadAssets();

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

//Bloom Pass
const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);
bloomPass.threshold = 0;
bloomPass.strength = 1; //intensity of glow
bloomPass.radius = 0;
const bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize(window.innerWidth, window.innerHeight);
bloomComposer.renderToScreen = true;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

//galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

//galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("./public/texture/galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});

//galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.layers.set(1);
scene.add(starMesh);

//earth object

const earthGeometry = new THREE.SphereGeometry(0.98, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("./public/texture/earthmap1.jpg"),
  bumpMap: new THREE.TextureLoader().load("./public/texture/bump.jpg"),
  bumpScale: 0.3,
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.receiveShadow = true;
earthMesh.castShadow = true;
earthMesh.layers.set(1);
earthMesh.position.x = 5;
scene.add(earthMesh);

//moon object

const cloudGeometry = new THREE.SphereGeometry(1, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("./public/texture/earthCloud.png"),
  transparent: true,
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
cloudMesh.receiveShadow = true;
cloudMesh.castShadow = true;
cloudMesh.position.x = 5;
cloudMesh.layers.set(1);
scene.add(cloudMesh);

//Moon object

const moonGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({
  map: new THREE.TextureLoader().load("./public/texture/moonmap4k.jpg"),
  bumpMap: new THREE.TextureLoader().load("./public/texture/moonbump4k.jpg"),
  bumpScale: 0.3,
});

const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.receiveShadow = true;
moonMesh.castShadow = true;
moonMesh.position.x = 2;
moonMesh.layers.set(1);
scene.add(moonMesh);

var moonPivot = new THREE.Object3D();
earthMesh.add(moonPivot);
moonPivot.add(moonMesh);

var cameraPivot = new THREE.Object3D();
earthMesh.add(cameraPivot);
cameraPivot.add(camera);

//sun object
const color = new THREE.Color("#FDB813");
const geometry = new THREE.IcosahedronGeometry(2, 15);
const material = new THREE.MeshBasicMaterial({
  color: color,
});
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(-50, 20, -60);
sphere.layers.set(1);
scene.add(sphere);

// scene.add(ambientlight);

//Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.castShadow = true;
// pointLight.shadow.bias = 0.00001;
// pointLight.shadow.camera = true;
// pointLight.shadow.mapSize.width = 2048;
// pointLight.shadow.mapSize.height = 2048;
pointLight.position.set(-50, 20, -60);
pointLight.layers.set(1);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

// const earth = new THREE.Mesh(pgeometry, pmaterial);

// earth.layers.set(1);
// scene.add(earth);
// scene.add(sun);

//Animate
function animate() {
  requestAnimationFrame(animate);
  // deg += 0.004;
  // earth.position.x = 15 * Math.cos(deg);
  // earth.position.z = 15 * Math.sin(deg);

  cameraPivot.rotation.y += 0.0001;
  moonPivot.rotation.y -= 0.005;
  moonPivot.rotation.x = 0.5;

  starMesh.rotation.y += 0.0002;
  cloudMesh.rotation.y -= 0.0009;
  earthMesh.rotation.y += 0.003;
  renderer.render(scene, camera);
  camera.layers.set(1);
  bloomComposer.render();
  renderer.clearDepth();

  // camera.layers.set(0);
}

//Update sizes
window.addEventListener(
  "resize",
  () => {
    //update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect = sizes.width / sizes.height;

    renderer.setSize(sizes.width, sizes.height);
    bloomComposer.setSize(sizes.width, sizes.height);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  },
  false
);

//Check if browser suppports the WebGL
if (WebGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}

// const t1 = gsap.timeline({ defaults: { duration: 1 } });
// t1.fromTo("nav", { y: "-100%" }, { delay: 0, duration: 1, y: "0%" });
// t1.fromTo(".title", { opacity: 0 }, { opacity: 1 });
// t1.fromTo(
//   ".hero-tag",
//   { x: "-100%", opacity: 0 },
//   { x: "0%", opacity: 1, delay: 0, duration: 0.6 }
// );
// t1.fromTo(earth.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1, duration:0 });

// const sections = document.getElementsByTagName("section");
// gsap.to(moonMesh.scale, {
//   x: 2,
//   y: 2,
//   z: 2  ,
//   duration: 5,

//   scrollTrigger: {
//     trigger: sections[1],
//     start: "20px 80%",
//     end: "bottom 80%",
//     markers: true,
//     toggleAction: "restart none none none",
//   },
// });
// const t2 = gsap
//   .timeline()
//   .set(".content", { opacity: 1 }, "<+0.5")
//   .from(".hero-tag", { x: "-30%", opacity: 0, duration: 1 }, "<")
//   .from(".hero-desc", { x: "30%", opacity: 0, duration: 1 }, "<");
