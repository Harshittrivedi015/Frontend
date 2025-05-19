import React from "react";

const HolidayPackageData = [
  {
    name: "Kashmir",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Neeulm_Valley_AJK_%28Arang_Kel%29.jpg",
    price: "₹12,400",
    description: "Explore the breathtaking valleys of Kashmir with guided tours.",
  },
  {
    name: "Kerala",
    image: "https://lp-cms-production.imgix.net/2024-08/shutterstock2044878389.jpg",
    price: "₹11,411",
    description: "Backwaters, hill stations, and tranquil beaches await you in Kerala.",
  },
  {
    name: "Himachal Pradesh",
    image: "https://t4.ftcdn.net/jpg/05/83/39/99/360_F_583399925_DLRb1HDsgv7cy6UuRm1goPYg9pKCHy4Y.jpg",
    price: "₹10,300",
    description: "Discover the adventure and scenic beauty of Himachal Pradesh.",
  },
  {
    name: "Dubai",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHOwL1lCdGII2HzPgojNWUkhSNhuLyWxVq5Q&s",
    price: "₹35,000",
    description: "Luxury, shopping, and modern wonders in the heart of Dubai.",
  },
  {
    name: "Ladakh",
    image: "https://s7ap1.scene7.com/is/image/incredibleindia/2-lamayuru-or-yuru-monastery-kargil-j_k-city-hero?qlt=82&ts=1726667854003",
    price: "₹30,500",
    description: "Experience the rugged beauty of Leh, Nubra Valley & Pangong Lake.",
  },
  {
    name: "Singapore",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/b1/singapore.jpg?w=1400&h=1400&s=1",
    price: "₹50,000",
    description: "A futuristic city with diverse cultures and thrilling attractions.",
  },
];

const HolidayPackage= ({ handleBookNow }) => {
  return (
    <section className="py-12 bg-sky-100">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">HolidayPackage</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HolidayPackageData.map((pkg, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img src={pkg.image} alt={pkg.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pkg.name}</h3>
                <p className="text-gray-600 mt-2">{pkg.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">{pkg.price}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleBookNow(pkg)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HolidayPackage;
