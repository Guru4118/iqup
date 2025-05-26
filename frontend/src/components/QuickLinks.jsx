import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function QuickLinksPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Gradient Overlay and Blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <div className="absolute top-80 left-0 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-79 right-0 w-[300px] h-[300px] bg-purple-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />
            <div className="absolute top-50 left-245 w-[300px] h-[300px] bg-pink-500 opacity-40 rounded-full blur-3xl mix-blend-lighten z-0" />

      

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h1 className="text-4xl font-bold mb-8">Quick Links</h1>
        <p className="mb-10 text-lg max-w-xl">
          Easily navigate to key sections of the platform.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-2xl">
          <LinkCard  to="/" title="Home" />
          <LinkCard to="/upload" title="Roadmap" />
          <LinkCard to="/interview" title="Blogs" />
          <LinkCard to="/about" title="ℹAbout" />
          
        </div>
      </div>
      <p  className=" relative mb-6 flex flex-col items-center justify-center   text-center px-6">All Rights Reserved And Designed by Guruprasath</p>
    </div>
  );
}

function LinkCard({ to, title }) {
  return (
    <Link  data-aos='flip-right'to={to}>
      <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-xl p-1 hover:scale-105 transition transform duration-300 shadow-lg">
        <div className="bg-black rounded-lg p-6 h-full flex items-center justify-center">
          <span className="text-white text-lg font-semibold">{title}</span>
        </div>
      </div>
    </Link>
  );
}
