import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [hasAccess, setHasAccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getProtectedData = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      setHasAccess(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/auth/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.access) {
          setHasAccess(true);
        } else {
          setHasAccess(false);
        }
      } else {
        console.log("Failed to fetch protected data");
        setHasAccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setHasAccess(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getProtectedData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
