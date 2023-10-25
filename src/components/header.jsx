import { Link } from "react-router-dom";
import LogInButton from "./logInButton";
import SignUpButton from "./SignUpButton";
import "./header.style.scss";

const Header = () => {
  return (
    <>
      <div className="header-style">
        <div className="Online-Book-Store-style">
          <h3>ONLINE BOOK STORE</h3>
        </div>
        <div className="nav-links">
          <Link className="text-style" to="/">
            Home
          </Link>
          <Link className="text-style" to="/admin">
            Admin Panel
          </Link>
          <Link className="text-style" to="/balance">
            Balance
          </Link>
          <Link to="/login">
            <LogInButton />
          </Link>
          <Link to="/signup">
            <SignUpButton />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
