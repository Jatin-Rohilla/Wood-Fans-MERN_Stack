import { Detail_Obj } from "./actionType"

const initialState={
    detailObjId:null,
}
const ProductDetailReducer=(state=initialState,action)=>{
    switch(action.type){
        case Detail_Obj:{return {...state,detailObjId:action.payload-1}}
        default: return state
    }
}
export default ProductDetailReducer;