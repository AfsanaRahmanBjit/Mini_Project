import { Outlet } from "react-router-dom";
import AdminLeftBar from "../../components/AdminLeftBar";
import "./AdminDashboard.style.scss"


const AdminDashboard = () => {
  return (
    <> 
      <div className="admin-dashboard-container">
        <div className="admin-left-bar-container">
          <AdminLeftBar/>
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
