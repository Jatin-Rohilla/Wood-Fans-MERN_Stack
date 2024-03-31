import React from 'react'
import style from "./Section2.module.css"
import curved from "./CatalogueImages/CurvedPouf.jpg"
import Bed from "./CatalogueImages/BedWithAdj.jpg"

const Section2 = () => {
    return (
        <div className={style.section2MainDiv}>
            <div>
                <h1>Factory Order Portfolio</h1>
                <p>See All</p>
            </div>
            <div>
                <div>
                    <img src={curved} alt="" />
                    <p>25.09.2023</p>
                    <p>CURVE POUF - STYLE YOUR LIVING ROOM</p>
                </div>
                <div>
                    <img src={Bed} alt="" />
                    <p>25.05.2023</p>
                    <p>BED WITH ADJUSTABLE HEADBOARD</p>
                </div>
            </div>
        </div>
    )
}

export default Section2