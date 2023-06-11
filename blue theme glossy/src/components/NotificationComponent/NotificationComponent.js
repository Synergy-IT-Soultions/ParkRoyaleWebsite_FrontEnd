import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//https://www.npmjs.com/package/react-toastify

class NotificationComponent extends React.Component {
    
    render() { 
        return ( 
        <ToastContainer
            position="top-right"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            /> 
        );
    }
}
 
export default NotificationComponent;