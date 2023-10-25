import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
export function useUpdateUserHook() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const clearError = () => {
    setError(null);
    setMessage('');
  };
  const userRole = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.token);
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const updateUserBalance = async (userID, balance) => {
    try {
      const token =isAuthenticated || getToken();

      if (!token || !userRole) {
        alert("You have to log in first.");
        return false;
      } else if (userRole === 1) {
        alert("Admin cannot update balance.");
        return false;
      } else {


        const requestData = {
            
            
             balance: balance,
           
          };

        const response = await axiosInstance.put(
          `/users/update/balance/${userID}`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        const responseMessage=data.message;
        if (data.success) {
          alert("Balance updated successfully.");
          return true;
        } else {
            setMessage(responseMessage);
       
        return false;
        }
      }
    } catch (error) {
        console.error(error);
        console.error(error.response.data.message);

        setError(error.response.data.message);
      
        return false;
    }
  };

  return { message, error,updateUserBalance,clearError };
}
