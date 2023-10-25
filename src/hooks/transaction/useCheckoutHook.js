import { useSelector } from "react-redux";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
export function useCheckoutHook() {
  const [checkoutMessage, setMessage] = useState("");
  const [checkoutError, setError] = useState(null);
  const userRole = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.token);
  //const userID = useSelector((state) => state.auth.userID);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const checkout = async (userID,cartID) => {
    try {
      console.log(userID);
      console.log(cartID);
      const token = isAuthenticated || getToken();

      if (!token||!userRole) {
        alert("You have to log in first.");

        return false;
      }
       else if (userRole === 1) {
        alert("Admin cannot do checkout.");

        return false;
      } else {
        const requestData = {
          userID: userID,
          cartID: cartID,
         
        };

        console.log(requestData);
        

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
       

        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/transactions/checkout",
           requestData,
            {headers},
           
          
        );

        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          alert("Checkout done successfully.");

          return true;
        } else {
          
          setMessage(responseMessage);
          return false;
        }
      }
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
      console.error(error);
      return false;
    }
  };

  return { checkoutMessage, checkoutError, checkout };
}
