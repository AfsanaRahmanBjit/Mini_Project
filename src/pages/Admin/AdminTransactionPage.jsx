import { useGetAllTransactionHook } from "../../hooks/transaction/useGetAllTransactionHook.js";

const AdminTransactionPage = () => {
  const { transactions } = useGetAllTransactionHook();

  return (
    <div className="admin-book-page-container">
      <div className="user-table">
        <h2>Transaction List</h2>
        <table className="book-table">
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>User ID</th>
              <th>Total</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transactions) => (
                <tr key={transactions._id}>
                  <td>{transactions.cartID}</td>
                  <td>{transactions.userID}</td>
                  <td>{transactions.total}</td>
                  <td>{transactions.paymentMethod}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactionPage;
