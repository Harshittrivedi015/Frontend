import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function EmailVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
        console.log("location.state.email",location.state.email);
      setEmail(location.state.email);
      if (!otpSent) {
        sendOtp(location.state.email);        
      }
    } else {
      navigate('/signup');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state.email]); // Empty dependency array ensures this runs only once on mount

  const sendOtp = async (email) => {
    try {
      setIsSendingOtp(true);
      setMessage('Sending OTP...');
      setError('');
      
      const res = await axios.post("http://localhost:3000/api/sendotp", { 
        email, 
        purpose: 'verification' 
      });
      
      setMessage('OTP sent to your email!');
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
      setOtpSent(false);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/verifyotp", { email, otp });
      alert('Email verified successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-100">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-600">Verify Your Email</h2>
        <p className="text-gray-700 mb-4">We sent an OTP to: <span className="font-semibold">{email}</span></p>

        {message && <p className="text-green-600 mb-2">{message}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleVerifyOtp} className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Verify OTP
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={() => sendOtp(email)}
            disabled={isSendingOtp}
            className={`text-blue-600 hover:underline ${isSendingOtp ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSendingOtp ? 'Sending OTP...' : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationPage;