import { ON_CHANGE } from "../utils/ActionTypes";

const defaultState = {
    user : {},
    todos:[],
    showLogin: false,
    userInfo:{}
}



var userData = {};
const countReducer = function (state = defaultState, action) {
    switch (action.type) {
      case "INCREMENT":
        return {...state, count:state.count+1}
      case "DECREMENT":
        return {...state, count:state.count-1}
      case "callAPI":{
        //call axios API
        var resp = {data:[]};
        const apiKey = action.key;

        return {...state, apiKey:resp.data}

      }
      case "PROMPT_LOGIN":
        return {...state, showLogin:true}
      case "CLOSE_LOGIN":
        return {...state, showLogin:false}
      case ON_CHANGE:
        let data = {};
        data[action.id] = action.value;
        return {...state, ...data}
      case "USER_INFO":
        userData = {};
        userData[action.id] = action.data;
        return {...state, ...userData}
      case "REMOVE_USER":
        userData = {};
        userData[action.id] = "";
        return {...state, ...userData}
      default:
        return state;
    }
  };

  export default countReducer;