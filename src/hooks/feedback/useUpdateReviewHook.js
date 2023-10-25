import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export function useUpdateReviewHook() {
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

  const updateFeedBack = async (userID, bookID, rating,review) => {
    try {
      
      const token = isAuthenticated || getToken();

      if (!token||!userRole) {
        alert("You have to log in first.");

        return false;
      
      } else if (userRole === 1) {
        alert("Admin cannot add books to the cart.");

        return false;
      } else {
        const requestData = {
         
          userID:userID,
          bookID:bookID,
          rating:rating,
          review:review,
        };
        console.log(requestData);
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axiosInstance.put("/feedbacks/update", requestData, {
          headers,
        });

        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          alert("FeedBack updated  successfully.");
          return true;
        } else {
          setMessage(responseMessage);
          return false;
        }
      }
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
     

      return false;
    }
  };

  return { message, error, updateFeedBack,clearError };
}
