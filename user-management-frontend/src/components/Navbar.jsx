import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import apiClient from "../api/api";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");

      dispatch(logout());

      toast.success("Logout successful", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#1F2937",
          color: "#ffffff",
        },
      });

      navigate("/login/admin");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Please try again.", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#B91C1C",
          color: "#ffffff",
        },
      });
    }
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center h-18">
      <h1 className="font-bold text-lg">User Management</h1>
      <div className="space-x-4">
        {authUser && <Link to="/">Home</Link>}
        {!authUser && <Link to="/register/customer">Customer Register</Link>}
        {!authUser && <Link to="/register/admin">Admin Register</Link>}
        {!authUser && <Link to="/login/admin">Admin Login</Link>}

        {authUser && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
