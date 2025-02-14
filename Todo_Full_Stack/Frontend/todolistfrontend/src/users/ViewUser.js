import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function ViewUser() {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null); // State to store the user data

  useEffect(() => {
    const loadUser = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    loadUser();
  }, [id]); // Dependency on `id` so it triggers when the route changes

  if (!user) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Details</h2>
          <div className="card">
            <div className="card-header">
              Details of User id : {user.id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Name :</b> {user.name}
              </li>
              <li className="list-group-item">
                <b>UserName :</b> {user.username}
              </li>
              <li className="list-group-item">
                <b>Email :</b> {user.email}
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
