import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBlog, deleteBlog } from '../api/blogApi';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Navbar from '../components/Navbar';
import QuickLinksPage from '../components/QuickLinks';
import ReactMarkdown from 'react-markdown';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);

  useEffect(() => {
    fetchBlog(id)
      .then(res => setBlog(res.data))
      .catch(console.error);
  }, [id]);

  const handleDelete = async () => {
    await deleteBlog(id);
    navigate('/');
  };

  if (!blog) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Glowing Background Blobs */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-pink-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute top-10 right-0 w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />
      <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] bg-blue-500 opacity-30 rounded-full blur-3xl mix-blend-lighten z-0" />

      <Navbar />

      {/* Blog Content */}
      <div className="relative z-10 px-4 pt-20 max-w-4xl mx-auto">
        <div
          className="bg-black bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-pink-600"
          data-aos="zoom-in"
        >
          <h1 className="text-4xl font-bold text-pink-400 mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-300 mb-6">By {blog.author?.username || 'Unknown'}</p>

          <div className="prose prose-invert max-w-none text-white">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

         
         
        </div>

        {/* Quick Links */}
        
      </div>
      <div className="">
          <QuickLinksPage />
        </div>
    </div>
  );
}
