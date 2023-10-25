import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useUpdateReviewHook } from "../hooks/feedback/useUpdateReviewHook";
import {
  validateRating,
  validateReview
} from "../validation/FeedBackValidator";
import "./UpdateFeedbackForm.style.scss";
const UpdateFeedbackForm = () => {
  const { bookId } = useParams();
  const { message, error, updateFeedBack, clearError } = useUpdateReviewHook();
  const userID = useSelector((state) => state.auth.userID);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    updateFeedBack(userID, bookId, data.rating, data.review);
    clearError();
  };

  return (
    <div>
      <div className="update-feedback-container">
        <h2>Update Feedback Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="rating">Rating:</label>
            <Controller
              name="rating"
              control={control}
              defaultValue=""
              rules={{ validate: validateRating }}
              render={({ field }) => (
                <input type="number" id="rating" {...field} />
              )}
            />
            {errors.rating && <p className="error">Rating is required</p>}
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <Controller
              name="review"
              control={control}
              defaultValue=""
              rules={{ validate: validateReview }}
              render={({ field }) => (
                <input type="text" id="review" {...field} />
              )}
            />
            {errors.review && <p className="error">Review is required</p>}
          </div>
          <button type="submit">Update Feedback</button>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default UpdateFeedbackForm;
