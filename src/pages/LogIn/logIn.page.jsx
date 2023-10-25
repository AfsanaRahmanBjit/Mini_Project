import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {validateEmail,validatePassword} from "../../validation/FormValidator.js";
import { setToken, setRole, setUserID, setError, clearError,} from "../../redux/auth";
import axiosInstance from "../../utils/axiosInstance";
import "./Login.style.scss";
import CommonHeader from "../../components/CommonHeader.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header.jsx";


const Login = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(clearError());
      const response = await axiosInstance.post(
        "http://127.0.0.1:8000/api/v1/auths/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.success) {
        const { token, role, userID } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        console.log(userID._id);
        dispatch(setToken(token));
        dispatch(setRole(role));
        dispatch(setUserID(userID._id));
        dispatch(clearError());
        console.log("Token:", token);
        console.log("Role:", role);
        console.log("Login successful!");
        alert("Login successful!");
        if (role === 1) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        dispatch(setError(response.data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data.message));
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <CommonHeader />
      <Header />
      <div className="registration-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <label className="show-password-label">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
        
          <button type="submit" className="login-button">
            Login
          </button>
        
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default Login;
