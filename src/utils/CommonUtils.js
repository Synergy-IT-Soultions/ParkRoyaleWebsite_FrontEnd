import { toast } from "react-toastify";
import _ from "lodash";

export const displayErrors = function(error){
    let errors = [];
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