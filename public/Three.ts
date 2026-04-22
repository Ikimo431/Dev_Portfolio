import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const modelLoader = new GLTFLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

console.log("CANVAS FOUND: " + document.getElementById("bg"))
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg") as HTMLCanvasElement
})


//-----CAMERA INITIALIZE--------
//const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
let startCameraPos = new THREE.Vector3();
let startCameraRot = new THREE.Euler();
const mobile = window.innerWidth <= 650
if(mobile){
  //mobile camera start pos
  startCameraPos = new THREE.Vector3(0,0,0)
  startCameraRot = new THREE.Euler(-0.27, 0.03, 0.01)
}
else {
  //desktop camera start pos
  startCameraPos = new THREE.Vector3(0,0,0)
  startCameraRot = new THREE.Euler(-0.27, 0.03, 0.01)
}

//------------------------------LIGTHING------------------------
const ambientLight = new THREE.AmbientLight(0x404040, 25); 
scene.add(ambientLight);
const pl1 = new THREE.PointLight(0x404040, 100)
pl1.position.copy(new THREE.Vector3(24, -1, 10))
scene.add(pl1)
const pl2 = new THREE.PointLight(0x404040, 2000)
pl2.position.copy(new THREE.Vector3(2, 5, -10))
scene.add(pl2)

//--------------------LOAD MODEL-----------------------------------
//const model1;
modelLoader.load('./models/AdaptiveAutomaton.glb', (gltf) => {
  const model = gltf.scene
  scene.add(model)
  //model1 = model;
  model.position.set(10, -4, 5)
  model.rotation.y = -Math.PI/3
}, undefined, (error)=> {
  console.error(error)
})

camera.position.copy(startCameraPos)
camera.rotation.copy(startCameraRot)

function animate(){
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();