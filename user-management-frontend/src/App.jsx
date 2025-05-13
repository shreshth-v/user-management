import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CustomerRegisterPage from "./pages/CustomerRegisterPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-100">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            padding: "16px",
            fontSize: "16px",
            backgroundColor: "#1F2937",
            color: "#ffffff",
          },
        }}
        containerStyle={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <Router>
        <Navbar />
        <div className="h-full">
          <Routes>
            <Route
              path="/"
              element={
                authUser ? <Home /> : <Navigate to="/register/customer" />
              }
            />
            <Route
              path="/register/customer"
              element={
                !authUser ? <CustomerRegisterPage /> : <Navigate to="/" />
              }
            />
            <Route
              path="/register/admin"
              element={!authUser ? <AdminRegisterPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login/admin"
              element={!authUser ? <AdminLoginPage /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
