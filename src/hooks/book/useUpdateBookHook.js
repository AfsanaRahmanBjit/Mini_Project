import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export function useUpdateBookHook() {
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
  const updateBook = async (bookId, updatedBook) => {
    try {
      const token = isAuthenticated||getToken();

      if (!token ||!userRole) {
        alert("You have to login first.");
        return false;
      }
      else if(userRole===2){
        alert("User can not update Book.");
        return false;
      }
      else{
      const response = await axiosInstance.put(
        `/books/update/${bookId}`,
        updatedBook,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

       const data = response.data;
       const responseMessage = data.message;
      if (data.success) {
        alert("Book updated successfully.");
        return true;
      } else {
        setMessage(responseMessage);
        console.log(response.data);
        return false;
      }
    }} catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
      return false;
    }
  };

  return { message, error, updateBook,clearError };
}
