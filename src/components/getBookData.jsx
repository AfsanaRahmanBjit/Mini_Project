import useGetAllBookHook from "../hooks/book/useGetAllBookHook";
import "./getBookData.style.scss";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import Cart from "./Cart";
import { useAddToCartHook } from "../hooks/cart/useAddToCartHook";
import BookImage from "../assets/book1.jpg";
import { Link } from "react-router-dom";
const GetAllBook = () => {
  const { books, searchQuery, handleSearch, totalPages } = useGetAllBookHook();
  //const dispatch = useDispatch();
  const userID = useSelector((state) => state.auth.userID);

  const { addBookToCart, cartItemCount } = useAddToCartHook();

  const handleAddToCart = (book) => {
    addBookToCart(book._id, userID, 1);
  };

  return (
    <div>
      <div className="cover">
        <h1> Welcome to Online Book Store! </h1>
      </div>
      <div className="search-bar-body-style">
        <input
          className="search-bar"
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="cart-book-container-home">
        <div className="cart-container-home">
          <Cart cartItemCount={cartItemCount} />
        </div>

        {books.length > 0 ? (
          <ul className="book-container-home">
            {books.map((book) => (
              <li key={book._id} className="book-list-home">
                <div className="book-style-home">
                  <div>
                    <center>
                      <img
                        src={BookImage}
                        alt="Book Cover"
                        className="book-image-home"
                      />
                    </center>
                  </div>
                  <div className="book-style-text-home">
                    <div className="book-info-home">
                      <div>
                        <strong>{book.title}</strong>
                      </div>
                      <div>
                        <strong>Author:</strong> {book.author}
                      </div>
                      <div>
                        <strong>Publisher:</strong> {book.publisher}
                      </div>
                      <div>
                        <strong>Price:</strong> {book.price}Tk
                      </div>
                    </div>
                  </div>
                  <center>
                    <button
                      className="add-to-cart-style"
                      onClick={() => handleAddToCart(book)}
                    >
                      Add to Cart
                    </button>
                  </center>
                  <Link to={`/book/${book._id}`}>
                    <button className="view-details-button">
                      Book Details
                    </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="loading-message">Loading...</div>
        )}
      </div>
      <Pagination Pages={totalPages} />
    </div>
  );
};

export default GetAllBook;
