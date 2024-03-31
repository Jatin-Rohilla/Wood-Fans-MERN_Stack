import React, { useEffect, useState } from 'react'
import style from "./Admin.module.css"

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { baseUrl } from '../../../configs';
import { useSelector } from 'react-redux';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const initialData = {
    image: "",
    price: "",
    title: "",
    type: "",
    url1: "",
    url2: "",
    url3: ""
}

const Seller = () => {
    const [productsData, setProductsData] = useState([])
    const [product, setProduct] = useState(initialData)
    const [method, setMethod] = useState("post")

    const token = useSelector((store) => store.AuthReducer.token)

    const handleInput = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }



    const getProductsData = async () => {
        try {
            const res = await axios.get(baseUrl + "/seller/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(res)
            setProductsData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const postProductsData = async () => {
        try {
            const res = await axios.post(baseUrl + "/seller/products/add", product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            // console.log(res)
            alert(res.data.message)
            getProductsData()
            setProduct(initialData)
        } catch (error) {
            alert("Something Went Wrong")
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await axios.delete(baseUrl + "/seller/products/delete/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert(res.data.message)
            getProductsData()

        } catch (error) {
            console.log(error)
        }
    }
    const patchProductData = async (id, obj) => {
        try {
            const res = await axios.patch(baseUrl + "/seller/products/update/" + id, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            alert(res.data.message)
            getProductsData()
            setProduct(initialData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (method == "post") {
            postProductsData()
        } else {
            let { id, ...obj } = product;
            patchProductData(id, obj);
        }

        setMethod("post")
    }

    const handleEdit = (e) => {
        setProduct({
            image: e.image,
            price: e.price,
            title: e.title,
            type: e.type,
            url1: e.url1,
            url2: e.url2,
            url3: e.url3,
            id: e._id
        })
        setMethod("patch")
    }

    const handleReset = () => {

        setMethod("post")
        setProduct(initialData)
    }
    useEffect(() => {
        getProductsData()
    }, [])

    return (
        <div className={style.container}>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Add or Edit Products</h1>

                    <label htmlFor="name">Enter Product Title</label>
                    <input type="text" placeholder='Title' name="title" required autoComplete="off" value={product.title} onChange={(e) => handleInput(e)} />

                    <label htmlFor="name">Enter Price</label>
                    <input type="number" placeholder='Price' name="price" required autoComplete="off" value={product.price} onChange={(e) => handleInput(e)} />

                    <label htmlFor="type">Select type</label>
                    <select name="type" value={product.type} onChange={(e) => handleInput(e)}>
                        <option value="">Select type</option>
                        <option value="Armchairs">Arm Chair</option>
                        <option value="Children's furniture">Children's furniture</option>
                        <option value="BEDS">Beds</option>
                        <option value="Sofas">Sofas</option>
                    </select>


                    <label htmlFor="image">Url for the main image</label>
                    <input type="text" placeholder='Main Image' name="image" required autoComplete="off" value={product.image} onChange={(e) => handleInput(e)} />

                    <label htmlFor="image">Url1 for image</label>
                    <input type="text" placeholder='url1' name="url1" required autoComplete="off" value={product.url1} onChange={(e) => handleInput(e)} />

                    <label htmlFor="image">Url2 for image</label>
                    <input type="text" placeholder='url2' name="url2" required autoComplete="off" value={product.url2} onChange={(e) => handleInput(e)} />

                    <label htmlFor="image">Url3 for image</label>
                    <input type="text" placeholder='url3' name="url3" required autoComplete="off" value={product.url3} onChange={(e) => handleInput(e)} />

                    <input type="submit" value={method == "post" ? "Add New Product" : "Update Product's Data"} />
                    <button onClick={handleReset} className={style.handleReset}>Reset</button>
                </form>

            </div>
            <div>
                {/* <h1>All users present in the database</h1> */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >Sr. No.</StyledTableCell>
                                <StyledTableCell >Title</StyledTableCell>
                                <StyledTableCell >Price</StyledTableCell>
                                <StyledTableCell >Type</StyledTableCell>
                                <StyledTableCell >Main Image</StyledTableCell>
                                <StyledTableCell >Url1</StyledTableCell>
                                <StyledTableCell >Url2</StyledTableCell>
                                <StyledTableCell >Url3</StyledTableCell>
                                <StyledTableCell >Edit</StyledTableCell>
                                <StyledTableCell >Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsData.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell >{row.title}</StyledTableCell>
                                    <StyledTableCell >{row.price}</StyledTableCell>
                                    <StyledTableCell >{row.type}</StyledTableCell>
                                    <StyledTableCell ><a href={row.image} target="_blank">Main Img</a></StyledTableCell>
                                    <StyledTableCell ><a href={row.url1} target="_blank">Url1</a></StyledTableCell>
                                    <StyledTableCell ><a href={row.url2} target="_blank">Url2</a></StyledTableCell>
                                    <StyledTableCell ><a href={row.url3} target="_blank">Url3</a></StyledTableCell>

                                    <StyledTableCell ><button className={style.editButton} onClick={() => { handleEdit(row) }}>Edit</button></StyledTableCell>
                                    <StyledTableCell ><button className={style.deleteButton} onClick={() => deleteProduct(row._id)}>Delete</button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default Seller