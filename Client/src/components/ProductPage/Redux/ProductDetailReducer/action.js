import { Detail_Obj } from "./actionType";

const addObj=(payload)=>{
    return {type:Detail_Obj,payload:payload}
}

export const AddDetailsObj=(dispatch,payload)=>{ 
    dispatch(addObj(payload));
}