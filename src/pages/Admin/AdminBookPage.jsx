import { useState, useEffect } from "react";
import useGetAllBookHook from "../../hooks/book/useGetAllBookHook";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import "./AdminPages.style.scss";
import useDeleteBookHook from "../../hooks/book/useDeleteBookHook";

const AdminBookPage = () => {
  const { books: initialBooks } = useGetAllBookHook();
  const { deleteBook } = useDeleteBookHook();
  const [books, setBooks] = useState(initialBooks);

  const handleDeleteBook = async (bookId) => {
    const success = await deleteBook(bookId);

    if (success) {
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    }
  };

  useEffect(() => {
    setBooks(initialBooks);
  }, [initialBooks]);
  return (
    <>
      <div className="admin-book-page-container">
        <div className="table-heading-add-button">
          <div>
            <h2>Book List</h2>
          </div>
          <div className="table-toolbar">
            <Link to="/admin/book/add">Add New Book</Link>{" "}
          </div>
        </div>
        <table className="book-table">
          <thead>
            <tr>
              <th>BookID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publisher}</td>
                  <td>{book.price}Tk</td>
                  <td>{book.stock}</td>
                  <td className="edit-delete-cell">
                    <div>
                      <Link
                        className="edit-button"
                        to={`/admin/book/update/${book._id}`}
                      >
                        Update
                      </Link>
                    </div>
                    <div>|</div>
                    <div>
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination />
      </div>
    </>
  );
};

export default AdminBookPage;
