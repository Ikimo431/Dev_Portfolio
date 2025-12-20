
import { useState } from 'react'
import './styles/ImageGallery.css'

type ImageGalleryProps = {
    images: string[]
    altPrefix?: string
    bgColor?: string
    folder?: string
}



export default function ImageGallery({images, altPrefix = 'Gallery Image', bgColor = "gray", folder=""}: ImageGalleryProps){

    const [currIndex, setCurrIndex] = useState(0)
    const numImages = images.length

    function prevImage() {
        setCurrIndex((prev)=> (prev===0? numImages-1 : prev-1))
    }
    function nextImage() {
        setCurrIndex((next) => next===numImages-1? 0 : next+1)
    }
    console.log(`../assets/images/${folder!=""? folder + '/' : folder}${images[0]}`)
    return (
        <div className = 'img-slider' style={{backgroundColor: bgColor}}>
            <div className = 'slider-track'
                style = {{transform: `translateX(-${currIndex*100}%)`}}
                >
                
                {images.map((_, index)=>(
                    <img 
                        key = {index}
                        src = {new URL(`/src/assets/images/${images[index]}`, import.meta.url).href} 
                        loading = "lazy"
                        alt = {`${altPrefix} ${currIndex+1}`}
                    />
                ))}
                
            </div>
            <button className='arrow left' onClick={prevImage} aria-label='Previous Image'> {'<'} </button>
            <button className='arrow right' onClick={nextImage} aria-label='Next Image'> {'>'} </button>
                

            <div className = 'dots'>
                {images.map((_, index)=>(
                    <button
                        key = {index}
                        className={`dot ${index===currIndex? 'active' : ''}`}
                        aria-label={`Go to image ${index +1}`}
                        onClick={()=> {setCurrIndex(index)}}
                    />
                ))}
            </div>
        </div>
       
                
              
    )
}