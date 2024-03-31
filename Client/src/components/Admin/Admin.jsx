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
    email: "",
    password: "",
    role: "buyer",
    name: ""
}

const Admin = () => {
    const [userData, setUserData] = useState([])
    const [user, setUser] = useState(initialData)
    const [method, setMethod] = useState("post")

    const token = useSelector((store) => store.AuthReducer.token)

    const handleInput = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }



    const getUserData = async () => {
        try {
            const res = await axios.get(baseUrl + "/admin/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserData(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const postUserData = async () => {
        try {
            const res = await axios.post(baseUrl + "/admin/user/create", user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            // console.log(res)
            alert(res.data.message)
            setUser(initialData)
            getUserData()
        } catch (error) {
            alert("Something Went Wrong")
            console.log(error)
        }
    }
    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(baseUrl + "/admin/user/delete/" + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            alert(res.data.message)
            getUserData()
        } catch (error) {
            console.log(error)
        }
    }
    const patchData = async (id, obj) => {
        try {
            const res = await axios.patch(baseUrl + "/admin/user/update/" + id, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            alert(res.data.message)
            getUserData()
            setUser(initialData)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (method == "post") {
            postUserData()
        } else {
            let { id, ...obj } = user;
            patchData(id, obj);
        }

        setMethod("post")
    }

    const handleEdit = (e) => {
        setUser({
            email: e.email,
            password: e.password,
            role: e.role,
            name: e.name,
            id: e._id
        })
        setMethod("patch")
    }

    const handleReset = () => {

        setMethod("post")
        setUser(initialData)
    }
    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className={style.container}>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Create or Edit User</h1>
                    <label htmlFor="name">Enter Your Name</label>
                    <input type="text" placeholder='Name' name="name" required autoComplete="off" value={user.name} onChange={(e) => handleInput(e)} />
                    <label htmlFor="name">Enter Email Adress</label>
                    <input type="email" placeholder='Email' name="email" required autoComplete="off" value={user.email} onChange={(e) => handleInput(e)} />
                    <label htmlFor="name">Select Role</label>
                    <select name="role" value={user.role} onChange={(e) => handleInput(e)}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                    </select>
                    <label htmlFor="name">Enter Password</label>
                    <input type="password" placeholder='Password' name="password" required autoComplete="off" value={user.password} onChange={(e) => handleInput(e)} disabled={method == "patch"} />
                    <input type="submit" value={method == "post" ? "Create New User" : "Update User's Data"} />
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
                                <StyledTableCell >Name</StyledTableCell>
                                <StyledTableCell >Email</StyledTableCell>
                                <StyledTableCell >Role</StyledTableCell>
                                <StyledTableCell >Edit</StyledTableCell>
                                <StyledTableCell >Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell >{row.name}</StyledTableCell>
                                    <StyledTableCell >{row.email}</StyledTableCell>
                                    <StyledTableCell >{row.role}</StyledTableCell>
                                    <StyledTableCell ><button className={style.editButton} onClick={() => { handleEdit(row) }}>Edit</button></StyledTableCell>
                                    <StyledTableCell ><button className={style.deleteButton} onClick={() => deleteUser(row._id)}>Delete</button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}

export default Admin