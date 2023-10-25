import { Link } from "react-router-dom";
import "./BooKDetailsLeftBar.style.scss";
import logoImage from "../assets/book-details-logo.jpg";
import { useParams } from "react-router-dom";
const BookDetailsLeftBar = () => {
  const {bookId}=useParams();
  return (

    <div>
      <div className="sidebar">
        <div className="sidebar-logo-container" >
            <div>
            <img src={logoImage} alt="Admin Logo" className="sidebar-logo" />
            </div>
            <div className="sidebar-logo-text">
           Book Details
            </div>
        
        </div>
        <div>
        <ul className="sidebar-options">
        <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/book/${bookId}`}>Book Details</Link>
          </li>
          <li>
            <Link to={`/book/${bookId}/givefeedback`}>Give FeedBack</Link>
          </li>
          <li>
            <Link to={`/book/${bookId}/updatefeedback`}>Update FeedBack</Link>
          </li>
          <li>
            <Link to={`/book/${bookId}/rating/remove`}>Remove Rating</Link>
          </li>
          <li>
            <Link to={`/book/${bookId}/review/remove`}>Remove Review</Link>
          </li>
         
        </ul>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsLeftBar;
