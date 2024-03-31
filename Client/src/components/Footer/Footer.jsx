
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">

      <div className='footer_links'>
        <div className='footer_links_div'>
          <img src="https://woodfans.ru/logo-dark.svg" alt="Logo" />

        </div>

        <div className='footer_links_div'>
          <a href='#'>
            <p>Individual project</p>
          </a>
          <a href='#'>
            <p>Payment</p>
          </a>
          <a href='#'>
            <p>Portfolio</p>
          </a>
          <a href='#'>
            <p>Dubai</p>
          </a>
          <a href='#'>
            <p>Site Map</p>
          </a>
        </div>
        <div className='footer_links_div'>
          <a href='#'>
            <p>Delivery</p>
          </a>
          <a href='#'>
            <p>Blog</p>
          </a>
          <a href='#'>
            <p>About Us</p>
          </a>
          <a href='#'>
            <p>Contacts</p>
          </a>

        </div>


        <div className='footer_links_div'>
          <a href='#'>
            <p>Upholstered furniture to order</p>
          </a>
          <a href='#'>
            <p>Custom sofas</p>
          </a>

        </div>
        <div className='footer_links_div'>
          <a href='#'>
            <h4>+7 (926) 787-11-00</h4>
          </a>
          <a href='#'>
            <h4>+7 (495) 147-97-77</h4>

          </a>
          <a href='#'>
            <p>Modern furniture factory</p>
          </a>

        </div>



        <hr></hr>

        <div className='footer_below'>
          <div className='footer-copyright'>
            <p>Moscow © 2007–2023 "WOOD FANS®" - furniture production. All rights reserved.</p>

          </div>


        </div>

      </div>

    </footer>
  )
}

export default Footer
