import { Link } from "react-router-dom";

function About() {
  return (
    <section className="w-full min-h-screen bg-sky-50 py-16 px-6 flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Image on the Left */}
        <div className="w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80"
            alt="Travel adventure"
            className="rounded-2xl shadow-xl w-full object-cover"
          />
        </div>

        {/* Content on the Right */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">About JourneyMap</h1>
          <p className="text-gray-700 text-base mb-4 leading-relaxed">
            At <span className="font-semibold text-blue-700">JourneyMap</span>, we’re passionate about helping you explore the world with ease. We provide intuitive, reliable travel solutions that make trip planning effortless — from discovery to booking.
          </p>

          <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-2">Our Mission</h2>
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Our mission is to inspire and empower every traveler by connecting them with tailored packages, local insights, and seamless booking options — so they can focus on the journey, not the logistics.
          </p>

          <h2 className="text-2xl font-semibold text-blue-500 mb-3">Why Choose JourneyMap?</h2>
          <ul className="list-none space-y-2 text-gray-800 text-base">
            <li>✅ Handpicked travel deals from trusted providers</li>
            <li>✅ 24/7 customer assistance — anywhere you go</li>
            <li>✅ Personalized suggestions based on your interests</li>
            <li>✅ Safe, secure, and fast booking process</li>
          </ul>

          <div className="mt-8">
            <Link
              to="/packages"
              className="bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-6 py-3 rounded-lg shadow-md transition"
            >
              Discover Travel Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
