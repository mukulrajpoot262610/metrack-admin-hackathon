import axios from "axios";

const api = axios.create({
  // baseURL: `http://localhost:3001`,
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// AUTH
export const refresh = () => api.get("/api/refresh");
export const sendPasswordResetLink = (data) =>
  api.post("/api/forget-password", data);
export const setNewPassword = (data) => api.post("/api/reset-password", data);
export const login = (data) => api.post("/api/admin/login", data);
export const logout = () => api.post("/api/admin/logout");

// USER
export const getUsers = (data) => api.post("/api/admin/get-users", data);
export const deleteUser = (id) => api.delete(`/api/admin/delete-user/${id}`);

// COURSES
export const getCourses = () => api.get("/api/admin/get-all-course");
export const getCourse = (id) => api.get(`/api/admin/get-course/${id}`);
export const deleteCourse = (id) =>
  api.delete(`/api/admin/delete-course/${id}`);
export const addCourses = (data) => api.post("/api/admin/add-courses", data);
export const editCourses = (data) => api.post("/api/admin/edit-courses", data);
export const publishCourse = (id) => api.put(`/api/admin/publish-course/${id}`);
export const unPublishCourse = (id) =>
  api.put(`/api/admin/unpublish-course/${id}`);

// CHANNELS
export const getChannels = () => api.get("/api/admin/get-all-channel");
export const getChannel = (id) => api.get(`/api/admin/get-channel/${id}`);
export const addChannel = (data) => api.post("/api/admin/add-channel", data);

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
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`, {
          withCredentials: true,
        });
        return api.request(originalRequest);
      } catch (err) {
        console.log(err);
      }
    }
    throw error;
  }
);

export default api;
