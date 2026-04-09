import React, { createContext, useState, useContext, useLayoutEffect } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    let refreshPromise = null;

    // 1. Request Interceptor: Always use the freshest token from storage
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 2. Response Interceptor: Handle 401 and Refresh Logic
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Avoid infinite loops if refresh request itself fails or config is missing
        if (!originalRequest || originalRequest.url?.includes("/api/auth/refresh-token")) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true; // Mark to prevent second retry

          try {
            // Only start one refresh call even if 10 requests fail at once
            if (!refreshPromise) {
              refreshPromise = api
                .post("/api/auth/refresh-token", {}, { withCredentials: true })
                .then((res) => {
                  const newToken = res.data.accessToken;
                  localStorage.setItem("token", newToken);
                  return newToken;
                })
                .finally(() => (refreshPromise = null));
            }

            const token = await refreshPromise;

            // CRITICAL: Manually update the header for THIS specific retried request
            // This bypasses any latency in localStorage updates
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          } catch (refreshError) {
            handleLocalLogout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // 3. Multi-Tab Sync: If one tab logs out or fails refresh, others follow
    const syncLogout = (event) => {
      if (event.key === 'token' && !event.newValue) {
        handleLocalLogout();
      }
    };
    window.addEventListener('storage', syncLogout);

    const handleLocalLogout = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
    };

    // Initial check
    const verifyAuth = async () => {
      try {
        const response = await api.get("/api/auth/me", { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data);
      } catch {
        handleLocalLogout();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
      window.removeEventListener('storage', syncLogout);
    };
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/api/auth/login", credentials, { withCredentials: true });
    localStorage.setItem("token", res.data.accessToken);

    // Fetch user details after login
    const userRes = await api.get("/api/auth/me", { withCredentials: true });
    setUser(userRes.data);
    setIsAuthenticated(true);
    return userRes.data;
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
