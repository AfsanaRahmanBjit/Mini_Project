import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export function useAddToCartHook() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.token);
  const [cartItemCount, setcartItemCount] = useState(0);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const addBookToCart = async (bookID, userID, quantity) => {
    try {
      console.log(userID);
      const token = isAuthenticated || getToken();

      if (!token ||!userRole) {
        alert("You have to log in first.");

        return false;
      
      } else if (userRole === 1) {
        alert("Admin cannot add books to the cart.");

        return false;
      } else {
        const requestData = {
          bookID:bookID,
          userID:userID,
          quantity:quantity,
        };

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axiosInstance.post("/carts/add", requestData, {
          headers,
        });

        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          alert("Book added to the cart successfully.");

          setcartItemCount((prevcartItemCount) => prevcartItemCount + 1);
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

  return { message, error, addBookToCart, cartItemCount };
}
