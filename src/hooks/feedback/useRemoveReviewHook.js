import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import axios from "axios";

export function useRemoveReviewHook() {
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

  const removeReview = async (userID, bookID) => {
    try {
      console.log(userID);
      console.log(bookID);
      const token = isAuthenticated || getToken();

      if (!token||!userRole) {
        alert("You have to log in first.");

        return false;
      
      } else if (userRole === 1) {
        alert("Admin cannot remove review.");

        return false;
      } else {
        const requestData = {
         
          userID:userID,
          bookID:bookID,
         
        };

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axiosInstance.delete("/feedbacks/delete/review",{
          headers,
          data: requestData,
        });

        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          alert("Review removed  successfully.");
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

  return { message, error, removeReview,clearError};
}
