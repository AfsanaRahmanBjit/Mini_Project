
export const validateName = (value) => {
    if (value.length<0 ||value.lenth>20) {
      return "Invalid Name";
    }
    return true;
  };
  export const validateEmail = (value) => {
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value)) {
      return "Invalid email address";
    }
    return true;
  };

  export const validatePhone = (value) => {
    if (!/^01\d{9}$/.test(value)) {
      return 'Phone number should start with "01" and be 11 characters long';
    }
    return true;
  };
  
 
  

 

  

