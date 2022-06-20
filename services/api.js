import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3001`,
  //   baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// AUTH
export const sendPasswordResetLink = (data) =>
  api.post("/api/forget-password", data);
export const setNewPassword = (data) => api.post("/api/reset-password", data);
export const login = (data) => api.post("/api/admin/login", data);
export const logout = () => api.post("/api/admin/logout");

// USER
export const getUsers = (data) => api.post("/api/admin/get-users", data);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin-refresh`,
          {
            withCredentials: true,
          }
        );
        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    throw error;
  }
);

export default api;
