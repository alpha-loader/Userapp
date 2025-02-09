// app/components/UserEdit.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UserEdit = ({ params }) => {
  const { id } = React.use(params); 
  const [userName, setUserName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [interest, setInterest] = useState('');

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUserName(data.userName);
          setLoginId(data.loginId);
          setEmail(data.email);
          setMobile(data.mobile);
          setAge(data.age);
          setInterest(data.interest);
          setPassword(data.password);
        } else {
          console.error("Failed to fetch user:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          loginId,
          password,
          email,
          mobile,
          age,
          interest,
        }),
      });

      if (response.ok) {
        alert('User updated successfully!');
        router.push('/'); // Redirect to user list page
      } else {
        const errorData = await response.json();
        alert(`User update failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user: ' + error.message);
    }
  };

  return (
    <div style={{ margin:'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' , width:'35%', marginTop:'20px' }}>
      <h3 style={{ marginBottom: '20px' }}>Edit User</h3>
      <form onSubmit={handleUpdate}>
        {/* Signup Form */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="userName" style={{ display: 'block', marginBottom: '5px' }}>User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="interest" style={{ display: 'block', marginBottom: '5px' }}>Interest:</label>
              <input
            type="text"
            id="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="age" style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="mobile" style={{ display: 'block', marginBottom: '5px' }}>Mobile:</label>
          <input
            type="tel" // Use tel type for mobile numbers
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="signupLoginId" style={{ display: 'block', marginBottom: '5px' }}>Login ID:</label>
          <input
            type="text"
            id="signupLoginId"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
