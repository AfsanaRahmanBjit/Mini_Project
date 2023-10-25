import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
export function useUpdateUserHook() {
  const [message, setMessage] = useState("");
  const [error,setError]=useState(null);
  const userRole = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.token);
  const clearError = () => {
    setError(null);
    setMessage('');
  };
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const updateUser = async (userId, updatedUser) => {
    try {
      const token = isAuthenticated||getToken();

      if (!token||!userRole) {
        alert("Please login first.");
        return;
      }
      else if(userRole===2){
       alert("User can not update user data.")
      }
      else{
      const response = await axiosInstance.patch(
        `/users/update/${userId}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      const responseMessage=data.message;

      if (data.success) {
        alert("User data updated successfully.");
      } else {
        setMessage(responseMessage);
      }
    }} catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return { message,error, updateUser,clearError };
}
