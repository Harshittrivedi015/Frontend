import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole"); // Get user role from localStorage

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchPackages();
  }, [navigate, userId]);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/packages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPackages(res.data);
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (!confirmDelete) return;

    if (!token) {
      alert("You are not authorized. Please login.");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete_package/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Package deleted!");
      fetchPackages();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete package.");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-12 bg-sky-100 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-blue-900">Packages</h2>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-80"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="bg-red-400 text-white px-3 py-2 rounded-lg hover:bg-red-500"
              >
                Clear
              </button>
            )}
            {role === "admin" || role === "agent" ? (
              <button
                onClick={() => navigate("/addpackages")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                + Add Package
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pkg.name}</h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{pkg.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">{pkg.price}</p>
                <div className="flex flex-wrap justify-between mt-4 gap-2">
                {role !== "admin" && (
                  <button
                    onClick={() => navigate(`/package/${pkg._id}`)}
                    className="flex-1 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 text-sm"
                  >
                    View Details
                  </button>)}
                  {(role === "admin" || role === "agent") && (
                    <>
                      <button
                        onClick={() => navigate(`/addpackages/${pkg._id}`)}
                        className="bg-yellow-500 text-white py-2 px-3 rounded-lg hover:bg-yellow-600 text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <p className="text-center text-gray-800 mt-10 text-lg">
            No packages found matching "{searchTerm}"
          </p>
        )}
      </div>
    </section>
  );
};

export default Packages;
