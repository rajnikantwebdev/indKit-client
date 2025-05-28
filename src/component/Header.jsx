"use client"
import React, { useState } from "react";
import { Users, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import axios from "axios"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const username = localStorage.getItem("username")
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      // Call logout API
      await axios.post(
        "http://localhost:8080/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear token and redirect to login
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Clear token and redirect even if API fails
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <nav className="primary-bg shadow-lg border-b w-full fixed top-0 left-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={"/dashboard"} className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
              IndKit
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {/* Employee List */}
              <Link
                to={"/employee/list"}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <Users size={20} />
                <span className="font-medium">Employee List</span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <span>{"Hi " + username}</span>
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={handleEmployeeList}
                className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <Users size={20} />
                <span className="font-medium">Employee List</span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
