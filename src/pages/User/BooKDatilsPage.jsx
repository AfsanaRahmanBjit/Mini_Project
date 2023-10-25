import useGetBookByIDHook from "../../hooks/book/useGetBookByIDHook";
import BookImage from "../../assets/book1.jpg";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./BookDetailsPage.style.scss";

const BookDetailsPage = () => {
  const { book, loading, error, fetchBookData } = useGetBookByIDHook();
  const { bookId } = useParams();

  useEffect(() => {
    fetchBookData(bookId);
  }, [bookId]);

  return (
    <div>
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : error ? (
        <div className="error-message">Error: {error.message}</div>
      ) : book ? (
        <div className="book-details-container">
          <img src={BookImage} alt="Book Cover" className="book-image" />
          <div className="book-details">
            <h2>{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p>
              <strong>Price:</strong> {book.price}Tk
            </p>
            <p>
           
              <strong>Rating:</strong> {book.rating}
            </p>

            <p>
              <strong>Reviews:</strong>
            </p>
            <ul>
              {book.reviews.map((review, index) => (
                <li key={index}>{review.review}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="loading-message">Book not found.</div>
      )}
    </div>
  );
};

export default BookDetailsPage;
