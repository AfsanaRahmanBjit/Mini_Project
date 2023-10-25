import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export const useGetAllUserHook = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Authentication token is missing.");
        return;
      }

      const response = await axiosInstance.get("/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data.result;
      setUsers(data);
    } catch (error) {
      console.log(error);
      setMessage(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    users,
    message,
  };
};
