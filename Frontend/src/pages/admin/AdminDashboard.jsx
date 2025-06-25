import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Auth';
import API from '../../baseApi'

const AdminDashboard = () => {

  const { auth } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if(!auth?.token)
      {
        console.warn('No token IS HERE .');
        return ;
      }
      API.get('/blog',
        { headers: 
          { 
            Authorization: `Bearer ${auth.token}` 
          }
        }
      ).then(
        res => setBlogs(res.data)
      ).catch(console.error);
    },
    [auth]
  );
    
    const handleDelete = async (id) => {
      try{
        await API.delete(`/blog/${id}`,
          {
            headers:
            {
              Authorization: `Bearer ${auth.token}` 
            }
          }
        );
      setBlogs(prev => prev.filter(blog => blog._id!==id));
    }
    catch(err){
      console.error('Delete error:', err);
    }
  };

  return (
  <div className="p-5">
    <h1 className="text-4xl font-bold">Admin Dashboard</h1>
    <div className="flex justify-between items-center ">
      <Link to="/admin/create" className="text-blue-600 mb-7 mt-3">
      + Create Blog
      </Link>
      <Link to="/admin/top-liked" className="text-blue-600 underline mb-7">
      View Most Liked Blogs
      </Link>
    </div>
    <div className="mt-13 grid gap-4">
      { blogs.map( item => (
        <div key={item._id}  className="border p-3 rounded shadow flex justify-between items-center">
          <div>
            <h2 className="font-semibold">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600">
              {item.category}
            </p>
          </div>
            
          <div className="flex gap-3">
            <Link to={`/admin/edit/${item._id}`} className="text-green-600 hover:underline " >Edit</Link>
              <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:font-bold transition-transform ">Delete</button>
          </div>
            
           

          </div>
        )
      )
    }
  </div>
</div>
  );
};

export default AdminDashboard;
