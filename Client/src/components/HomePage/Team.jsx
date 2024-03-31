import React from 'react'
import style from "./Team.module.css"
const Team = () => {
    return (
        <div className={style.teamMain}>
            <h1>Our Team</h1>
            <div className={style.team}>
                <div>
                    <img src="https://api.woodfans.ru/storage/uploads/images/XDIFAyFkiwPA5A28vJggQyPaaNISeCArUjs7LoKM_cropped_1200_779_widened_370.webp" alt="" />
                    <h2>Maltseva Nina</h2>
                    <p>Head of Sales</p>
                </div>
                <div>
                    <img src="https://api.woodfans.ru/storage/uploads/images/2KxjrGgVMnPOKKKEbtOdBxbJ7LXbCx7zskYaz04j_cropped_1200_779_widened_370.webp" alt="" />
                    <h2>Ivanov Aleksey</h2>
                    <p>General Director</p>
                </div>
                <div>
                    <img src="https://api.woodfans.ru/storage/uploads/images/Mu4aTzAOuxMD4DD1nCtAuBRSzILK1sJZRTTglJk8_cropped_1200_779_widened_370.webp" alt="" />
                    <h2>Ivanova Elena</h2>
                    <p>Creative Director</p>
                </div>
            </div>
        </div>
    )
}

export default Team