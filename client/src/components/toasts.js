import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


 const notification = (state,message) =>{
    console.log('notifiation props', state);
    if(state === "success"){
            toast.success(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

  }else{
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
     };
     
     return;
}

export default notification;