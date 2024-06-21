import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
  console.log(isAuthenticated)
    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URI}/protectedRoute`,{ withCredentials: true });
                setIsAuthenticated(response.data.valid);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkTokenValidity();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
