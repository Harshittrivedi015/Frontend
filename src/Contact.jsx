import { Link } from "react-router-dom";

function Contact() {
  return (
    <section className="w-full min-h-screen bg-sky-100 py-5 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Contact Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">Get in Touch</h1>
          <p className="text-gray-600 text-base text-center mb-8">
            We’d love to hear from you. Fill out the form and our team will get back to you as soon as possible.
          </p>

          <form className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="w-full md:w-1/2 bg-blue-50 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">Contact Information</h2>

          <div className="space-y-5 text-gray-700 text-base">
            <div className="flex items-start gap-4">
              <span className="text-blue-600 text-xl">📍</span>
              <p>123 JourneyMap St., Indore, Madhya Pradesh, India</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-blue-600 text-xl">📞</span>
              <p>+91 123 456 7890</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-blue-600 text-xl">✉️</span>
              <p>support@journeymap.com</p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/map"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            >
              View on Map
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
