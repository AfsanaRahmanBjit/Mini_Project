import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const useGetBookByIDHook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const fetchBookData = async (bookID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/books/get/${bookID}`);
      const data = response.data;
      if(data.success){
        const receivedBook = response.data.data;
        setBook(receivedBook);
      }
      else{
        setMessage(data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    book,
    loading,
    message,
    error,
    fetchBookData,
  };
};

export default useGetBookByIDHook;
