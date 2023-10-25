import { useForm, Controller } from "react-hook-form";
import { useAddBookHook } from "../hooks/book/useAddBookHook";
import "./addBookForm.style.scss";
import {validateTitle,validateAuthor,validatePublisher,validatePrice,validateStock} from "../validation/BookValidation.js";

const addBookForm = () => {
  const { message,error,addBook,clearError} = useAddBookHook();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      publisher: "",
      price: "",
      stock: "",
    },
  });
  

  const onSubmit = (data) => {
    
    clearError(); 
    addBook(data)
      .then(() => {
        reset(); 
      });
  };

  return (
    <div className="add-book-container">
      <h2>Add Book Form</h2>
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
          {errors.title && <p className="error">{errors.title.message}</p>}
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
                placeholder="Enter anthor name"
                required
              />
            )}
          />
          {errors.author && <p className="error">{errors.author.message}</p>}
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
            <p className="error">{errors.publisher.message}</p>
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
          {errors.price && <p className="error">{errors.price.message}</p>}
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
          {errors.stock && <p className="error">{errors.stock.message}</p>}
        </div>
        <button type="submit">Add Book</button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </form>
      
    </div>
  );
};

export default addBookForm;
