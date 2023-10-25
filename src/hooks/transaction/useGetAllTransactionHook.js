import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
export const useGetAllTransactionHook = () => {
  const [transactions, setTransactions] = useState([]);
  const userRole = useSelector((state) => state.auth.role);
  const isAuthenticated = useSelector((state) => state.auth.token);

  const fetchTransactionData = async () => {
    try {
      const token = isAuthenticated||localStorage.getItem("token");

      if (!token ||!userRole) {
        alert("You have to login first.");

        return false;
      
      } else if (userRole === 2) {
        alert("User cannot see transactions.");

        return false;
      } else {

      const response = await axiosInstance.get("/transactions/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
       const data = response.data;
       const responseMessage=data.message
      if (data.success) {
    
       
        const dataTransaction = response.data.data.transactions;
        setTransactions(dataTransaction);
        return true;
      } else {
        alert(responseMessage);
      
        return false;
      }
    }} catch (error) {
      console.error(error.response.data.message);
      alert(error.response.data.message);
      return false;
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  return {
    transactions,
    fetchTransactionData,
  
  };
};
