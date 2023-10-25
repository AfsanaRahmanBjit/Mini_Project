import { useState } from "react";
import { useUpdateUserHook } from "../../hooks/user/useBalanceUserHook";
import CommonHeader from "../../components/CommonHeader";
import Header from "../../components/header";
import { useSelector } from "react-redux";
import "./balanceForm.style.scss"

const BalanceUpdateForm = () => {
  const { message, error, updateUserBalance,clearError } = useUpdateUserHook();
  const userID = useSelector((state) => state.auth.userID);
  const [balance, setBalance] = useState(0);
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "balance") {
      const numericValue = parseFloat(value);

      if (!isNaN(numericValue) && numericValue !== 0) {
        setBalance(numericValue);
        setFormError("");
      } else {
        setBalance(0);
        setFormError("Please enter a valid non-zero number for balance.");
      }
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUserBalance(userID, balance);
    clearError();
    setBalance(0);
  };

  return (
    <div>
      <CommonHeader/>

    <Header/>
      <div className="balance-container">
        <h2>Update Balance Form</h2>
        <form onSubmit={handleUpdateUser}>
          <div>
            <label htmlFor="balance">Balance:</label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={balance}
              onChange={handleChange}
            />
          </div>
          {formError && <p className="error-message">{formError}</p>}
          <button type="submit">Update Balance</button>
          {message && <p className="error-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default BalanceUpdateForm;
