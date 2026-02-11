import { useState } from 'react'
import './App.css'
import GameInfo from './components/GameInfo'
import WebsiteInfo from './components/WebsiteInfo'
import DevLog from './components/DevLog'

function App() {
  //const base = import.meta.env.BASE_URL

  const [sectionIndex, setSectionIndex] = useState(0)
  return (
    <div className='main'>
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
            description={`MyPantry is a web applkkication for storing recipes and managing ingredients to make planning for cooking easier. 
            You can track what ingredients you have available to filter recipes by what you have on hand, and add a recipe to a shopping list in a single click!`} 
            bulletpoints={["Made using the Next.js React frameowrk and MySQL", "Designed database structure and created with MySQL", 
            "authentication implemented using JSON Web Tokens, and Bcrypt for password hashing", "Utilized Docker to deploy project to an Ubuntu Server machine"]}
            mainBg='#5687d6' headerBg='#5687d6' galleryBg = "#336ecc" infoBg='#8cade3ff' buttonBg='#5da9e8'>  
            </WebsiteInfo>
            
          </section>

          <section id = "games">
            <GameInfo title="Death's Janitor" description="Play as death's janitor in this deckbuilding RPG. Gain new cards and grow stronger as 
                          you explore the crypts and clean up the undead." 
            images={["title.png", "room.png", "Death'sJanitorBattle.png"]} 
            bulletpoints={["Made using gamemaker", "Card based combat with fluid animation", "Sprites made using LibreSprite", "Original music made with LMMS and Ableton Live"]} 
            link="https://ikimo431.itch.io/deaths-janitor"
            mainBg='#827e7d' headerBg='#735b30' galleryBg='#4d2020' infoBg='#733232'
            caseStudy="Death'sJanitor_CaseStudyDTCT.pdf"
            ></GameInfo>
            <DevLog backgroundColor='#4d2020' entries={[
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
            mainBg='#431a54' headerBg='#956fa6' galleryBg='#654175' infoBg='#935bab' buttonBg='#b46cd1ff'
              />

          </section>
        </div>
        </div>
        
        
    </div>
  )
}
//test
export default App
