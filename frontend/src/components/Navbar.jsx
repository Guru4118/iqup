import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const navLinks = ['Home', 'Roadmap', 'Blogs', 'About', 'Login'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-500 tracking-widest" data-aos="fade-down">
          IQUP
        </h1>
        <ul className="hidden md:flex gap-6" data-aos="fade-down">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="text-white hover:text-pink-500 transition duration-300 cursor-pointer"
            >
              {link}
            </li>
          ))}
        </ul>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-white z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          data-aos="fade-down"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Horizontal Menu (Right Side) */}
      <div
  className={`fixed top-0 right-0 h-screen w-1/2 bg-gradient-to-b from-black to-blue-400 z-40 pt-4 transition-transform duration-500 ease-in-out ${
    menuOpen ? 'translate-x-0' : 'translate-x-full'
  }`}
>

      
        <div className="flex justify-end p-4">
          <c
            size={28}
            className="text-white cursor-pointer "
            onClick={() => setMenuOpen(false)}
          />
        </div>
        <ul className="flex flex-col items-start gap-6 pl-6 pt-15 ">
          {navLinks.map((link, index) => (
            <li 
              key={index}
              className="text-white  px-8 py-4 rounded-full w-50 text-lg font-medium hover:text-black hover:bg-white  transition duration-700 ease-in cursor-pointer "
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
