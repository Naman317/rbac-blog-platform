import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API from '../../baseApi'

const CreateBlog = () => {
  const [form, setForm] = useState(
    {
      title: '',
      subTitle: '',
      content: '',
      category: '',
      isPublished: true,
    }
  );
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(
      { ...form,
         [e.target.name]: e.target.value 
        }
      );
  };

  const handleFileChange = e => {
    setImageFile(e.target.files[0]); // store the File IN OBJECT 
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await API.post('/blog', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
      
       navigate('/admin');
    }
    catch (err) {
      console.error('Failed to create blog:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p4- max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-8">Create Blog</h2>

      {['title', 'subTitle', 'content', 'category'].map(field => (
        <input
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
          required
        />
      ))}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border p-2 mb-3"
        required
      />

      <button type="submit" className="bg-black text-white px-4 py-2 mt-3 ">
        Create
      </button>
    </form>
  );
};

export default CreateBlog;
