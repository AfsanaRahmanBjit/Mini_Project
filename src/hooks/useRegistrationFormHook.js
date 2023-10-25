import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";


export const useRegistrationFormHook = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
    setMessage('');
  };

  const handleSubmitForm = async (userData) => {
    try {
      const response = await axiosInstance.post("/auths/sign-up", userData);
      const data=response.data;
      const responseMessage=response.data.message;
      if(data.success){
      alert("Registration done succesfully!");
      return response.data.success;
      }
      else{
        
        setMessage(responseMessage);
      }
      
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      }
      return false;
    }
  };

  return {
    handleSubmitForm,
    message,
    error,
    clearError,
  };
};
