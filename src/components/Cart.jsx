import { Link } from "react-router-dom"; // Import the Link component
import "./cart.style.scss";
import { useSelector } from "react-redux";


const Cart = ({ cartItemCount }) => {
  const userID = useSelector((state) => state.auth.userID);

  return (
    <Link to={`/carts/get/${userID}`} style={{ textDecoration: "none" }}>
      <div className="text-style-cart">
        Cart
        {cartItemCount > 0 && (
          <span className="counter-style">{cartItemCount}</span>
        )}
      </div>
    </Link>
  );
};

export default Cart;
