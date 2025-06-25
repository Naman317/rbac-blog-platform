import { useEffect, useState } from 'react';
import axios from 'axios';
import API from "../../baseApi"

const TopLikedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    API.get('blog/top-liked', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => setBlogs(res.data)).catch(err => console.error('Error fetching top liked:', err));
  },[]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Liked Blogs</h1>
      <div className="grid gap-4">
        {blogs.map(blog => (
          <div key={blog._id} className="border p-6 rounded shadow">
            <h2 className="text-2xl font-semibold">{blog.title}</h2>
            <p className="text-base text-gray-600 mb-1">{blog.subTitle}</p>
            <p className="text-sm text-blue-400 font-medium">Likes: <strong>{blog.likes }</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopLikedBlogs;
