export const validateReview = (value) => {
    if (value.length < 4 || value.length > 30) {
      return "Review should be between 4 and 30 characters";
    }
    return true;
  };

  export const validateRating = (value) => {
    if (value<1 ||value>5) {
      return "Rating value should be between 1 to 5";
    }
    return true;
  };

