import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem('ledgerflow_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const navigate = useNavigate();

    const login = (userData: User) => {
        setUser(userData);
        sessionStorage.setItem('ledgerflow_user', JSON.stringify(userData));
        navigate('/');
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('ledgerflow_user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
