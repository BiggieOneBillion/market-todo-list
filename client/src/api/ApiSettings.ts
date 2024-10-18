import axios from "axios";
import { apibaseUrl, timeOut } from "./constants";

// Create an instance of axios with a custom configuration
const api = axios.create({
  baseURL: apibaseUrl,
  timeout: timeOut, // Set a timeout for requests (in milliseconds)
});

// api.interceptors.request.use(
//   (config) => {
//     // Retrieve the token from localStorage or any secure storage you use
//     const token = localStorage.getItem('authToken'); // Replace with your token storage logic

//     // If the token exists, add it to the request headers
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // Always return the modified config
//     return config;
//   },
//   (error) => {
//     // Handle any request errors here
//     return Promise.reject(error);
//   }
// );



export default api;
