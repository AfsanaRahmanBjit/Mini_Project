export const validateEmail = (value) => {
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(value)) {
    return "Invalid email address";
  }
  return true;
};

export const validatePassword = (value) => {
  if (value.length < 8) {
    return "Password should be at least 8 characters long";
  }

  if (!/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])/.test(value)) {
    return "Password should contain at least one number, one uppercase letter, one lowercase letter, and one special character";
  }
  return true;
};

export const validateName = (value) => {
  if (value.length < 4 || value.length > 30) {
    return "Name should be between 4 and 30 characters";
  }
  return true;
};

export const validatePhone = (value) => {
  if (!/^01\d{9}$/.test(value)) {
    return 'Phone number should start with "01" and be 11 characters long';
  }
  return true;
};
