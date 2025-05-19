import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const handleExploreClick = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/packages");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white">
   
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80')"
        }}
      ></div>

      <div className="absolute inset-0  bg-opacity-50"></div>

      <div className="relative z-10 px-4">
        <h2 className="text-5xl font-bold">Discover Your Next Adventure</h2>
        <p className="text-lg mt-2">Explore the world, map your journey, and create unforgettable memories.</p>
        <button 
          onClick={handleExploreClick}
          className="mt-4 bg-blue-600 px-6 py-3 rounded text-white hover:bg-blue-700 inline-block"
        >
          Start Exploring
        </button>
      </div>
    </section>
  );
}

export default Hero;
