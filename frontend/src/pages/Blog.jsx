import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBlogs } from '../api/blogApi';
import BlogCard from '../components/BlogCard';
import Navbar from "../components/Navbar";
import QuickLinksPage from '../components/QuickLinks';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 Loading state
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    fetchBlogs()
      .then(res => {
        setBlogs(res.data);
        setLoading(false); // ✅ Done loading
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // ✅ Handle errors too
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-opacity-60"></div>
          <p className="text-pink-400 text-xl font-semibold">Loading Blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 🎨 Glowing Background Blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <div className="absolute top-180 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-20 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-60 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-155 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-220 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-225 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-90 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-140 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />

      <Navbar />

      {/* 🌟 Page Title */}
      <div className="relative z-10 px-4 pt-20 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-rose-400 mb-6" data-aos="fade-down">
          Featured Blogs
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10" data-aos="fade-up">
          Explore AI, technology trends, interview tips, and more curated just for you!
        </p>
      </div>

      {/* 📰 Blog Cards */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div key={blog._id} data-aos="zoom-in">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>

      {/* 💡 Quick Links */}
      <div className="relative z-10 mt-20  mx-auto" data-aos="fade-up">
        <QuickLinksPage />
      </div>
    </div>
  );
}
