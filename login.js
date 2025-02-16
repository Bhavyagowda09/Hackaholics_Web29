import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically authenticate the user (e.g., API call)
    console.log('Logging in:', name, phone);

    // Placeholder: Redirect to patient list after successful login
    navigate('/patients');
  };

  return (
    <div className="login-page flex items-center justify-center h-screen bg-blue-900"> {/* Tailwind CSS for centering */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"> {/* White container with shadow */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4"> {/* Space between form elements */}
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" /> {/* Tailwind input styling */}
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" /> {/* Tailwind input styling */}
          <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-700">Login</button> {/* Tailwind button styling */}
        </form>
      </div>
    </div>
  );
}

export default Login;