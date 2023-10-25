import  { useState, useEffect } from "react";
import { useGetAllUserHook } from "../../hooks/user/useGetAllUserHook.js"; 
import useDeleteUserHook from "../../hooks/user/usedeleteUserHook.js";
import { Link } from "react-router-dom";
import "./AdminPages.style.scss";

const AdminUserPage = () => {
  const { users:initialUsers} = useGetAllUserHook(); 
  const { deleteUser } = useDeleteUserHook();
  const [users, setUsers] = useState(initialUsers); 

   const handleDeleteUsers = async (userId) => {
   const success = await deleteUser(userId);

     if (success) {
       setUsers((prevBooks) => prevBooks.filter((user) => user._id !== userId));
     }
   };

  useEffect(() => {
    setUsers(initialUsers); 
  }, [initialUsers]);
 
  return (
    <div className="admin-book-page-container">
      <div className="user-table">
        <h2>User List</h2>
      
        <table className="book-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length>0?(users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td className="edit-delete-cell">
                  <div>             
                    <Link to={`/admin/user.update/${user._id}`}>
                  <button   className="edit-button">Update</button></Link>
                  </div>|
                  <div>
                  <button   className="delete-button" onClick={() => handleDeleteUsers(user._id)}>Delete</button>  
                  </div>
                </td>
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

export default AdminUserPage;
