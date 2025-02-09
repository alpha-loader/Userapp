// app/components/SignUpForm.jsx
'use client';
 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AddUser = ({ onSignupSuccess }) => {
  const [userName, setUserName] = useState('');
  const [interest, setInterest] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [signupLoginId, setSignupLoginId] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  
   const router = useRouter();

  
  const interests = ['cricket', 'football', 'salsa', 'reading', 'hiking', 'coding', 'movies']; // Example interests
 
  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Collect all signup data
    const signupData = {
      userName,
      interest,
      age,
      mobile,
      email,
      loginId: signupLoginId, // Use a different name to avoid confusion.  Could also rename signupLoginId to just signupId
      password: signupPassword,
    };
    console.log('Signup details:', signupData);

    try {
      const response = await fetch('/api/users', {  // Your signup API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Tell the server we're sending JSON
        },
        body: JSON.stringify({  // Convert the data to a JSON string
          userName,
          loginId: signupLoginId,
          password: signupPassword,
          email,
          mobile,
          age,
          interest,
        }),
      });

      const data = await response.json(); // Parse the JSON response from the server

      if (response.ok) {
        // Signup was successful!
        console.log('User Created Successfully:', data);
   
        setUserName('');
        setInterest('');
        setAge('');
        setMobile('');
        setEmail('');
        setSignupLoginId('');
        setSignupPassword('');
        setSignupConfirmPassword('');
        router.push('/');
      } else {
        // Signup failed
        console.error('Signup failed:', data);  // Log the error to the console
        alert(`Signup failed: ${data.error}`); // Display an error message to the user
      }
    } catch (error) {
      // There was an error during the API call
      console.error('Error during signup:', error);
      alert('Error during signup: ' + error.message);  // Display a generic error message
    }


  };

  return (
    <div style={{ margin:'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' , width:'35%', marginTop:'20px' }}>
      <h3 style={{ marginBottom: '20px' }}>Signup</h3>
      <form onSubmit={handleCreateUser}>
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
          <select
            id="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          >
            <option value="">Select an interest</option>
            {interests.map((interestOption) => (
              <option key={interestOption} value={interestOption}>
                {interestOption}
              </option>
            ))}
          </select>
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
            value={signupLoginId}
            onChange={(e) => setSignupLoginId(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="signupPassword" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="signupPassword"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="signupConfirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
          <input
            type="password"
            id="signupConfirmPassword"
            value={signupConfirmPassword}
            onChange={(e) => setSignupConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>

        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Add User
        </button>
        
      </form>
    </div>
  );
};

export default AddUser;
