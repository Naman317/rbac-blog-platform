import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
const count = 6; 

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [email, setEmail] = useState('');
  const [subMsg, setSubMsg] = useState('');

  useEffect(() => {
    axios.get('/api/blog').then((res) => {
        if (Array.isArray(res.data)) setBlogs(res.data);
      }).catch(() => setBlogs([]));
  }, []);

  const filteredBlogs =
    filter === 'All'
      ? blogs: blogs.filter(blog =>
          blog.category?.toLowerCase() === filter.toLowerCase());

  const handleSubscribe = () => {
    if (!email.includes('@')) {
      setSubMsg('Please enter a valid email.');
      return;
    }
    setSubMsg('Subscribed! Thank you.');
    setEmail('');
    setTimeout(() => setSubMsg(''), 2000);
  };
// const last  = Page * count;
// const first = last- count;
// const Page = filteredBlogs.slice(first, last);

// const totals = Math.ceil(filteredBlogs.length / count);


  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-black px-4 py-10 md:px-10 max-w-7xl mx-auto">
      <h1 className="text-5xl font-extrabold text-center mb-4 tracking-tight drop-shadow-lg">Latest Blogs</h1>
      <p className="text-center max-w-2xl mx-auto text-gray-600 mb-8 text-lg">
        Discover insights, stories, and tips from our expert authors. Stay updated, inspired, and informed!
      </p>

      <div className="flex flex-col items-center mb-10">
        <div className="flex shadow-lg rounded-lg overflow-hidden">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-3 w-72 border-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />
          <button
            onClick={handleSubscribe}
            className="px-6 py-3 bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
          >
            Subscribe
          </button>
        </div>
        {subMsg && (
          <span className={`mt-2 text-sm ${subMsg.includes('Thank') ? 'text-green-600' : 'text-red-500'}`}>
            {subMsg}
          </span>
        )}
      </div>

      <div className="flex justify-center gap-3 mb-10">
        {['All', 'Technology', 'Lifestyle'].map((c) => (
          <button
            key={c}
            onClick={()=>setFilter(c)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border text-sm font-medium shadow transition-all duration-150 ${
              filter === c
                ? 'bg-yellow-400 text-black border-yellow-500 scale-105'
                : 'bg-white text-black border-gray-200 hover:bg-yellow-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center bg-white/70 rounded-2xl p-6 shadow-lg">
        {filteredBlogs.length ? (
          filteredBlogs.map((blog) => (
            <div key={blog._id} className="w-full transition-transform duration-200 hover:shadow-2xl">
              <BlogCard blog={blog} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No blogs found for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
