import { ON_CHANGE, PAGELOADER } from "../utils/ActionTypes";
import _ from 'lodash'

const defaultState = {
    showPageLoader:false,
    user : {},
    todos:[],
    showLogin: false,
    userInfo:{},
    formData:{}
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
        let formData = {...state.formData};
        _.set(formData, action.data.id, action.data.value);
        return {...state, formData:{...formData}}
      case "USER_INFO":
        userData = {};
        userData[action.id] = action.data;
        return {...state, ...userData}
      case "REMOVE_USER":
        userData = {};
        userData[action.id] = "";
        return {...state, ...userData}
      case PAGELOADER:
        return {...state, showPageLoader:action.value}
      default:
        return state;
    }
  };

  export default countReducer;