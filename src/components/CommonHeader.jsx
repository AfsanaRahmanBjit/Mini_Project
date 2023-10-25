import "./header.style.scss";
import Logo from "../assets/logo.jpg";
const CommonHeader = () => {
  return (
    <>
      <div className="common-header-container">
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="book-logo-image"
            style={{ width: "75px", height: "75px", paddingLeft: "10px" }}
          />
        </div>
      </div>
    </>
  );
};

export default CommonHeader;
