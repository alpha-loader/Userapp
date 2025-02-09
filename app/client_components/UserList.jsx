// app/components/UserList.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Added Link

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  // Added loading state
  const router = useRouter();

  useEffect(() => {
    // Check login status on mount
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Fetch users
    const fetchUsers = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching (success or error)
      }
    };

    fetchUsers();
  }, []);

  const handleRemove = async (userId) => {
    if (confirm("Are you sure you want to remove this user?")) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUsers(users.filter(user => user._id !== userId)); // Update user list in state
          alert("User removed successfully!");
        } else {
          console.error("Failed to remove user:", response.statusText);
          alert("Failed to remove user.");
        }
      } catch (error) {
        console.error("Error removing user:", error);
        alert("Error removing user.");
      }
    }
  };

  const handleEdit = (userId) => {
    router.push(`/users/${userId}/edit`);
  };

  if (isLoading) {
    return <div>Loading users...</div>;  // Display loading indicator
  }

  return (
    <div>
      <h2>User List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>User Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Login ID</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Mobile</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Age</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Interest</th>
            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.userName}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.loginId}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.mobile}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.age}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.interest}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
              <button
                  onClick={() => handleEdit(user._id)}
                  disabled={!isLoggedIn}
                  style={{
                    marginLeft: '5px',
                    cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                    backgroundColor: isLoggedIn ? 'green' : '#cccccc',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    ':hover': { //This code is invalid and will be completely ignored
                      backgroundColor: '#367c39', // Darker green on hover
                    },
                  }}
                >
                  View/Edit
                </button>
                <button
                  onClick={() => handleRemove(user._id)}
                  disabled={!isLoggedIn}
                  style={{
                    marginLeft: '5px',
                    cursor: isLoggedIn ? 'pointer' : 'not-allowed',
                    backgroundColor: isLoggedIn ? 'red' : '#cccccc',
                    color: 'white',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '5px',
                    ':hover': { //This code is invalid and will be completely ignored
                      backgroundColor: '#367c39', // Darker green on hover
                    },
                  }}
                >
                  Remove
                </button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
