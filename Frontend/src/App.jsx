import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import Bookmarks from './pages/Bookmarks';
import PrivateRoute from './pages/admin/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateBlog from './pages/admin/CreateBlog';
import EditBlog from './pages/admin/EditBlog';
import TopLikedBlogs from './pages/admin/TopLikedBlogs';
function App() {
  return (
    <Router>
      <div className="font-sans bg-white text-black min-h-screen">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookmarks" element={<Bookmarks />} />

          {/* Admin Routes (Protected) */}
          <Route path="/admin" element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/create" element={
            <PrivateRoute role="admin">
              <CreateBlog />
            </PrivateRoute>
          } />
          <Route path="/admin/edit/:id" element={
            <PrivateRoute role="admin">
              <EditBlog />
            </PrivateRoute>
          } />
          
<Route path="/admin/top-liked" element={
  <PrivateRoute role="admin">
    <TopLikedBlogs />
  </PrivateRoute>
} />
        </Routes>
        


      </div>
    </Router>
  );
}

export default App;
