import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient, getAccessToken, setAccessToken, clearAccessToken } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function initAuth() {
      // 1. If we have a valid token in localStorage, just verify it
      if (getAccessToken()) {
        try {
          const me = await apiClient('/api/auth/me');
          if (!cancelled) setUser(me);
        } catch {
          // Token invalid/expired — try refresh as fallback
          try {
            const refreshRes = await apiClient('/api/auth/refresh', { method: 'POST' });
            setAccessToken(refreshRes.access_token, refreshRes.expires_in);
            const me = await apiClient('/api/auth/me');
            if (!cancelled) setUser(me);
          } catch {
            clearAccessToken();
            if (!cancelled) setUser(null);
          }
        }
      } else {
        // 2. No stored token — try refresh via cookie
        try {
          const refreshRes = await apiClient('/api/auth/refresh', { method: 'POST' });
          setAccessToken(refreshRes.access_token, refreshRes.expires_in);
          const me = await apiClient('/api/auth/me');
          if (!cancelled) setUser(me);
        } catch {
          clearAccessToken();
          if (!cancelled) setUser(null);
        }
      }

      if (!cancelled) setIsLoading(false);
    }

    initAuth();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await apiClient('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAccessToken(data.access_token, data.expires_in);
    setUser(data.user);
    return data;
  }, []);

  const loginWithToken = useCallback(async (token, expiresIn) => {
    setAccessToken(token, expiresIn);
    const me = await apiClient('/api/auth/me');
    setUser(me);
    return me;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient('/api/auth/logout', { method: 'POST' });
    } catch { /* ignore */ }
    clearAccessToken();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const me = await apiClient('/api/auth/me');
    setUser(me);
    return me;
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      loginWithToken,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
