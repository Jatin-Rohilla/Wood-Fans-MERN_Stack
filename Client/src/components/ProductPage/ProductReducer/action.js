import { Add_To_Cart, Handle_Product_Navbar } from "./actionType"

 const cartArr=(payload)=>{ 
return {type:Add_To_Cart,payload:payload}
}
const productNavbar=(payload)=>{
    return {type:Handle_Product_Navbar,payload:payload}
    }


export const AddToCart=(dispatch,payload)=>{
dispatch(cartArr(payload))
}
export const AddProductType=(dispatch,payload)=>{
    dispatch(productNavbar(payload))
}