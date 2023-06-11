import { PAGELOADER } from "./ActionTypes";

export const showPageLoader = (dispatch)=>{
    dispatch({ type: PAGELOADER, value:true });

}

export const hidePageLoader = (dispatch)=>{
    dispatch({ type: PAGELOADER, value:false });
}