import { Link } from 'react-router-dom';

export default function BlogCard({ blog }) {
  return (
    <div className="bg-black bg-opacity-70 shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-semibold">{blog.title}</h2>
      <p className="text-sm text-gray-600">By {blog.author?.username || 'Unknown'}</p>
      <p className="mt-2">{blog.content.slice(0, 100)}...</p>
      <Link to={`/blogs/${blog._id}`} className="text-blue-500 mt-2 inline-block">Read More</Link>
    </div>
  );
}
