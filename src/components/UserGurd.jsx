
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom';

const UserGuard = () => {
  const userRole = useSelector(state => state.auth.role);

  if (userRole === 2) {
    return <Outlet/>;
  } else {
    alert("Please login first.")
    return <Navigate to="/" />; 
  }
};

export default UserGuard;
