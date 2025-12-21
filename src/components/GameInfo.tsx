import { useState } from "react";
import ImageGallery from "./ImageGallery";
import './styles/GameInfo.css';
type GameInfoProps = {
    title: string;
    images: string[];
    description: string;
    bulletpoints: string[]
    link: string
    headerBg?: string
    galleryBg?: string
    mainBg?: string
    infoBg?: string
    buttonBg?: string
    caseStudy?: string
}

export default function GameInfo({title, images, description, bulletpoints, link,
    headerBg="gray", galleryBg="gray", mainBg="gray", infoBg = "gray", buttonBg="gray",
    caseStudy = undefined}: GameInfoProps){
    const [infoIndex, setInfoIndex] = useState(0)
    const [studyVisible, setStudyVisible] = useState(false)

    
    return (
        <article className='game-info' style = {{backgroundColor: mainBg}}>
            <div className='gameHeader' style={{backgroundColor: headerBg}}>
                <h3 >{title}</h3>
                <a href={link}>Itch.io link</a>
            </div>
            
            <div className="gameinfo-row" style = {{backgroundColor: galleryBg}}>
                <ImageGallery images={images} altPrefix={title} bgColor={galleryBg}></ImageGallery>
                <div className='about-game' style={{backgroundColor: infoBg}} >
                    <nav className = 'button-row' style={{backgroundColor: infoBg}}>
                        <button className = 'headerButton' onClick={()=>setInfoIndex(0)} style={{backgroundColor: buttonBg}}>Description</button>
                        <button className = 'headerButton' onClick={()=>setInfoIndex(1)} style={{backgroundColor: buttonBg}}>Technologies/Skills</button>
                    </nav>
                    <div className = 'slider' style = {{transform: `translateX(-${infoIndex*100}%)`, backgroundColor: infoBg}}>
                        <p style = {{backgroundColor: infoBg}}>{description}</p>
                        <ul style= {{backgroundColor: infoBg}}>
                            {bulletpoints.map((bullet) => (
                                <li style= {{backgroundColor: infoBg}}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className = 'gameinfo-row' style = {{backgroundColor: galleryBg, position: "relative", paddingTop: "5rem"}}>
                {caseStudy?
                <>
                    <label  className = 'casestudy-title' htmlFor = 'carrotDropdown'>Case Study Presentation</label>
                    <button className = 'carrotDropdown' style={{transform: studyVisible? 'rotate(90deg)' : 'rotate(0deg)', backgroundColor: buttonBg}}
                    onClick={()=>{setStudyVisible(!studyVisible)}}
                    >{'>'}</button>
                    {studyVisible?
                        <iframe
                        src = {`${import.meta.env.BASE_URL}${caseStudy}`}
                        title = "Divergent and Convergent Thinking Case Study"
                        width = "100%"
                        style = {{height: "80vh", border: 'none'}}
                        />
                        : null
                
                    }
                    
                </>
                : null}
            </div>

            
            
            
        </article>
    )
}