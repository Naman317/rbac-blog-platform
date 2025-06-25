import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Auth';

const Navbar = () => {
  const navigate = useNavigate();
  const {auth, logout} =useContext(AuthContext);
  
  const handleLogout =()=>{
    logout();           
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <Link to="/" className="text-2xl font-bold">🅱️ Blogger</Link>
      
      <div className="flex items-center space-x-4">
        {!auth.token ?
        (
          <div>
            <Link to="/login" className="border px-4 py-1 rounded">Login</Link>
            <Link to="/register" className="border px-4 py-1 rounded">Signup</Link>\

          </div>
        ) : (
          <>
            { auth.user?.role==='admin' && <Link to="/admin" > Admin </Link>}

            <Link to="/bookmarks">Bookmarks</Link>

            <button onClick={handleLogout} className="border px-4 py-2 text-red-600 rounded-2xl hover:bg-red-700 transition-colors hover:text-white">Logout</button>

          </>
        )
      }
    </div>
  </nav>
  );
};

export default Navbar;
