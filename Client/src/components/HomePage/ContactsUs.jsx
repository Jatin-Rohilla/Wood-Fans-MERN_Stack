import React from 'react'
import style from "./ContactUs.module.css"
const ContactsUs = () => {
    return (
        <div className={style.contactUsMain}>
            <div className={style.contactUs}>
                <h1>Contact Us</h1>
                <div>
                    <p className={style.paragraph}>Our team of experienced designers and craftsmen will be happy to create unique furniture for you that reflects your style and preferences.</p>
                    <div className={style.contactName}>
                        <input type="text" placeholder='What is your name?' />
                        <input type="text" placeholder='+7 (_ _ _)_ _ _-_ _-_ _' />
                    </div>
                    <div className={style.contactMsg}>
                        <input type="text" placeholder='Enter your message' />
                    </div>
                    <div className={style.contactSend}>
                        <p>
                            <input type="checkbox" />{" "}
                            I consent to the processing of personal data
                        </p>
                        <button>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactsUs