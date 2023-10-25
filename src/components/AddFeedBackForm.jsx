import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useAddFeedBackHook } from "../hooks/feedback/useAddFeedBackHook.js";
import "./AddFeedbackForm.style.scss";
import {
  validateRating,
  validateReview
} from "../validation/FeedBackValidator.js";

const AddFeedbackForm = () => {
  const { bookId } = useParams();
  console.log(bookId);
  const { message, error, FeedBack, clearError } = useAddFeedBackHook();
  const userID = useSelector((state) => state.auth.userID);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      rating: 0,
      review: ""
    }
  });

  const onSubmit = (data) => {
    FeedBack(userID, bookId, data.rating, data.review);
    clearError();
  };

  return (
    <div>
      <div className="add-feedback-container">
        <h2>Add Feedback Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="rating">Rating:</label>
            <Controller
              name="rating"
              control={control}
              defaultValue=""
              rules={{ validate: validateRating }}
              render={({ field }) => (
                <input type="number" id="rating" {...field} required />
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
                <input type="text" id="review" {...field} required />
              )}
            />
            {errors.review && <p className="error">Review is required</p>}
          </div>
          <button type="submit">Add Feedback</button>
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddFeedbackForm;
