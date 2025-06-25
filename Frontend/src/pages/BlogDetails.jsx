import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API from "../baseApi"

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get(`/blog/${id}`).then(res => {
      setBlog(res.data);
      
    
      setLoading(false);}
    ).catch(err => {
        setError('Failed to load blog post');
        setLoading(false);
      }
    );
  }, [id]);

  if (loading){
     return <p className="text-center mt-10">Loading...</p>
    };
  if (error){
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }
  if (!blog) {
    return <p>No Blogs ! Please let us Check ...</p>;
  }
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img
          src={`${API_URL}${blog.image}`}
          alt={blog.title}
          className="w-full h-52 object-cover"
        />

      <span className="inline-block bg-black text-white text-xs font-semibold px-3 py-1 rounded mb-3">
        {blog.category}
      </span>

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <p className="text-gray-900 mb-4 text-lg font-medium">{blog.subTitle}</p>

      <div className="text-gray-650 leading-relaxed whitespace-pre-wrap">{blog.content}</div>
    </div>
  );
};

export default BlogDetails;