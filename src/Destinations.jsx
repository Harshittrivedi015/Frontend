const destinations = [
  {
    title: "Tropical Beaches",
    description: "Relax and unwind on the world's most beautiful beaches.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80",
  },
  {
    title: "Majestic Mountains",
    description: "Experience breathtaking landscapes and adventurous hikes.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80",
  },
  {
    title: "Vibrant Cities",
    description: "Explore cultural hubs and iconic landmarks.",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=600",
  },
  {
    title: "Desert Adventures",
    description: "Ride camels and experience stunning desert sunsets.",
    image: "https://images.unsplash.com/photo-1595339795251-48d48fba22ac?q=80&w=2016&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Snowy Retreats",
    description: "Cozy up in a winter wonderland with snow-covered landscapes.",
    image: "https://images.unsplash.com/photo-1517672651691-24622a91b550?q=80",
  },
  {
    title: "Historical Landmarks",
    description: "Step back in time and explore ancient wonders.",
    image: "https://images.unsplash.com/photo-1723126906550-59dbe6464259?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function Destinations() {
  return (
    <section className="w-full min-h-screen bg-blue-100 flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-6">Top Destinations</h1>
      <p className="text-lg text-gray-700 mb-8">
        Discover breathtaking places around the world.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {destinations.map((destination, index) => (
          <div key={index} className="shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-2xl transition duration-300">
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-blue-500">{destination.title}</h3>
              <p className="text-gray-700 mt-2">{destination.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Destinations;
