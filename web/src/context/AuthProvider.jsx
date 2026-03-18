import { useLayoutEffect, useState } from "react";
import AuthContext from "../hooks/AuthContext.js";
import api from "../api/api.js";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    let refreshPromise = null;

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        if (originalRequest.url?.includes("/auth/token/refresh")) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            if (!refreshPromise) {
              refreshPromise = api
                .post("/auth/token/refresh", {}, { withCredentials: true })
                .finally(() => (refreshPromise = null));
            }

            await refreshPromise;
            return api(originalRequest);
          } catch (refreshError) {
            setIsAuthenticated(false);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    const verifyAuth = async () => {
      try {
        const response = await api.get("/auth/me", { withCredentials: true });
        setIsAuthenticated(true);
        setUser(response.data.data);
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials, { withCredentials: true });
    const userRes = await api.get("/auth/me", { withCredentials: true });
    setUser(userRes.data.data);
    setIsAuthenticated(true);
    return userRes.data.data;
  };


  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) return null; // Block rendering until auth is verified

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};