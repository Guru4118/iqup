import { useState } from 'react';
import { postComment } from '../api/commentApi';

export default function CommentForm({ blogId, onCommentPosted }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
  e.preventDefault();
  if (!text.trim()) return;
  setLoading(true);
  try {
    const token = localStorage.getItem('token'); // Get JWT token from localStorage
    if (!token) {
      throw new Error('You must be logged in to post a comment.');
    }

    await postComment(blogId, text, token); // Pass token to API
    setText('');
    onCommentPosted(); // notify parent to refresh
  } catch (err) {
    console.error(err);
    alert(err.message); // optional: show error to user
  }
  setLoading(false);
};


  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-2 border rounded h-24"
        placeholder="Write your comment..."
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <button
        type="submit"
        className="mt-2 bg-pink-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Posting…' : 'Post Comment'}
      </button>
    </form>
  );
}
