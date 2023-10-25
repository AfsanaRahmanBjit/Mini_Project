import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const useGetAllBookHook = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = useSelector((state) => state.pagination.currentPage);

  let timeoutId;

  const fetchBookData = (query) => {
    let url = `/books/all?page=${currentPage}`;

    if (query) {
      url += `&search=${query}`;
    }

    axiosInstance
      .get(url)
      .then((response) => {
        const data = response.data.data.Result;
        setBooks(data);
        const total = response.data.data.TotalPages;
        setTotalPages(total);
        setMessage(response.data.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  useEffect(() => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fetchBookData(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return {
    books,
    searchQuery,
    handleSearch,
    totalPages,
    message,
    error,
  };
};

export default useGetAllBookHook;
