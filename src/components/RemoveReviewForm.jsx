import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRemoveReviewHook } from "../hooks/feedback/useRemoveReviewHook.js";
import "./RemoveReviewRatingForm.style.scss";
const RemoveReviewForm = () => {
  const { bookId } = useParams();
  const { message, error, removeReview, clearError } = useRemoveReviewHook();
  const userID = useSelector((state) => state.auth.userID);

  const onSubmit = (e) => {
    e.preventDefault();
    removeReview(userID, bookId);
    clearError();
  };

  return (
    <div>
      <div className="remove-container">
        <h2>Remove Rating Form</h2>
        <h3>Do you really want to remove Your Review?</h3>
        <form onSubmit={onSubmit}>
          <button type="submit">Remove Review</button>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RemoveReviewForm;
