import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const role = localStorage.getItem("userRole"); // Get user role from localStorage


  useEffect(() => {
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("userRole");

  const fetchBookingsForUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/bookings/${userId}`);
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings.");
    }
  };

  const fetchBookingsForAdmin = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/bookings`);
      setBookings(res.data);
    } catch (err) {
      setError("Failed to load bookings.");
    }
  };

  if (role === "user") {
    fetchBookingsForUser();
  } else {
    fetchBookingsForAdmin();
  }
}, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/api/bookings/${id}/status`, { status });
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );
    } catch (err) {
      setError("Failed to update booking status.");
    }
  };

  return (
    <div className="booking-management max-w-4xl mx-auto p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-xl shadow border border-gray-200"
          >
            <p className="text-lg font-bold text-blue-700">{booking.name}</p>

            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <p><strong>Package:</strong> {booking.package}</p>
              <p><strong>Travel Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Total Amount:</strong> ₹{booking.totalAmount?.toLocaleString()}</p>
              <p><strong>Passengers:</strong> {booking.passengers?.length || 0}</p>
            </div>

            {(booking.status !== "Confirmed" && booking.status !== "Cancelled" && role != 'user') && (
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleStatusChange(booking._id, "Confirmed")}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange(booking._id, "Cancelled")}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBooking;
