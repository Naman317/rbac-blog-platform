import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

const Auth = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    return {
      token: localStorage.getItem('token') || null,
      user: JSON.parse(localStorage.getItem('user')) || null,
    };
  });

  const handleLogin = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({ token, user });
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth: authState, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
