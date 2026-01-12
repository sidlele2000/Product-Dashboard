import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function Roles({ children, allowedRoles }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (!allowedRoles.includes(role)) { // if roles are not user and admin
    return (
      <>
      <div style={{ padding: 20 }}>
        <h2>Unauthorized Access</h2>
        <p>You do not have permission to view this page.</p>
      </div>
      </>
    );
  }

  return children;
}

export default Roles