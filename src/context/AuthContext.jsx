import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('misc_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('misc_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // ensure joinedSessions exists for tracking live sessions
    const normalized = { ...userData, joinedSessions: userData.joinedSessions || [] };
    setUser(normalized);
    localStorage.setItem('misc_user', JSON.stringify(normalized));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('misc_user');
  };

  const updateUser = (patch) => {
    setUser((prev) => {
      const updated = { ...(prev || {}), ...patch };
      try {
        localStorage.setItem('misc_user', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
