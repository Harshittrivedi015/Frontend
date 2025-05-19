import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddPackages() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    train: "",
    cab: "",
    hotel: "",
    meal: "",
    origin: "",
    destination: "",
    category: "",
    duration: "",
    rating: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const role = localStorage.getItem("userRole");

  // Redirect or block access if not admin or agent
  if (role !== "admin" && role !== "agent") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700 font-semibold">
        Unauthorized: You do not have access to this page.
      </div>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/api/packages/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(res.data.users); // Assuming your backend sends data in 'data' field
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data.");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to perform this action.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (id) {
        response = await axios.put(
          `http://localhost:3000/api/update_package/${id}`,
          formData,
          config
        );
      } else {
        response = await axios.post(
          "http://localhost:3000/api/add_packages",
          formData,
          config
        );
      }

      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        "Error adding package: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="bg-sky-200 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-700 mb-4 font-bold">{message}</p>}
        <h2 className="text-2xl font-bold mb-4 text-blue-900">
          {id ? "Update Package" : "Add New Package"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Destination Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="price"
            placeholder="Price (e.g., ₹12,000)"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="train"
            placeholder="Train details"
            value={formData.train}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="cab"
            placeholder="Cab details"
            value={formData.cab}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="hotel"
            placeholder="Hotel details"
            value={formData.hotel}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="meal"
            placeholder="Meal details"
            value={formData.meal}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="origin"
            placeholder="Origin"
            value={formData.origin}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration (days)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (e.g., 4.5)"
            value={formData.rating}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="col-span-1 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {id ? "Update Package" : "Add Package"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPackages;
