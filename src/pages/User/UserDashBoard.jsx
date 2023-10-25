import { Outlet } from "react-router-dom";
import BookDetailsLeftBar from "../../components/BookDetailsLeftBar";
import "./UserDashboard.style.scss"


const UserDashboard = () => {
  return (
    <> 
      <div className="user-dashboard-container">
        <div className="user-left-bar-container">
          <BookDetailsLeftBar />
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
