
import  { useState, useEffect } from "react";
import useGetAllBookHook from "../../hooks/book/useGetAllBookHook.js";
import { Link } from "react-router-dom";

import "./AdminPages.style.scss";

import Pagination from "../../components/Pagination";


const AdminDiscountPage = () => {
  const { books: initialBooks } = useGetAllBookHook(); 
 
  const [books, setBooks] = useState(initialBooks); 

 

  useEffect(() => {
    setBooks(initialBooks); 
  }, [initialBooks]);
  return (
    <>
      <div className="admin-book-page-container">
     
      <div className="table-heading-add-button">
      <div>
      <h2>Book List With Discount</h2>
      </div>
      {/* <div className="table-toolbar">
        <Link to="/admin/add-book">Add New Discount</Link>{" "}
      </div> */}
      </div>
      <table className="book-table">
        <thead>
          <tr>
            <th>BookID</th>
            <th>Title</th>
            <th>Discount Percentange</th>
            <th>Start Date</th>
            <th>End Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book._id}</td>
                <td>{book.title}</td>
                <td>
                    {book.discounts.length > 0
                      ? `${book.discounts[0].discountPercentage}%`
                      : "N/A"}
                  </td>
                  <td>{book.discounts.length > 0 ? book.discounts[0].startDate : "N/A"}</td>
                  <td>{book.discounts.length > 0 ? book.discounts[0].endDate : "N/A"}</td>
                
                {/* <td className="edit-cell">
                  <div>
                  <button   className="edit-button" >Update</button>
                  </div>
                 
                </td> */}
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
     <Pagination/>
    </div>
    </>
  );
};

export default AdminDiscountPage;
