import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./pagination.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/paginationSlice";

const Pagination = (Pages) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pagination.currentPage);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage == 1}
      >
        <FaChevronLeft />
      </button>
      <span>Page {currentPage}</span>
      <button
        className="pagination-button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= Pages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
