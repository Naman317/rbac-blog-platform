import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API from'../../baseApi';
const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    subTitle: '',
    content: '',
    category: '',
    isPublished: true,
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios.get(`/blog/${id}`).then(res => setForm(res.data)).catch(err => console.error('Error fetching blog:', err));
  },[id]);

  const handleChange = e => {
    setForm(
      { ...form,
        [e.target.name]: e.target.value 
      }
    );
  };

  const handleFileChange = e => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      if (key !== 'image') formData.append(key, form[key]);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await axios.put(`/blog/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin');
    } catch (err) {
      console.error(' Update error:',err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

      {['title', 'subTitle', 'content', 'category'].map(input => (
        <input
          key={input}
          name={input}
          placeholder={input}
          value={form[input]}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />
      ))}

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Current Image:</label>
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}${form.image}`}
          className="w-full h-40 object-cover mb-2 rounded"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border p-2 mb-3"
      />

      <button type="submit" className="bg-black text-white px-4 py-2">Update</button>
    </form>
  );
};

export default EditBlog;
