import React from 'react'
import image1 from "./CarouselImages/image1.webp"
import style from "./Carousel.module.css"
const Carousel = () => {
    return (
        <div id={style.carouselContainer}>
            <div><img src={image1} alt="" /></div>
        </div>
    )
}

export default Carousel