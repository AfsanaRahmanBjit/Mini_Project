import { useEffect } from "react";
import useViewCartHook from "../../hooks/cart/useViewCartHook.js";
import { useRemoveFromCartHook } from "../../hooks/cart/useRemoveFromCartHook.js";
import { useAddToCartHook } from "../../hooks/cart/useAddToCartHook.js";
import CommonHeader from "../../components/CommonHeader.jsx";
import { useSelector } from "react-redux";
import "./CartDisplay.style.scss";
import BookImage from "../../assets/book1.jpg";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCheckoutHook } from "../../hooks/transaction/useCheckoutHook.js";
import Header from "../../components/header.jsx";

const CartDisplay = () => {
  const {viewBookToCart, cart } = useViewCartHook();
  //   const userID =useParams();
  const userID = useSelector((state) => state.auth.userID);
  const {message,error, removeFromCart } = useRemoveFromCartHook();
  const { checkoutMessage, checkoutError,checkout} = useCheckoutHook();

  
  const { addBookToCart } = useAddToCartHook();

  const handleaddToCart = (userID, bookID, quantity) => {
    addBookToCart(bookID, userID, quantity);
  };
  const handleremoveFromCart = (userID, bookID, quantity) => {
    removeFromCart(userID, bookID, quantity);
  };
  
 const handleCheckout=(userID,cartID)=>{
  checkout(userID,cartID);
 }

  useEffect(() => {
    viewBookToCart(userID);
  }, [userID,cart]);

  return (
    <div>
      <CommonHeader />
      <Header />
      <div className="whole-container">
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cart && cart.books && cart.books.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart &&
                  cart.books &&
                  cart.books.map((item) => (
                    <tr key={item.bookID._id}>
                      <td>
                        <div className="book-info">
                          <img
                            src={BookImage}
                            alt={item.bookID.title}
                            className="book-image"
                          />
                          <div className="book-details">
                            <p className="book-title">{item.bookID.title}</p>
                            <p>Author: {item.bookID.author}</p>
                            <p>Publisher: {item.bookID.publisher}</p>
                          </div>
                        </div>
                      </td>
                      <td>{item.bookID.price}Tk</td>
                      <td>
                        <div className="quantity-controls">
                          <Link to="/carts/delete">
                            <button
                              className="quantity-change-button"
                              onClick={() =>
                                handleremoveFromCart(userID, item.bookID._id, 1)
                              }
                            >
                              -
                            </button>
                          </Link>
                          <span>{item.quantity}</span>
                          <Link to="/carts/add">
                            <button
                              className="quantity-change-button"
                              onClick={() =>
                                handleaddToCart(userID, item.bookID._id, 1)
                              }
                            >
                              +{" "}
                            </button>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <Link to="/carts/delete">
                          <button
                            className="remove-button"
                            onClick={() =>
                              handleremoveFromCart(
                                userID,
                                item.bookID._id,
                                item.quantity
                              )
                            }
                          >
                            Remove from Cart
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          <div className="cart-summary">
            {cart && <p className="total-amount">Total Amount: {cart.total}</p>}
            <div>
              {cart && cart.books && cart.books.length === 0 ? (
                <div></div>
              ) : (
                <Link to="/transactions/checkout">
                  <button
                    className="checkout-button"
                    onClick={() => handleCheckout(userID, cart._id)}
                  >
                    Checkout
                  </button>
                </Link>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
