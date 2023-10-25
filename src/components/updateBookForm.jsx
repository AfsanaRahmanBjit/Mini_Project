import { useForm, Controller } from "react-hook-form";
import { useUpdateBookHook } from "../hooks/book/useUpdateBookHook";
import { useParams } from "react-router-dom";
import "./updateBookForm.style.scss";
import {
  validateTitle,
  validateAuthor,
  validatePublisher,
  validatePrice,
  validateStock,
} from "../validation/BookValidation.js";

const UpdateBookForm = () => {
  const { message, error, updateBook, clearError } = useUpdateBookHook();
  const { bookId } = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange", defaultValues: {
      title: "",
      author: "",
      publisher: "",
      price: "",
      stock: "",
    },
  });

  const onSubmit = (data) => {
    clearError();
    updateBook(bookId, data);
  };

  return (
    <div className="update-book-container">
      <h2>Update Book Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title:</label>
          <Controller
            name="title"
            control={control}
            rules={{ validate: validateTitle }}
            render={({ field }) => (
              <input
                type="text"
                id="title"
                placeholder="Enter book name"
                {...field}
                required
              />
            )}
          />
          {errors.title && (
            <p className="error">Title: {errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <Controller
            name="author"
            control={control}
            rules={{ validate: validateAuthor }}
            render={({ field }) => (
              <input
                type="text"
                id="author"
                {...field}
                placeholder="Enter author name"
                required
              />
            )}
          />
          {errors.author && (
            <p className="error">Author: {errors.author.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="publisher">Publisher:</label>
          <Controller
            name="publisher"
            control={control}
            rules={{ validate: validatePublisher }}
            render={({ field }) => (
              <input
                type="text"
                id="publisher"
                {...field}
                placeholder="Enter publisher name"
                required
              />
            )}
          />
          {errors.publisher && (
            <p className="error">Publisher: {errors.publisher.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <Controller
            name="price"
            control={control}
            rules={{ validate: validatePrice }}
            render={({ field }) => (
              <input type="number" id="price" {...field} required />
            )}
          />
          {errors.price && <p className="error">Price: {errors.price.message}</p>}
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <Controller
            name="stock"
            control={control}
            rules={{ validate: validateStock }}
            render={({ field }) => (
              <input type="number" id="stock" {...field} required />
            )}
          />
          {errors.stock && <p className="error">Stock: {errors.stock.message}</p>}
        </div>
        <button type="submit">Update Book</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default UpdateBookForm;
