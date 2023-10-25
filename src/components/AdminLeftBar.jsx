import { Link } from "react-router-dom";
import "./AdminLeftBar.style.scss";
import logoImage from "../assets/admin-logo.jpg"

const AdminLeftBar = () => {
  return (

    <div>
      <div className="sidebar">
        <div className="sidebar-logo-container" >
            <div>
            <img src={logoImage} alt="Admin Logo" className="sidebar-logo" />
            </div>
            <div className="sidebar-logo-text">
            Admin DashBoard
            </div>
        
        </div>
        <div>
        <ul className="sidebar-options">
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin/books">Books</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/discounts">Discounts</Link>
          </li>
          <li>
            <Link to="/admin/transactions">Transactions</Link>
          </li>
         
        </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLeftBar;
