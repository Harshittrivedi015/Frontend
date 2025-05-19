import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdDashboard } from 'react-icons/md';
import logo from './assets/journeymap-logo.png';

function Header() {
  const role = localStorage.getItem("userRole"); // Get user role from localStorage

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleLoginChange = () => {
      checkLoginStatus();
    };
    window.addEventListener('loginStatusChange', handleLoginChange);
    return () => {
      window.removeEventListener('loginStatusChange', handleLoginChange);
    };
  }, []);

  return (
    <header className="bg-blue-500 text-white p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="JourneyMap Logo" className="h-10 w-10 object-contain" />
          <span className="text-2xl font-bold hidden sm:inline">JourneyMap</span>
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            {role == 'user' ? <li><Link to="/packages" className="hover:underline">Packages</Link></li> : ''}
             <li><Link to="/about" className="hover:underline">About Us</Link></li> 
             <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>

            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/signup" className="bg-white text-blue-600 px-3 py-1 rounded shadow-md">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login" className="bg-white text-green-600 px-3 py-1 rounded shadow-md">Login</Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80">
                  <MdDashboard className="w-6 h-6" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
