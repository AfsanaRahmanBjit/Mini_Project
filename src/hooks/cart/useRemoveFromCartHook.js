import { useSelector } from "react-redux";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";



export function useRemoveFromCartHook() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.token);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const removeFromCart = async (userID, bookID, quantity) => {
    try {
     
      const token = isAuthenticated || getToken();

      if (!token) {
        alert("You have to log in first.");

        return false;
      }
      if (!userRole) {
        alert("You have to log in first.");

        return false;
      } else if (userRole === 1) {
        alert("Admin cannot remove books From the cart.");

        return false;
      } else {
        const requestData = {
          userID: userID,
          bookID: bookID,
          quantity: quantity,
        };

        console.log(requestData);

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        console.log(token);
        

        const response = await axiosInstance.delete("/carts/delete",{
          headers,
          data: requestData,
        });

        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          alert("Book removed from the cart successfully.");

          return true;
        } else {
          alert(responseMessage);
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

  return { message, error, removeFromCart };
}
