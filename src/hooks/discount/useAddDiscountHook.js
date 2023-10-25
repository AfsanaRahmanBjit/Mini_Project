import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export function useAddDiscountHook() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.token);

  const clearError = () => {
    setError(null);
    setMessage('');
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const addDiscount = async (bookID, discountPercentage,startDate,endDate) => {
    try {
    
      const token = isAuthenticated || getToken();

      if (!token ||!userRole) {
        alert("You have to log in first.");

        return false;
      
      } else if (userRole === 2) {
        alert("User cannot add discount.");

        return false;
      } else {
        const requestData = {
         
     
          bookID:bookID,
          discountPercentage:discountPercentage,
          startDate:startDate,
          endDate:endDate,
        };

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axiosInstance.post("/discounts/add", requestData, {
          headers,
        });

        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          alert("Discount added  successfully.");
          return true;
        } else {
          alert(responseMessage);
          setMessage("Failed to add Discount.");
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

  return { message, error, addDiscount,clearError};
}
