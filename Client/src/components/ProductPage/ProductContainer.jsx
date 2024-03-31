import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./productContainer.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../CartPage/redux/action';
import load from "./loading.gif"
import { baseUrl } from '../../../configs';

const ProductContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { productType } = useSelector((store) => { return store.ProductReducer });
  // console.log(productType)

  const fetching = async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseUrl + `/products/?type=${productType}`)
      const jsonData = await (res.data);
      setData(jsonData);
      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetching()
  }, [productType])

  if (loading) {
    return (
      <div className={styles.loading}><div><img src={load} alt="" /></div></div>
    )
  }

  return (
    <div className={styles.container}>
      <h1>{data.type}</h1>
      <div className={styles.singleCard}>
        {
          data.map((ele) => (<div key={ele._id}>
            <img src={ele.image} alt="" />

            <div className={styles.nameDiv}>
              <h4>{ele.name}{ele.title}</h4>
              <p>RS {ele.price}</p>
            </div>
            <div className={styles.priceDiv}>
              <p style={{ "marginTop": "0em" }}>  <Link to={`productdetails/${productType}/${ele._id}`}>More details</Link></p>
              <p> {ele.cost}</p>
              <button onClick={() => { dispatch(addToCart([{ ...ele, qty: 1 }])) }}>Add to Cart
              </button>
            </div>
          </div>
          ))
        }
      </div>
    </div>
  );
}

export default ProductContainer