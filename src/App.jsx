import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import AdminGuard from "./components/AdminGurd.jsx";
import UserGuard from "./components/UserGurd.jsx";

import HomePage from "./pages/Home/HomePage.jsx";
import SignUpPage from "./pages/SignUp/SignUp.page.jsx";
import LoginForm from "./pages/LogIn/logIn.page.jsx";
import BalanceUpdateForm from "./pages/User/BalanceUpdateForm.jsx";

import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminBookPage from "./pages/Admin/AdminBookPage.jsx";
import AdminUserPage from "./pages/Admin/AdminUserPage.jsx";
import AdminTransactionPage from "./pages/Admin/AdminTransactionPage.jsx";
import AdminDiscountPage from "./pages/Admin/AdminDiscountPage.jsx";

import AddBook from "./components/addBookForm.jsx";
import UpdateBookData from "./components/updateBookForm.jsx";
import UpdateUserForm from "./components/updateUserForm.jsx";

import CartDisplay from "./pages/User/CartDisplay.jsx";
import BooKDatilsPage from "./pages/User/BooKDatilsPage.jsx";
import UserDashboard from "./pages/User/UserDashBoard.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import AddFeedBackForm from "./components/AddFeedBackForm.jsx";
import UpdateFeedbackForm from "./components/UpdateFeedbackForm";
import RemoveRatingForm from "./components/RemoveRatingForm";
import RemoveReviewForm from "./components/RemoveReviewForm";

const App = () => {
  console.log("Rendering from App.jsx File");

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/book/:bookId" element={<UserDashboard />}>
            <Route path="/book/:bookId" element={<BooKDatilsPage />} />
            <Route element={<UserGuard />}>
              <Route
                path="/book/:bookId/givefeedback"
                element={<AddFeedBackForm />}
              />
              <Route
                path="/book/:bookId/updatefeedback"
                element={<UpdateFeedbackForm />}
              />
              <Route
                path="/book/:bookId/rating/remove"
                element={<RemoveRatingForm />}
              />
              <Route
                path="/book/:bookId/review/remove"
                element={<RemoveReviewForm />}
              />
            </Route>
          </Route>

          <Route element={<AdminGuard />}>
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="/admin" element={<AdminBookPage />} />
              <Route path="/admin/books" element={<AdminBookPage />} />
              <Route path="/admin/users" element={<AdminUserPage />} />
              <Route path="/admin/discounts" element={<AdminDiscountPage />} />
              <Route
                path="/admin/transactions"
                element={<AdminTransactionPage />}
              />
              <Route path="/admin/book/add" element={<AddBook />} />
              <Route
                path="/admin/book/update/:bookId"
                element={<UpdateBookData />}
              />
              <Route
                path="/admin/user.update/:userId"
                element={<UpdateUserForm />}
              />
            </Route>
          </Route>

          <Route element={<UserGuard />}>
            <Route path="/carts/get/:userID" element={<CartDisplay />} />
            <Route path="/carts/delete" element={<CartDisplay />} />
            <Route path="/carts/add" element={<CartDisplay />} />
            <Route path="transactions/checkout" element={<CartDisplay />} />
            <Route path="/balance" element={<BalanceUpdateForm />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
