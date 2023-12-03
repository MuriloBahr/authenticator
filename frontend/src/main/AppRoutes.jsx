import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from '../LoginForm/index';
import RegisterForm from '../RegisterForm';
import ConfirmationScreen from '../ConfirmationScreen/index';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/confirmation" element={<ConfirmationScreen />} />
        </Routes>
    );
};

export default AppRoutes;