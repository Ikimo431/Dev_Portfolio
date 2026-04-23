import { useEffect, useState } from 'react'
import './App.css'
import GameInfo from './components/GameInfo'
import WebsiteInfo from './components/WebsiteInfo'
import DevLog from './components/DevLog'
import './components/styles/AdaptiveAutomaton.css'
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ImageGallery from './components/ImageGallery'
//import modelUrl from '../public/models/AdaptiveAutomaton.glb'

function App() {
  //const base = import.meta.env.BASE_URL

  const [sectionIndex, setSectionIndex] = useState(0)
  const [canvasVisible, setCanvasVisible] = useState(false)
  const mixers: THREE.AnimationMixer[] = [];
  useEffect(()=> {
    const scene = new THREE.Scene();
    const grid = new THREE.GridHelper(50, 50);
    scene.add(grid);
    const axes = new THREE.AxesHelper(5);
    scene.add(axes);
    const modelLoader = new GLTFLoader();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    console.log("CANVAS FOUND: " + document.getElementById("bg"))
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg") as HTMLCanvasElement
    })
    
    
    //-----CAMERA INITIALIZE--------
    //const controls = new OrbitControls(camera, renderer.domElement);
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    console.log("Window inner width is: " + window.innerWidth)
    let startCameraPos = new THREE.Vector3();
    let camTarget = new THREE.Vector3();
    //let startCameraRot = new THREE.Euler();
    const mobile = window.innerWidth <= 650
    if(mobile){
      //mobile camera start pos
      startCameraPos = new THREE.Vector3(-14.10, 2.77, -4.43)
      camTarget = new THREE.Vector3(0.744, 1.661, -2.760)
    }
    else {
      //desktop camera start pos
      startCameraPos = new THREE.Vector3(-13.21, 2.48, -6.76)
      camTarget = new THREE.Vector3(4.77, 0.319, -9.0945)
    }
    
    //------------------------------LIGTHING------------------------
    const ambientLight = new THREE.AmbientLight(0x404040, 5000); 
    scene.add(ambientLight);
    const pl1 = new THREE.PointLight(0x404040, 3000)
    const helper = new THREE.PointLightHelper( pl1, 5 );
    scene.add( helper );
    pl1.position.copy(new THREE.Vector3(-2,8,-2))
    scene.add(pl1)
    const pl2 = new THREE.PointLight(0xFF8844, 50)
    pl2.position.copy(new THREE.Vector3(0.1,1,0.1))
    scene.add(pl2)
    //--------------------LOAD MODEL-----------------------------------
    //const model1;
    console.log("PATH TO MODEL IS: " + `${import.meta.env.BASE_URL}models/AutomatonFinal.glb`)
    modelLoader.load(`${import.meta.env.BASE_URL}models/AutomatonFinal.glb`, (gltf) => {
      const model = gltf.scene
      scene.add(model)
      //model1 = model;
      model.position.set(0, 0, 0)
      model.scale.set(1,1,1)
      model.rotation.y = -Math.PI/3
      const mixer = new THREE.AnimationMixer(model);

      const idle = gltf.animations[3]; // usually first is idle
      const action = mixer.clipAction(idle);

      action.play(); // start animation

      // store mixer so we can update it in animate loop
      mixers.push(mixer);
    }, undefined, (error)=> {
      console.error(error)
    })
    
    
    camera.position.copy(startCameraPos)
    //camera.lookAt(4.77, 0.319, -9.0945)
    camera.lookAt(camTarget.x, camTarget.y, camTarget.z)
    //controls.target = new THREE.Vector3(0,0,0)

    //camera.rotation.copy(startCameraRot)
    

    const clock = new THREE.Clock();
    function animate(){
        requestAnimationFrame(animate);
        const delta = clock.getDelta()
        mixers.forEach((mixer) => mixer.update(delta/2));

        //controls.update()
        renderer.render(scene, camera);
    }
    animate();

    //camera debug 
    
    const debugButton = document.getElementById('debug') as HTMLButtonElement;
    debugButton.addEventListener('click', () => {
      const pos = camera.position;
      //const rot = camera.rotation;

      console.log(`Camera Position: x=${pos.x.toFixed(2)}, y=${pos.y.toFixed(2)}, z=${pos.z.toFixed(2)}`);
      //console.log(`Camera Rotation: x=${rot.x.toFixed(2)}, y=${rot.y.toFixed(2)}, z=${rot.z.toFixed(2)}`);
      //console.log(controls.target)
    }); 
  }, [])

  

  useEffect(()=> {
        const container = document.querySelector('.slider-parent') as HTMLElement
        if (!(container instanceof HTMLElement)) return
        const slides = container.querySelectorAll(':scope > section') as NodeListOf<HTMLElement>
        const slide = slides[sectionIndex]
        if (!(slide instanceof HTMLElement)) return
        container.style.height = slide.offsetHeight + 'px'
  }, [sectionIndex])

  async function OpenAutomatonArticle(){
    const sleep = async (ms: number) => new Promise(resolve=>setTimeout(resolve, ms))
    const element: HTMLElement = document.querySelector("#AdaptiveAutomatonExtra") as HTMLElement
    setCanvasVisible(true)
    element.style.height = "100vh"
    await sleep(1000)
    element.style.width = "100vw"
    element.style.left = "0px"
    
  }

  function CloseAutomatonArticle(){
    const element: HTMLElement = document.querySelector("#AdaptiveAutomatonExtra") as HTMLElement
    element.style.height = "0px"
    element.style.width = "0px"
    element.style.left = "45vw"
    setCanvasVisible(false)
  }

  return (
      <div className='main'>
        <article id="AdaptiveAutomatonExtra" style={{overflow: 'hidden'}}>
             <button id='debug' style={{position: "fixed", zIndex: 500, display: canvasVisible?"block": "none"}}>debug</button>
             <button id ='closeAutomaton' style = {{position: "fixed", zIndex: 502, display: canvasVisible? "block": 'none'}}
              onClick={()=>{CloseAutomatonArticle()}}
             >Close</button>
             <div className = 'automatonslider' style = {{display: canvasVisible? "block": 'none'}}>
                <ImageGallery images={["AdaptiveAutomatonTitle.png", "AdaptiveAutomatonAdaptDiagram.png", "AdaptiveAutomatonClassDiagram.png"]}
                captions={["Title Screen", "Adaptation Method Diagram", "Simulaiton Class Diagram"]}></ImageGallery>
             </div>
             <canvas id='bg' style={{display: canvasVisible? "block": 'none'}}></canvas>
        </article>
        <section id="aboutme">
          <div className='about'>
          <h2>Owen Johnston</h2>
          <p>I am a senior studying computer science at Carroll University, with minors in math and art. Programming is my strongsuit, 
            and I chose an art minor to broaden my skillset and improve one of my weak points in game development. This page contains a few of my games and websites. 
            For more specific information about my skills, visit my portfolio homepage <a href='https://ikimo431.github.io/Portfolio-Site/index.html'>here.</a>
          </p>
          </div>
          
          <ul id="links">
            <li><a href = 'https://ikimo431.itch.io/'>Itch.io</a></li>
            <li><a href = 'https://github.com/Ikimo431'>Github</a></li>
            <li><a href = 'https://www.linkedin.com/in/owen-johnston-240b85305/'>LinkedIn</a></li>
            <li>Contact Me: owenj120@gmail.com</li>
          </ul>
        </section>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", backgroundColor: "#334b80"}}>
            <button id="games" style = {{borderRadius: ".35rem"}}onClick={()=>{setSectionIndex(0)}}>Websites</button>
            <button id="websites" style = {{borderRadius: ".35rem"}} onClick={()=>{setSectionIndex(1)}}>Games</button>
          </div>
        <div className = 'slider-parent'>

       
        <div className='section-slider' style={{transform: `translateX(-${sectionIndex*100}%)`}}>
          
          
          

          

          <section id = "websites">
            <WebsiteInfo title={'Recording Scheduler Web Portal'} images={["ScheduledRecordingDiagram.gif", "AdhocRecordingDiagram.gif", 
              "NDIHub_SelectDate.png", "NDIHub_InfoOptions.png", "NDIHub_AdminPanel.png"]} 
              description={`A web portal for Carroll University staff and students to start and schedule recordings. Usable by staff and students, 
              the portal includes an admin panel for IT to manage recording permissions by building. The portal was also made with support for dynamic routing of NDI sources to support 
              the university's planned switch to NDI cameras`} 
              bulletpoints={["Made using the Next.js React frameowrk and MySQL database", "Utilized the NDI SDK to create router application in C++", 
              "Authentication handled with orginization's SSO using Microsoft Authentication Library", "Integrated with YuJa API to handle doing the recording"]}
              mainBg='#1b3c80' headerBg='#122a5c' headerFontColor = "white" galleryBg='#1b3c80' infoBg='#e56824'>
                  
            </WebsiteInfo>

            <WebsiteInfo title="MyPantry" images={["MyPantryDash.png", "SingleIngredient.gif", "RecipeAddClick.gif", "SaveShopping.gif"]} 
            description={`MyPantry is a web application for storing recipes and managing ingredients to make planning for cooking easier. 
            You can track what ingredients you have available to filter recipes by what you have on hand, and add a recipe to a shopping list in a single click!`} 
            bulletpoints={["Made using the Next.js React frameowrk and MySQL", "Designed database structure and created with MySQL", 
            "authentication implemented using JSON Web Tokens, and Bcrypt for password hashing", "Utilized Docker to deploy project to an Ubuntu Server machine"]}
            mainBg='#5687d6' headerBg='#5687d6' galleryBg = "#336ecc" infoBg='#8cade3ff' buttonBg='#5da9e8' last={true}>  
            </WebsiteInfo>
            
          </section>

          <section id = "games">
            <GameInfo title="Adaptive Automaton" description="A prototype demonstration of a neural-network AI enemy 
                    which can retrain to adapt to the player's playstyle"
                    images={["AdaptiveAutomatonTitle.png", "AdaptiveAutomatonAdaptDiagram.png", "AdaptiveAutomatonClassDiagram.png"]}
                    bulletpoints={["Python simulation utilizing Pytorch to train models and export in .onnx format", "Webpage created with Vue to evaluate models",
                      "Game made in unity, with onnx models imported through Barracuda"
                    ]}
                    link="https://ikimo431.itch.io/adaptiveautomaton"
                    mainBg='#4d413b' headerBg='#d9904c'  galleryBg='#905f31' infoBg= '#afadac'

            ></GameInfo>
            <button onClick={()=>{OpenAutomatonArticle()}}>See More</button>
          
            <GameInfo title="Death's Janitor" description="Play as death's janitor in this deckbuilding RPG. Gain new cards and grow stronger as 
                          you explore the crypts and clean up the undead." 
            images={["title.png", "room.png", "Death'sJanitorBattle.png"]} 
            bulletpoints={["Made using gamemaker", "Card based combat with fluid animation", "Sprites made using LibreSprite", "Original music made with LMMS and Ableton Live"]} 
            link="https://ikimo431.itch.io/deaths-janitor"
            mainBg='#160b0b' headerBg='#735b30' galleryBg='#4d2020' infoBg='#733232'
            caseStudy="Death'sJanitor_CaseStudyDTCT.pdf"
            ></GameInfo>
            <DevLog mainBg='#160b0b'backgroundColor='#4d2020' entries={[
            {
              date: "01/03/2026",
              bulletpoints: ["Created new animated battle idle sprites for undead knight and zombie", "Added battle_sprite variable to enemy parent to support using different sprite in battle"]
            },
            {
              date: "01/09/2026",
              bulletpoints: ["Added animated attack sprites for enemies", "Added new battle music", "Added new attack sound effects"]
            }
            ]}
            />

            <GameInfo title= "Rhythm Pillars" description = "Move and hit the pillars to the beat!" link="https://ikimo431.itch.io/rhythm-pillars"
            images = {["RhythmPillarsTitle.png", "RhythmPillarsGif.gif", "RhythmPillarsEnd.png"]} bulletpoints={["Created using GameMaker", "Scripting done in GML", "Art and animations created using LibreSprite", 
              "Music made in LMMS and Ableton Live"]}
            mainBg='#431a54' headerBg='#956fa6' galleryBg='#654175' infoBg='#935bab' buttonBg='#b46cd1ff' last={true}
              />

          </section>
        </div>
      </div>
      
        
      
    </div>
    
  )

 
}
//test
export default App
