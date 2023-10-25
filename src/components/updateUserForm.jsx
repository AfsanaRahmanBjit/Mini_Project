
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useUpdateUserHook } from "../hooks/user/useUpdateUserHook";
import "./updateUserForm.style.scss";
import { useForm, Controller } from "react-hook-form";

import {
  validateName,
  validateEmail,
  validatePhone,
} from "../validation/UserValidation.js";

const UpdateUserForm = () => {
  const { userId } = useParams();
  const { message, error, updateUser, clearError } = useUpdateUserHook();
  
  const { handleSubmit,register, control, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: 2,
    },
  });

  const onSubmit = (data) => {
    
    updateUser(userId, data);
    clearError();
  };

  return (
    <div className="update-user-container">
      <h2>Update User Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name:</label>
          <Controller
            name="name"
            control={control}
            rules={{ validate: validateName }}
            render={({ field }) => (
              <input
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
          <label htmlFor="email" className="email-style">Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{ validate: validateEmail }}
            render={({ field }) => (
              <input
                type="email"
                id="email"
                {...field}
                required
              />
            )}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <Controller
            name="phone"
            control={control}
            rules={{ validate: validatePhone }}
            render={({ field }) => (
              <input
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
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            {...register("role")}
            required
          >
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
        </div>
        <button type="submit">Update User</button>
        {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      </form>
    
    </div>
  );
};

export default UpdateUserForm;


