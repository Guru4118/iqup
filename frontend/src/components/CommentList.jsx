import { useEffect, useState } from 'react';
import { fetchComments } from '../api/commentApi';

export default function CommentList({ blogId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments(blogId)
      .then(res => setComments(res.data))
      .catch(console.error);
  }, [blogId]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
      {comments.map(c => (
        <div key={c._id} className="border-b py-2">
          <p className="text-sm text-gray-600">By {c.author.username}</p>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}
