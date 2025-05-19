import React from 'react';

const packages = [
  {
    title: "North India Packages",
    image: "https://www.irctctourism.com/packageImage/home_page_image/N_360x233.webp", 
  },
  {
    title: "West India Packages",
    image: "https://www.irctctourism.com/packageImage/home_page_image/W_360x233.webp",
  },
  {
    title: "North-East India Packages",
    image: "https://www.irctctourism.com/packageImage/home_page_image/NE_360x233.webp",
  },
];

const TrendingPackages = () => {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Trending Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold text-lg">{pkg.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingPackages;
