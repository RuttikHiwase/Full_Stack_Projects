import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const [error, setError] = useState(null); // State for error message

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!name || !username || !email) {
      setError("All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:8080/user", user);
      navigate("/"); // Redirect to homepage after submission
    } catch (err) {
      setError("Failed to register user. Please try again.");
      console.error(err); // Log error for debugging
    }
  };

  const onCancel = () => {
    setUser({ name: "", username: "", email: "" }); // Reset form
    navigate(-1); // Navigate back to previous page
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor='name' className='form-label'>Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Your Name" 
                name="name" 
                value={name} 
                onChange={onInputChange} 
              />

              <label htmlFor='username' className='form-label'>UserName</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter Your UserName" 
                name="username" 
                value={username} 
                onChange={onInputChange} 
              />

              <label htmlFor='email' className='form-label'>Email Address</label>
              <input 
                type="email" // Use type="email" for email validation
                className="form-control" 
                placeholder="Enter Your Email Address" 
                name="email" 
                value={email} 
                onChange={onInputChange} 
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">Submit</button>
            <Link  className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
