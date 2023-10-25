import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = () => {
  const userRole = useSelector((state) => state.auth.role);

  if (userRole === 1) {
    return <Outlet />;
    
  } else {
    alert("Only Admin Can Access to Admin Pannel")
    return <Navigate to="/" />;
  }
};

export default AdminGuard;
