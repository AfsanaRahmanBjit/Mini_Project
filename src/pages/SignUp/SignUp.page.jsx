import { useState } from "react";
import { Controller, useForm} from "react-hook-form";
import { useRegistrationFormHook } from "../../hooks/useRegistrationFormHook.js";
import "./SignUp.style.scss";
import { validateName,validateEmail, validatePassword,validatePhone } from "../../validation/FormValidator.js";
import CommonHeader from "../../components/CommonHeader.jsx";
import Header from "../../components/header.jsx";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate(); 
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  

  const {message,error, handleSubmitForm,clearError } = useRegistrationFormHook();

  const onSubmit = async (data) => {
     clearError();
     handleSubmitForm(data);
  }
    

  return (
    <div><CommonHeader/>
    <Header/>
    <div className="registration-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="form-group">
            Name
          </label>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ validate: validateName }}
            render={({ field }) => (
              <input
                className="registration-input"
                placeholder="Enter name"
                type="text"
                id="name"
                {...field}
                required
              />
            )}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="form-group">
            Email
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ validate: validateEmail }}
            render={({ field }) => (
              <input
                className="registration-input"
                placeholder="Enter email"
                type="text"
                id="email"
                {...field}
                required
              />
            )}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="form-group">
            Phone
          </label>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ validate: validatePhone }}
            render={({ field }) => (
              <input
                className="registration-input"
                placeholder="Enter phone number"
                type="text"
                id="phone"
                {...field}
                required
              />
            )}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="form-group">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ validate: validatePassword }}
            render={({ field }) => (
              <>
                <input
                  className="registration-input"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...field}
                  required
                />
              </>
            )}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="form-group">
            Confirm Password
          </label>
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
            render={({ field }) => (
              <>
                <input
                  className="registration-input"
                  placeholder="Enter confirm password"
                  type={showPassword ? "text" : "password"} 
                  id="confirmPassword"
                  {...field}
                  required
                />
                <label className="show-password-label-sign-up">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)} 
                  />
                  Show Password
                </label>
              </>
            )}
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="registration-button">
          Sign Up
        </button>
        {message && <p className="error">{message}</p>}

       {error && <p className="error">{error}</p>}
      </form>
    </div>
    </div>
  );
};

export default SignUp;
