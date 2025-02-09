// app/components/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const [login, setLogin] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setLogin(true)
    }
  },[])

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Is that user logged In", token)
    if (token) {
      setIsLoggedIn(true);
      console.log("Is that user logged In")

      setUserId(localStorage.getItem('userName')); // Replace with actual token decoding logic
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);

    setUserId(null);
    router.push('/');
    window.location.reload();
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      minHeight: '120px',
      backgroundColor: 'black', // Black background
      color: 'white', // White text
      borderBottom: '1px solid #444',
    }}>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', marginRight: '30px', color: 'white' }}>My App</span>
        <Link  href="/" style={{ marginRight: '30px', textDecoration: 'none', color: '#eee', fontWeight: '500', transition: 'color 0.3s', ':hover': { color: 'white' } }}>Home</Link>
        {!login ? <h4>Login to add New User</h4> : <Link href="/add_user" style={{ marginRight: '30px', textDecoration: 'none', color: '#eee', fontWeight: '500', transition: 'color 0.3s', ':hover': { color: 'white' } }}>Add User</Link>}

      
      </div>

      {/* Authentication Section */}
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 1 }}>
        {isLoggedIn ? (
          <>
            <span style={{ marginRight: '20px', color: '#ccc' }}>Logged in as: <span style={{ fontWeight: 'bold', color: 'white' }}>{userId}</span></span>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 15px',
                backgroundColor: '#444',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: '500',
                boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                transition: 'background-color 0.3s ease',
                ':hover': { backgroundColor: '#666' },
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/signin"  // Route to /signin
            style={{
              padding: '10px 15px',
              backgroundColor: '#555',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: '500',
              boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
              transition: 'background-color 0.3s ease',
              ':hover': { backgroundColor: '#777' },
            }}
          >
            Login/Signup
          </a>
        )}
      </div>
    </nav>
  );
}
