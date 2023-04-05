import { toast } from "react-toastify";
import _ from "lodash";

export const displayErrors = function(error, showLoginModalDispatcher){
    let errors = [];
    if(!error.response){
        if(error.config.method =="post"){
            showLoginModalDispatcher();
            toast.error("Session expired.Please login to perform updates.");
        }
        return;
    }
    let errorMessage = error.response.data.errorMessage;
    let errorAttributes = error.response.data.errorAttributes;
    if(errorMessage) {
        errors.push(errorMessage);

    }

    errorAttributes && _.forEach(errorAttributes, function(value, key) {
        if(errors.indexOf(value) == -1){
            errors.push(value);
        }
            
    });
    
    let errorsString = errors.join("\r\n");
    toast.error(errorsString);

}