// BlogCard.jsx
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../Auth';

const BlogCard = ({ blog, removable, onRemove }) => {
  const { auth } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!auth?.user) {
      return;}
    setLiked(blog.likedBy?.includes(auth.user.id));

    const checkBookmark = async () => {
      try {
        const res = await axios.get('/api/blog/bookmark', {
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        const bookmarkedIds = res.data.map(i => i._id);
        setBookmarked(bookmarkedIds.includes(blog._id));
      } catch (err) {
        console.error('Failed to verify bookmark status:', err);
      }
    };

    checkBookmark();
  }, [auth.token, blog._id, blog.likedBy]);

  const toggleLike = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/blog/like/${blog._id}`, {}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setLiked(!liked);
    } catch (err) {
      console.error('Failed to like:', err);
    }
  };

  const toggleBookmark = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/blog/bookmark/${blog._id}`, {}, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setBookmarked(!bookmarked);
    } catch (err) {
      console.error('Failed to bookmark:', err);
    }
  };

  return (
    <Link to={`/blog/${blog._id}`} className="inline-block">
      <div className="h-[500px] w-[320px] bg-white rounded-xl border-gray-200  flex flex-col">
        <img
          src={`${API_URL}${blog.image}`}
          alt={blog.title}
          className="w-full h-52 object-cover"
        />

        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            <span className="inline-block bg-black text-white text-xs font-semibold px-3 py-1 mb-3 rounded">
              {blog.category}
            </span>

            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>

            <p className="text-sm text-gray-600 mb-5">
              {blog.subTitle}
            </p>
            <p className="text-sm text-stone-600">
              {blog.content?.slice(0, 100)}.....
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-black flex items-center">
              Read more <span className="text-xl">→</span>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-3 text-lg">
                <button onClick={toggleLike} className="text-red-500 hover:scale-100 transition">
                  {liked ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button onClick={toggleBookmark} className="text-blue-500 hover:scale-100 transition">
                  {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
              {removable && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove(blog._id);
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
