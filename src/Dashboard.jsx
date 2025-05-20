import React, { useEffect, useState } from "react";
import { Home, CalendarCheck2, User, LogOut, Package } from "lucide-react";
import CustomerReviews from "./CustomerReviews";
import ManageBooking from "./ManageBooking";
import axios from "axios";
import Profile from "./Profile";
import Packages from "./Packages";
import ManageUsers from "./ManageUsers";

function Dashboard() {
  const [activePage, setActivePage] = useState("home");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    mobile: "",
    activeBookings: 0,
    tripsCompleted: 0,
    totalSpent: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentActivity: [],
  });

  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("userRole"); // 'user' or 'admin'

  useEffect(() => {
    const fetchDataForUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/dashboard`);
        setFormData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load user data. Please try again.");
      }
    };

    const fetchDataForAdmin = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard`);
        setFormData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load user data. Please try again.");
      }
    };

    if(role == 'user'){
      fetchDataForUser();
    } else {
       fetchDataForAdmin()
    }

  }, [userId]);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, null, {
        withCredentials: false,
      });
      localStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "profile":
        return <Profile userId={userId} />;

      case "packages":
        return <Packages />;

      case "bookings":
        return <ManageBooking />;

      case "reviews":
        return role === "user" ? <CustomerReviews /> : null;
      case "users":
         return role !== "user" ? <ManageUsers /> : null;

      default:
        return role === "user" ? (
          <div className="space-y-10">
            <section className="text-center">
              <h2 className="text-3xl font-semibold text-gray-800">
                Welcome back, {formData.username || "Traveler"}! 👋
              </h2>
              <p className="text-gray-600 mt-2">
                Here's a quick overview of your recent travel activity.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-blue-700">{formData.activeBookings}</h3>
                <p className="text-gray-600 mt-1">Active Bookings</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-green-600">{formData.tripsCompleted}</h3>
                <p className="text-gray-600 mt-1">Trips Completed</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-yellow-500">₹{formData.totalSpent}</h3>
                <p className="text-gray-600 mt-1">
                  Total Spent by {formData.username}
                </p>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {formData.username}'s Recent Activity
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                {formData.recentActivity?.length > 0 ? (
                  formData.recentActivity.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))
                ) : (
                  <li>No recent activity available.</li>
                )}
              </ul>
            </section>

            <section className="flex justify-center">
              <button
                onClick={() => (window.location.href = "/packages")}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200"
              >
                Book a New Trip ✈️
              </button>
            </section>
          </div>
        ) : (
          <div className="space-y-10">
            <section className="text-center">
              <h2 className="text-3xl font-semibold text-gray-800">
                Welcome back, {formData.username || "Admin"}! 🛠️
              </h2>
              <p className="text-gray-600 mt-2">
                Here's an overview of your platform's performance.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-blue-700">{formData.totalUsers}</h3>
                <p className="text-gray-600 mt-1">Total Users</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-green-600">{formData.totalBookings}</h3>
                <p className="text-gray-600 mt-1">Total Bookings</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-bold text-yellow-500">₹{formData.totalRevenue}</h3>
                <p className="text-gray-600 mt-1">Total Revenue</p>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Recent System Activity
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                {formData.recentActivity?.length > 0 ? (
                  formData.recentActivity.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))
                ) : (
                  <li>No recent activity available.</li>
                )}
              </ul>
            </section>

            <section className="flex justify-center">
              <button
                onClick={() => setActivePage("packages")}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-200"
              >
                Manage Packages 🧳
              </button>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-sky-200">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md hidden md:block">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">My Dashboard</h2>
        <nav className="space-y-4 text-gray-700">
          <button
            onClick={() => setActivePage("home")}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <Home className="w-5 h-5" /> Dashboard
          </button>

          {role !== "user" && (
              <>
              <button
             onClick={() => setActivePage("packages")}
             className="flex items-center gap-2 hover:text-blue-600"
            >
           <Package className="w-5 h-5" /> Manage Packages
         </button>

           <button
              onClick={() => setActivePage("users")}
               className="flex items-center gap-2 hover:text-blue-600"
              >
            <User className="w-5 h-5" /> Manage Users
             </button>
           </>
          )}
        

          <button
            onClick={() => setActivePage("bookings")}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <CalendarCheck2 className="w-5 h-5" /> My Bookings
          </button>

          <button
            onClick={() => setActivePage("profile")}
            className="flex items-center gap-2 hover:text-blue-600"
          >
            <User className="w-5 h-5" /> Profile
          </button>

          {role === "user" && (
            <button
              onClick={() => setActivePage("reviews")}
              className="flex items-center gap-2 hover:text-blue-600"
            >
              ⭐ Reviews
            </button>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-10 px-4 md:px-10">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
          {activePage === "bookings"
            ? "Manage Bookings"
            : activePage === "profile"
            ? "Profile"
            : activePage === "reviews"
            ? "Customer Reviews"
            : activePage === "users"
            ? "Manage Users"
            : role === "user"
            ? "Dashboard"
            : "Admin Panel"}
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
