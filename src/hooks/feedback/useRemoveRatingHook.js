import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import axios from "axios";

export function useRemoveRatingHook() {
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

  const removeRating = async (userID, bookID) => {
    try {
      console.log(userID);
      const token = isAuthenticated || getToken();

      if (!token||!userRole) {
        alert("You have to log in first.");

        return false;
      } else if (userRole === 1) {
        alert("Admin cannot remove rating of any book.");

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

        const response = await axiosInstance.delete("/feedbacks/delete/rating", {
          headers,
          data: requestData,
        });
        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          alert("Rating removed successfully.");
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

  return { message, error, removeRating,clearError };
}
