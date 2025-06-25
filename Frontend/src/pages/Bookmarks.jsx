import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../Auth";
import BlogCard from './BlogCard';
import API from '../baseApi';

const Bookmarks = () => {
  const { auth } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchBookmarks = async () => {
      try {
        const res = await API.get('blog/bookmark', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setBookmarks(res.data);
      } catch (err) {
        console.error('Bookmark fetch failed:', err);
        setError('Failed to fetch bookmarked posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [auth]);

  if (!auth.token) return <p className="text-center text-black font-bold ">Please log in to view bookmarks.</p>;
  if (loading) return <p className="text-center ">Loading bookmarks...</p>;
  if (error) return <p className="text-center text-red-500 ">{error}</p>;
  if (!bookmarks.length) return <p className="text-center">You have no bookmarks yet.</p>;

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Bookmarked Blogs</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {bookmarks.map((blog) => (
          <BlogCard key={blog._id} blog={blog} removable={true} onRemove={(id) => {
            setBookmarks(prev => prev.filter(b => b._id !== id));
          }} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
