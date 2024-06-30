import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const SPProtect = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [role, setRole] = useState(null)
  console.log(isAuthenticated)
  console.log(role)
    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URI}/protectedRoute`,{ withCredentials: true });
                setIsAuthenticated(response.data.valid);
                setRole(response.data.role)

            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkTokenValidity();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if(!isAuthenticated|| role !=='xxxx'){
        return <Navigate to = "/" />
    }
    return <Outlet />
};

export default SPProtect;
