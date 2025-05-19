import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        
        <div>
          <h2 className="text-lg font-semibold">JourneyMap</h2>
          <p className="mt-2 text-gray-300">Explore the world with the best travel deals and seamless booking experiences.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-2 space-y-2 text-gray-300">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/destinations" className="hover:text-white">Destinations</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/blog" className="hover:text-white">Travel Blog</a></li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-lg font-semibold">Support</h2>
          <ul className="mt-2 space-y-2 text-gray-300">
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
            <li><a href="/terms" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/support" className="hover:text-white">Customer Support</a></li>
          </ul>
        </div>

       
        <div>
          <h2 className="text-lg font-semibold">Subscribe</h2>
          <p className="mt-2 text-gray-300">Get exclusive travel deals and news directly in your inbox.</p>
          <form className="mt-4 flex">
            <input type="email" placeholder="Enter your email" className="p-2 w-full rounded-l-md border-2 text-gray-900" />
            <button className="bg-yellow-500 px-4 py-2 rounded-r-md hover:bg-yellow-600">Subscribe</button>
          </form>
          
          
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-400"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-yellow-400"><FaYoutube size={20} /></a>
          </div>
        </div>
      </div>

 
      <div className="text-center mt-10 border-t border-gray-700 pt-4">
        <p className="text-gray-400">© 2025 journeymap. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
