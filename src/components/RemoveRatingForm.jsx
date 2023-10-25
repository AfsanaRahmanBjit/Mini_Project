import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useRemoveRatingHook } from "../hooks/feedback/useRemoveRatingHook.js";
import "./RemoveReviewRatingForm.style.scss";
const RemoveRatingForm = () => {
  const { bookId } = useParams();
  const { message, error, removeRating, clearError } = useRemoveRatingHook();
  const userID = useSelector((state) => state.auth.userID);

  const onSubmit = (e) => {
    e.preventDefault();
    removeRating(userID, bookId);
    clearError();
  };

  return (
    <div>
      <div className="remove-container">
        <h2>Remove Rating Form</h2>
        <h3>Do you really want to remove Your Rating?</h3>
        <form onSubmit={onSubmit}>
          <button type="submit">Remove Rating</button>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RemoveRatingForm;
