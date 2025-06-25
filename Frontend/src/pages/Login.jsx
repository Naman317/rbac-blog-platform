import { useState, useContext } from 'react';
import API from '../baseApi';
import { AuthContext } from '../Auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-yellow-200">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">Log In</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center text-gray-500 text-sm">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-yellow-600 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
