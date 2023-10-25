import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export function useAddBookHook() {
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
  const addBook = async (book) => {
    try {
      const token = isAuthenticated || getToken();

      if (!token || !userRole) {
        alert("You have to login first.");
      } 
      else if (userRole === 2) {
        alert("User cannot add books.");

        return false;
      } else {
        const response = await axiosInstance.post("/books/add", book, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        const data = response.data;
        const responseMessage = data.message;
        console.log(responseMessage);
        if (data.success) {
          alert("Book added successfully.");
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

  return { message, error, addBook, clearError };
}
