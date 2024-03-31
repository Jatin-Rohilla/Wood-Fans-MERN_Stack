import React from 'react'
import style from "./Section1.module.css"
import bed from "./CatalogueImages/bed.jpg"
import chair from "./CatalogueImages/chair.jpg"
import child from "./CatalogueImages/child.jpg"
import sofa from "./CatalogueImages/sofa.webp"
import { Link } from 'react-router-dom'

const Section1 = () => {
    return (
        <div className={style.Section1MainContainer}>
            <div className={style.Section1Container}>
                <div>
                    <h2>Catalogue of our products</h2>
                    <div>
                        <div className={style.section1CatalogeImage}><img src={bed} alt="" /></div>
                        <p><Link to="/product">Bed</Link> <span>→</span></p>
                    </div>
                    <div className={style.Section1CardSection}>
                        <div>
                            <div><img src={child} alt="" /></div>
                            <p><Link to="/product">Children's furniture</Link> <span>→</span></p>
                        </div>
                        <div>
                            <div><img src={chair} alt="" /></div>
                            <p> <Link to="/product">Chairs</Link><span>→</span></p>
                        </div>
                    </div>
                </div>
                <div className={style.secondDivImg}>
                    <img src={sofa} alt="" />
                    <div className={style.OnPicture}>
                        <h1>Sofas</h1>
                        <Link to={"/product"} className={style.learnMore}>Learn More</Link><span> {" ⨠"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section1