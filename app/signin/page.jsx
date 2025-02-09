'use client'

import React, { useState } from 'react';

const SignIn = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  // Signup form fields
  const [userName, setUserName] = useState('');
  const [interest, setInterest] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [signupLoginId, setSignupLoginId] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const interests = ['cricket', 'football', 'salsa', 'reading', 'hiking', 'coding', 'movies']; // Example interests

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt:', { loginId, password });
    setLoginId('');
    setPassword('');


    try {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                loginId, 
                password, 
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login was successful!
            localStorage.setItem('token', data.token)
            console.log(data, "Here is the data from the token")
            localStorage.setItem('userName', data.user)
            window.location.href = '/';  
        } else {
            // Login failed
            console.error('Login failed:', data);
            alert(`Login failed: ${data.error}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Error during login: ' + error.message);
    }

    
  };

  const handleSignup = async (e) => {
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
        const response = await fetch('/api/auth/signup', {  // Your signup API endpoint
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

        const data = await response.json(); 

        if (response.ok) {
        
            console.log('Signup successful:', data);
            setShowLogin(true);  
           

        } else {
        
            console.error('Signup failed:', data);  
            alert(`Signup failed: ${data.error}`);

        }

    } catch (error) {
    
        console.error('Error during signup:', error);
        alert('Error during signup: ' + error.message);  // Display a generic error message
    }

    // Reset form and show login
    setUserName('');
    setInterest('');
    setAge('');
    setMobile('');
    setEmail('');
    setSignupLoginId('');
    setSignupPassword('');
    setSignupConfirmPassword('');

    setShowLogin(true);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      {showLogin ? (
        <div>
          <h2 style={{ marginBottom: '20px' }}>Sign In</h2>
          <form onSubmit={handleLogin}>
            {/* Login Form */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="loginId" style={{ display: 'block', marginBottom: '5px' }}>Login ID:</label>
              <input
                type="text"
                id="loginId"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Login
            </button>
          </form>
          <button onClick={handleSignupClick} style={{ marginTop: '10px', backgroundColor: '#008CBA', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Signup Now
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
          <h3 style={{ marginBottom: '20px' }}>Signup</h3>
          <form onSubmit={handleSignup}>
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
              Signup
            </button>
          </form>
          <button onClick={handleLoginClick} style={{ marginTop: '10px', backgroundColor: '#008CBA', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Back to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
