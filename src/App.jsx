import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Destinations from "./Destinations";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import About from "./About";
import Contact from "./Contact";
import Packages from "./Packages";
import Booking from "./Booking"; 
import CustomerReviews from "./CustomerReviews"; 
import TrendingPackages from './TrendingPackages';
import Profile from './Profile';
import Dashboard from './Dashboard';
import AddPackages from "./AddPackages";
import HolidayPackage from './HolidayPackage';
import EmailVerificationPage from './EmailVerificationPage';
import PackageDetails from "./PackageDetails";
import ManageBooking from "./ManageBooking";
import ManageUsers from './ManageUsers';


function App() {
    return (
        <Router>
            <div className="bg-gray-100 text-gray-900 min-h-screen">
                <Header />
                <main className="pt-16">
                    <Routes>
                        <Route path="/" element={<><Hero /><Destinations /><TrendingPackages /><HolidayPackage /><CustomerReviews /><Footer /></>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Packages" element={<Packages />} />
                        <Route path="/booking/:id" element={<Booking />} />
                        <Route path="/ManageBooking" element={<ManageBooking />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/AddPackages" element={<AddPackages />} />
                        <Route path="/AddPackages/:id" element={<AddPackages />} />
                        <Route path="/HolidayPackage" element={<HolidayPackage/>} />
                        <Route path="/EmailVerificationPage" element={<EmailVerificationPage/>} />
                        <Route path="/package/:id" element={<PackageDetails />} />
                        <Route path="/admin/users" element={<ManageUsers />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
