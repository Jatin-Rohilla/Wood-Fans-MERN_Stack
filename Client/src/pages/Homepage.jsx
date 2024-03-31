import React from 'react'
import Carousel from '../components/HomePage/Carousel'
import Section1 from '../components/HomePage/Section1'
import Section2 from '../components/HomePage/Section2'
import PhotoGallary from '../components/HomePage/PhotoGallary'
import Team from '../components/HomePage/Team'
import ContactsUs from '../components/HomePage/ContactsUs'
import BuyersChoice from '../components/HomePage/BuyersChoice'

const Homepage = () => {
    return (
        <div>
            <Carousel />
            <BuyersChoice />
            <Section1 />
            <Section2 />
            <PhotoGallary />
            <Team />
            <ContactsUs />
        </div>
    )
}

export default Homepage