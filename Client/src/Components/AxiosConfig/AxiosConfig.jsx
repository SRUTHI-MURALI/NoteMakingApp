  import axios from "axios";
  import { Base_Url } from "../../../Config/Config.jsx";

  const api = axios.create({
    baseURL: `${Base_Url}/user`,
  });

  api.interceptors.request.use(
    (config) => {
      const userData = localStorage.getItem("userData");

      const parseData = userData ? JSON.parse(userData) : null;
      const token = parseData.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export const SendOtp = (name, email, phone, password) => {
    console.log(Base_Url);
    return axios.post(`${Base_Url}/user/register`, {
      name,
      email,
      phone,
      password,
    });
  };

  export const VerifyOtp = (verificationCode) => {
    console.log("verify", verificationCode);
    return axios.post(`${Base_Url}/user/verifyOtp`, { verificationCode });
  };

  export const userLogin = (email, password) => {
    return axios.post(`${Base_Url}/user/login`, { email, password });
  };

  export const addNotes = (title, summary, content, image, file, userId) => {
    return api.post(`/addNotes`, {
      title,
      summary,
      content,
      image,
      file,
      userId,
    });
  };

  export const getNotes = (id) => {
    
    return api.get(`/getNotes/${id}`);
  };

  export const tagNote = (id) => {
    return api.put(`/tagNote/${id}`);
  };

  export const untagNote = (id) => {
    return api.put(`/untagNote/${id}`);
  };

  export const getEditData = (id) => {
    return api.get(`/getEditData/${id}`);
  };

  export const editNote = (title, summary, content, id) => {
    return api.put(`/editNote/${id}`, {
      title,
      summary,
      content,
    });
  };

  export const deleteNote = (id) => {
    return api.delete(`/deleteNote/${id}`);
  };

  export const getTaggedNotes = (id) => {
    return api.get(`/getTaggedNotes/${id}`);
  };

  export default api;
