import { useState } from 'react';
import API from '../baseApi';

const Register = () => {
  // declaring some states for form inputs 
  const [form,setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'  
  });

//states fpr error and verficayion link
  const [error,setError] = useState('');
  const [verificationLink,setVerificationLink] = useState('');


  // for reset and input changes
  const handleChange = (e) => {
    setForm(
      {...form,
        [e.target.name] : e.target.value 
      });

    setError('');
    setVerificationLink('');
  };

  // for form sumbmission
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);  // backend route
      setVerificationLink(res.data.verificationLink); 
      setForm(
        { name: '', email: '', password: '', role: 'user' }
      );
    }
    catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-yellow-600 mb-6"> Register</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            className="p-3 border rounded-lg"
            name="name"
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={handleChange}    />

          <input
            className="p-3 border rounded-lg"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}    />

          <input
            className="p-3 border rounded-lg"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}     />

          <select
            className="p-3 border rounded-lg"
            name="role"
            value={form.role}
            onChange={handleChange}    >

            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="bg-yellow-400 py-3 rounded-lg font-semibold"> Register </button>

        </form>

        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        { verificationLink && ( <div className="text-green-600 mt-6 text-center text-sm"> ✅ Registration successful. <br /> Click here to verify your email: <br />
        
        <a href={verificationLink} className="text-blue-600 underline font-medium break-words" target="_blank" rel="noopener noreferrer" >{verificationLink} </a>
        </div>

        )}

      </div>
    </div>
  );
};

export default Register;
