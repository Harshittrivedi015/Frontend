import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post("http://localhost:3000/api/login", formData);

      const { token, user, message } = res.data;
      console.log("res.data",res.data);

      // ✅ Save token and role
      if (token) localStorage.setItem("token", token);
      if (user?.id) localStorage.setItem("userId", user.id);
      if (user?.role) localStorage.setItem("userRole", user.role);

      // Optional: dispatch event or context update
      window.dispatchEvent(new Event('loginStatusChange'));

      // ✅ Redirect based on role
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "agent") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen mt-0 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')" }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-600">Welcome Back!</h2>
        <p className="text-gray-700 mb-4">Log in to continue your travel adventures.</p>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-700">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-gray-800 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
