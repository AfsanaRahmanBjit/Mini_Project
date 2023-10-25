import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const useDeleteBookHook = () => {
  const userRole = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.token);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const deleteBook = async (bookId) => {
    try {
      const token = isAuthenticated || getToken();

      if (!token || !userRole) {
        alert("You have to login first.");
        return false;
      } else if (userRole === 2) {
        alert("User can not delete Book.");
        return false;
      } else {
        const response = await axiosInstance.delete(`/books/delete/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        const responseMessage = data.message;
        if (data.success) {
          alert("Book deleted successfully.");

          return true;
        } else {
          alert(responseMessage);
          return false;
        }
      }
    } catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
      return false;
    }
  };

  return { deleteBook };
};

export default useDeleteBookHook;
