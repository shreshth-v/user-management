import { useState } from "react";
import apiClient from "../api/api";
import toast from "react-hot-toast";

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/auth/register", {
        ...formData,
        role: "customer",
      });

      toast.success("Registration successful. Check email for verification.", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#1F2937",
          color: "#ffffff",
        },
      });

      setFormData({ firstName: "", lastName: "", email: "", password: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed", {
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
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Customer Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default CustomerRegister;
