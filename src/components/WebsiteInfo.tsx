import { useState } from "react";
import ImageGallery from "./ImageGallery";
import './styles/WebsiteInfo.css';
type GameInfoProps = {
    title: string;
    images: string[];
    description: string;
    bulletpoints: string[]
    link?: string
    headerBg?: string
    galleryBg?: string
    mainBg?: string
    infoBg?: string
    buttonBg?: string
    headerFontColor?: string
    last?: boolean
}

export default function GameInfo({title, images, description, bulletpoints, link,
    headerBg="gray", galleryBg="gray", mainBg="gray", infoBg = "gray", buttonBg="gray", headerFontColor = "black", last=false,
   }: GameInfoProps){
    const [infoIndex, setInfoIndex] = useState(0)
    
    return (
        <article className={`site-info ${last? 'last' : ''}`} style = {{backgroundColor: mainBg}}>
            <div className='siteHeader' style={{backgroundColor: headerBg}}>
                <h3 style={{color: headerFontColor}} >{title}</h3>
                {link? <a href={link}>Link</a> : null}
            </div>
            
            <div className="siteinfo-col" style = {{backgroundColor: galleryBg}}>
                <ImageGallery folder = "websites" images={images} altPrefix={title} bgColor={galleryBg}></ImageGallery>
                <div className='about-site' style={{backgroundColor: infoBg}} >
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

            
            
            
        </article>
    )

    
}