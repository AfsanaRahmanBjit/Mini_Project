
export const validateTitle = (value) => {
    if (value.length<0 ||value.lenth>30) {
      return "Invalid Book Title";
    }
    return true;
  };
  
  export const validatePublisher = (value) => {
    if (value.length < 0 ||value.length>20) {
      return "Publisher name cannot exceed 20 characters";
    }
    return true;
  };
  export const validateAuthor= (value) => {
    if (value.length < 0 ||value.length>20) {
      return "Author name cannot exceed 20 characters";
    }
    return true;
  };

  export const validatePrice = (value) => {
    if (isNaN(value) || value <= 0) {
      return "Price must be greater than  0";
    }
    return true;
  };
 
  export const validateStock = (value) => {
    if (isNaN(value) || value <= 0) {
      return "Stock must be greater than  0";
    }
    return true;
  };
  

 

  

