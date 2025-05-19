import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    date: "",
    userId: "",
    passengerCount: 0,
    amountPaid: 0,
    status: "Pending"
  });

  const [packageDetails, setPackageDetails] = useState({
    name: "",
    price: 0,
    description: "",
    duration: "",
    location: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [passenger, setPassenger] = useState({ pname: "", gender: "", age: "" });
  const [passengers, setPassengers] = useState([]);

  const totalAmount = packageDetails.price * passengers.length;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setFormData((prev) => ({ ...prev, userId }));
  }, []);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/packages/${id}`);
        const data = res.data.users;
        setPackageDetails({
          name: data.name,
          price: parseInt(data.price.replace(/[₹,]/g, '')),
          description: data.description || "No description available",
          duration: data.duration || "Not specified",
          location: data.location || "Not specified"
        });
        setFormData((prev) => ({ ...prev, package: data.name }));
      } catch (err) {
        setError("Failed to load package details.");
      }
    };
    fetchPackage();
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassenger((prev) => ({ ...prev, [name]: value }));
  };

  const addPassenger = () => {
    if (!passenger.pname || !passenger.gender || !passenger.age) {
      alert("Please enter name, gender, and age for the passenger.");
      return;
    }
    setPassengers([...passengers, passenger]);
    setPassenger({ pname: "", gender: "", age: "" });
    setFormData(prev => ({
      ...prev,
      passengerCount: passengers.length + 1,
      amountPaid: totalAmount + packageDetails.price
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passengers.length === 0) {
      alert("Please add at least one passenger.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      passengers,
      totalAmount,
      packagePrice: packageDetails.price,
      passengerCount: passengers.length,
      amountPaid: totalAmount,
      status: "Pending"
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/bookings", dataToSubmit);
      setSuccess("Booking submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        package: packageDetails.name,
        date: "",
        userId: "",
        passengerCount: 0,
        amountPaid: 0,
        status: "Pending"
      });
      setPassengers([]);
      setPassenger({ pname: "", gender: "", age: "" });

      navigate("/dashboard");
      // After navigating to dashboard, you can set the activePage state to "bookings"
      setActivePage("bookings");

    } catch (err) {
      setError("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="bg-sky-100 min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl p-4 sm:p-6 bg-white shadow-xl rounded-2xl mt-0 overflow-hidden">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Book Your Travel Package</h2>

        {/* Package Details Card */}
        <div className="bg-blue-50  sm:p-2 rounded-lg mb-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 mb-2">{packageDetails.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Location:</span> {packageDetails.location}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {packageDetails.duration}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Description:</span> {packageDetails.description}
            </div>
          </div>
        </div>

        {success && <div className="text-green-600 mb-4 text-center font-semibold">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="package" value={formData.package} />

          {/* Main Form Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block font-medium text-sm mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block font-medium text-sm mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Travel Date */}
              <div>
                <label className="block font-medium text-sm mb-2">Travel Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleFormChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-sm"
                />
              </div>

              {/* Passengers Section */}
              <div className="border-t pt-4 mt-6">
                <h3 className="text-lg font-semibold mb-3">Add Passengers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="pname"
                    placeholder="Passenger Name"
                    value={passenger.pname}
                    onChange={handlePassengerChange}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                  />
                  <select
                    name="gender"
                    value={passenger.gender}
                    onChange={handlePassengerChange}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={passenger.age}
                    onChange={handlePassengerChange}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm"
                    min="1"
                  />
                </div>

                <button
                  type="button"
                  onClick={addPassenger}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full sm:w-auto text-sm"
                >
                  Add Passenger
                </button>

                {passengers.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Passenger Details:</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        {passengers.map((p, index) => (
                          <li key={index} className="flex justify-between items-center text-sm">
                            <span>{p.pname} ({p.gender}, {p.age} yrs)</span>
                            <span className="text-blue-600">₹{packageDetails.price.toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Price per person:</span>
                          <span className="text-blue-600">₹{packageDetails.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg mt-2">
                          <span className="font-bold">Total Amount:</span>
                          <span className="text-blue-700 font-bold">₹{totalAmount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-1/2 md:w-1/3 py-2 text-white font-semibold rounded-md ${loading ? "bg-gray-400" : "bg-blue-400 hover:bg-blue-700"}`}
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
