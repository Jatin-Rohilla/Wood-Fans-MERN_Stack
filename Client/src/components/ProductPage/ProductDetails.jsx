import React, { useEffect, useState } from 'react'
import styles from './ProductDeatils.module.css'
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../CartPage/redux/action';
import { baseUrl } from '../../../configs';
const ProductDetails = () => {
  const [data, setData] = useState([]);
  const { type, id } = useParams();
  const value = useParams();
  const dispatch = useDispatch()
  const fetching = () => {
    console.log(baseUrl + `/products/${id}`)
    const res = axios.get(baseUrl + `/products/${id}`)
      .then((res) => { setData(res.data) })
  }

  useEffect(() => { fetching() }, [id])
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.left}>
            <div>
              <img src={data.image} />
            </div>
            <div className={styles.leftDown}>
              <div>
                <img src={data.url1} />
              </div>
              <div>
                <img src={data.url2} />
              </div>
            </div>
            <div className={styles.description}>
              <h2>Specification:-</h2>
              <p>Modular, fully customized {data.type} with super comfortable exclusive filling and free non-fixing backrests. Use the space on the {data.type}  as you wish.</p>
              <p>The top layer of the City {data.type}  filler is made of natural goose down and feathers. This gives owners increased comfort and convenience. The backrests can be moved across the entire surface of the {data.type}  - they perfectly hold the body, do not get in the way, and do not slide off. </p>
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <h1>{data.title}</h1>
            </div>
            <div>
              <p> {data.type} {" >"} </p>
              <h2>Price:- {data.price}₹</h2>
            </div>
            <div>
              <p>Fabric texture and color:</p>
              <div className={styles.fabric}><img src="https://api.woodfans.ru/storage/uploads/images/kn8iLsymSOppqND13mAoHryqp0tODnZzhp53hIJO_cropped_2013_753.webp" /></div>
            </div>
            <div>
              <p>Select size:</p>
              <div className={styles.select}>
                <select className={styles.custom_arrow}>
                  <option>Big</option>
                  <option>Average</option>
                  <option>Small</option>
                </select>
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
            </div>
            <div>
              <p>Softness of {data.type} cushions:</p>
              <select className={styles.custom_arrow}>
                <option>Tough</option>
                <option>Average</option>
                <option>Soft</option>
              </select>
            </div>
            <div>
              <p className={styles.submit} onClick={() => { dispatch(addToCart([{ ...data, qty: 1 }])) }}> <button>Add To Cart</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails