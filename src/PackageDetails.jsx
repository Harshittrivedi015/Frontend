import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/packages/${id}`);
        setPkg(response.data.users); // Adjust if the key is different
      } catch (err) {
        setError("Failed to load package details.");
      }
    };
    fetchPackage();
  }, [id]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (!pkg) return <div className="p-4">Loading...</div>;

  return (
    <div className="bg-sky-100 min-h-screen flex justify-center items-center py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl h-auto flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-full bg-gray-100">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover p-4"
          />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-800 mb-4">{pkg.name}</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800 mb-4">
              <div><strong>Price:</strong> <span className="text-green-600">{pkg.price}</span></div>
              <div><strong>Category:</strong> {pkg.category}</div>
              <div><strong>Duration:</strong> {pkg.duration} days</div>
              <div><strong>Ratings:</strong> {pkg.rating}/5</div>
              <div><strong>Origin:</strong> {pkg.origin}</div>
              <div><strong>Destination:</strong> {pkg.destination}</div>
              {pkg.train && <div><strong>Train:</strong> {pkg.train}</div>}
              {pkg.cab && <div><strong>Cab:</strong> {pkg.cab}</div>}
              {pkg.hotel && <div><strong>Hotel:</strong> {pkg.hotel}</div>}
              {pkg.meal && <div><strong>Meal:</strong> {pkg.meal}</div>}
            </div>

            <div>
              <h2 className="text-md font-semibold mb-2">Description</h2>
              <p className="text-gray-700 text-sm">{pkg.description}</p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              className="bg-blue-600 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-700 transition"
              onClick={() => navigate(`/booking/${id}`)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
