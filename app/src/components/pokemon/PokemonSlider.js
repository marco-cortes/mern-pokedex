import React, { useState } from "react";

export const PokemonSlider = ( {images} ) =>{

    const [slideIndex, setSlideIndex] = useState(1)

    const moveDot = index => {
        setSlideIndex(index)
    }

    return(
        <div className="pokemon-slider">
            { 
                images && images.length > 0 &&
                images.map((image, index) => ( 
                <div 
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"} 
                    key={index}> 
                    <img src={image} alt="pokemon" /> 
                </div> 
                )) 
            } 

            {
                images && images.length > 0 && 
                <div className="container-dots">
                    {Array.from({length: images.length}).map(
                        (item, index) => (
                            <div 
                                onClick={() => moveDot(index + 1)}
                                className={slideIndex === index + 1 ? "dot active" : "dot"}>
                            </div>
                        ))
                    }
                </div>
            }
        </div>

    )
}