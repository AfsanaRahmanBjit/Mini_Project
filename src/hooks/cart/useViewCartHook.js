import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const useViewToCartHook = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const userRole = useSelector((state) => state.auth.role);
  const userID = useSelector((state) => state.auth.userID);
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const viewBookToCart = async () => {
    try {
      const token = getToken();

      if (!token||!userRole) {
        alert("You have to login first.");
      
        return false;
      
      } else if (userRole === 1) {
        alert("Admin cannot view  cart.");
      
        return false;
      } else {
        const response = await axiosInstance.get(`/carts/get/${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          const recivedCart = response.data.data.cart;
          setCart(recivedCart);
          return true;
        }
        else{
          alert(responseMessage)
          setMessage(responseMessage);
        }
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error(error.response.data.message);
      setError(error.response.data.message);
      console.error(error);
      return false;
    }
  };

  return { message, error, viewBookToCart, cart };
};

export default useViewToCartHook;
