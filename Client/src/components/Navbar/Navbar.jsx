import React, { useEffect, useRef, useState } from 'react'
import logo from "./NavbarImages/Logo.svg"
import cart from "./NavbarImages/Cart.svg"
import search from "./NavbarImages/SearchIcon.svg"
import burger from "./NavbarImages/BurgerMenu.svg"
import cross from "./NavbarImages/Cross.svg"
import human from "./NavbarImages/human-icon.svg"
import style from "./Navbar.module.css"
import "./navbar.css"


import { AddProductType } from '../ProductPage/ProductReducer/action'


import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../Login/redux/action'
import axios from 'axios'
import { baseUrl } from '../../../configs'

const Navbar = () => {
    const [clickedHumburger, setClickedHumburger] = useState(false)
    const [dropDownLogin, setDropDownLogin] = useState(false)
    const [dropDownSearch, setDropDownSearch] = useState(false)
    const isAuth = useSelector((store) => store.AuthReducer.isAuth);
    const role = useSelector((store) => store.AuthReducer.role);
    const userName = useSelector((store) => store.AuthReducer.name);
    const prev = useRef("")

    const handleProductType = (productType) => {
        AddProductType(dispatch, productType);
    }

    const dispatch = useDispatch()
    const [searchResults, setsearchResults] = useState("");
    const [close, setClose] = useState(false)
    const debounce = useRef("");
    const [searchedData, setSearchedData] = useState([])
    const navigate = useNavigate();

    //=====================>>
    const data = useSelector((store) => store.CartReducer)

    let details = data.reduce((acc, e) => {
        return { ...acc, qty: acc.qty + e.qty }
    }, { qty: 0 })

    //=====================>>
    const search = async (key) => {
        try {
            const res = await axios.get(baseUrl + `/products?title=${key}`);
            // console.log(res);
            const data = res.data
            let arr = []
            for (let i = 1; i <= data.length; i++) {
                if (i <= 3) {
                    arr.push(data[i - 1])
                }
            }
            setSearchedData(arr)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        clearTimeout(debounce.current);
        debounce.current = setTimeout(() => {
            search(searchResults)
            setClose(true)
        }, 700);
    }, [searchResults])


    return (
        <div id='navbar_container' onClick={() => { setsearchResults(""); dropDownLogin ? setDropDownLogin(false) : <></> }}>
            {/* ----------Navbar for Laptop Screen Starts Here ------------ */}
            <div className={style.navbar_bigscreen}>

                <div className={style.logo_navbar}><Link to={"/"}><img src={logo} alt="Logo" /></Link></div>
                <div className={style.navbar_content_container}>
                    <div className={style.navbar_top}>
                        <div>
                            <p><Link to={"#"} className={style.link}>Indivisual project</Link></p>
                            <p><Link to={"#"} className={style.link}>Delivery</Link></p>
                            <p><Link to={"#"} className={style.link}>Payment</Link></p>
                            <p><Link to={"#"} className={style.link}>Blog</Link></p>
                            <p><Link to={"#"} className={style.link}>Portfolio</Link></p>
                            <p><Link to={"#"} className={style.link}>About us</Link></p>
                        </div>
                        <div>
                            <div className={style.search_icon}>
                                <input type="text" placeholder='Search Items...' value={prev.current} onChange={(e) => { prev.current = e.target.value; setsearchResults(e.target.value); }} />
                                <img src={search} alt="" />

                                {/* productdetails/${productType}/${ele._id} */}
                                {
                                    searchResults.length > 0 ? (<div className={style.searchDropdown}>
                                        {
                                            searchedData.length ? (searchedData.map((e) => {
                                                return (
                                                    <div key={e.id} onClick={() => { navigate(`/product/productdetails/${e.type}/${e._id}`); setsearchResults("") }}>{e.title}</div>
                                                )
                                            })) : (<div>No Results...</div>)
                                        }
                                    </div>) : (<></>)
                                }
                            </div>
                            {
                                !isAuth ? (<p><Link to={"/login"} className={style.link}><b>Login</b></Link></p>) : (<div className={style.humanIcon}><img src={human} alt="" onClick={() => { setDropDownLogin(!dropDownLogin); setDropDownSearch(false) }} />
                                    {
                                        dropDownLogin ? (<div className={style.logindropdown}>
                                            <div onClick={() => { navigate("/"); setDropDownLogin(false) }}>{userName}</div>
                                            <div onClick={() => { navigate("/cart"); setDropDownLogin(false) }}>My Cart</div>
                                            {
                                                role == "admin" ? (<div onClick={() => { navigate("/admin"); setDropDownLogin(false) }}>Admin Page</div>) : (<></>)
                                            }
                                            {
                                                role == "seller" ? (<div onClick={() => { navigate("/seller"); setDropDownLogin(false) }}>Seller Terminal</div>) : (<></>)
                                            }
                                            <div onClick={() => { dispatch(userLogout()); setDropDownLogin(false) }}>Logout</div>
                                        </div>) : (<></>)
                                    }
                                </div>)
                            }

                            <Link to="/cart"><img src={cart} className={style.navbar_cart} />
                                <p className={style.countBigScreen}>{details.qty}</p>

                            </Link>
                        </div>
                    </div>
                    <div className={style.navbar_bottom}>
                        <div>
                            <p onClick={() => { handleProductType("Sofas") }}><Link to={"/product"} className={style.link}>SOFAS</Link></p>
                            <p onClick={() => { handleProductType("BEDS") }}><Link to={"/product"} className={style.link}>BED</Link></p>
                            <p onClick={() => { handleProductType("Children's furniture") }}><Link to={"/product"} className={style.link}>CHILDREN'S FURNITURE</Link></p>
                            <p onClick={() => { handleProductType("Armchairs") }}><Link to={"/product"} className={style.link}>ARMCHAIRS AND POUFS</Link></p>
                        </div>
                        <div>
                            <div><b style={{ fontSize: "0.9rem" }}>+7 (926) 787-11-00</b></div>
                            <p style={{ fontSize: "0.9rem" }}>Modern Furniture factory</p>
                        </div>

                    </div>
                </div>
            </div>
            {/* ----------Navbar for Laptop Screen Ends Here ------------ */}
            <div className={style.navbar_smallscreen}>
                <div className={style.logo_mobile}><Link to={"/"}><img src={logo} alt="Logo" /></Link></div>
                <div className={style.navbar_mobile}>
                    <div className={style.search_icon}>
                        <input type="text" placeholder='Search Items...' value={searchResults} onChange={(e) => setsearchResults(e.target.value)} />
                        <img src={search} alt="" />
                        {
                            searchResults.length > 0 ? (<div className={style.searchDropdown}>
                                {
                                    searchedData.length ? (searchedData.map((e) => {
                                        return (
                                            <div key={e.id} onClick={() => { setsearchResults(""); navigate(`/product/productdetails/${e.t}/${e.id}`) }}>{e.title}</div>
                                        )
                                    })) : (<div>No Results...</div>)
                                }
                            </div>) : (<></>)
                        }
                    </div>
                    {
                        !isAuth ? (<p><Link to={"/login"} className={style.link}><b>Login</b></Link></p>) : (<div className={style.humanIcon}><img src={human} alt="" onClick={() => { setDropDownLogin(!dropDownLogin) }} />
                            {
                                dropDownLogin ? (<div className={style.logindropdown}>
                                    <div onClick={() => { navigate("/"); setDropDownLogin(false) }}>{userName}</div>
                                    <div onClick={() => { navigate("/cart"); setDropDownLogin(false) }}>My Cart</div>
                                    <div onClick={() => { dispatch(userLogout()); setDropDownLogin(false) }}>Logout</div>
                                </div>) : (<></>)
                            }
                        </div>)
                    }
                    <div>
                        <img src={cart} className={style.navbar_cart} onClick={() => { navigate("/cart") }} />
                        <p className={style.countBigScreen}>{details.qty}</p>
                    </div>
                    <img src={clickedHumburger ? cross : burger} className={style.navbar_humburger} onClick={() => { setClickedHumburger(!clickedHumburger) }} />
                </div>
            </div>
            {
                clickedHumburger ? (<div className={style.main_dropdown}>
                    <div className={style.mobile_dropdown}>
                        <div>
                            <p onClick={() => { handleProductType("Sofas") }}><Link to={"/product"} onClick={() => { setClickedHumburger(!clickedHumburger) }}>SOFAS</Link></p>
                            <p onClick={() => { handleProductType("Beds") }}><Link to={"/product"} onClick={() => { setClickedHumburger(!clickedHumburger) }}>BED</Link></p>
                            <p onClick={() => { handleProductType("ChildrenFurniture") }}><Link to={"/product"} onClick={() => { setClickedHumburger(!clickedHumburger) }}>CHILDREN'S FURNITURE</Link></p>
                            <p onClick={() => { handleProductType("ArmChair") }}><Link to={"/product"} onClick={() => { setClickedHumburger(!clickedHumburger) }}>ARMCHAIRS AND POUFS</Link></p>
                        </div>
                        <div>
                            <div>
                                <p>Individual project</p>
                                <p>Payment</p>
                                <p>Portfolio</p>
                                <p>Dubai</p>
                            </div>
                            <div>
                                <p>Delivery</p>
                                <p>Blog</p>
                                <p>About us</p>
                                <p>Contact</p>
                            </div>
                        </div>
                        <div>
                            <h1>+7 (926) 787-11-00</h1>
                            <p>Modern Furniture Factory</p>
                        </div>
                    </div>
                </div>) : (<></>)
            }
        </div>
    )
}

export default Navbar