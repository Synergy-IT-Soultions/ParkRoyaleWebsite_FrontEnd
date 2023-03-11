import { CALL_API } from "./ActionTypes";
import axios from 'axios';

const client = axios.create({
    baseURL: "http://10.10.10.32/ContentManagement" 
});

function postCall(action, state){

    axios.get(action.url)
            //.then(response => console.log(response))
            .then(response => this.setState({ images: response.data.images }))
            .catch(error => console.log(error));


}

export const authenticate = async ()=> {

    const user = await client.post("/user/authenticate", {}, { auth:{
        username:"",
        password:""
    }});

    return user;

}



