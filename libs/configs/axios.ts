import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://shippex-demo.bc.brandimic.com/api/method",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// const unauthorizedCode = [401, 400];

// Add an interceptor to set the Authorization header dynamically
// AxiosInstance.interceptors.request.use(
//   async (config) => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         config.headers.token = `Bearer ${token}`;
//       }
//     } catch (error: any) {
//       console.log("interceptor tracker", error.message);
//       console.log("there is error in interceptor oo");
//     }
//     return config;
//   },
//   (error) => {
//     const { response } = error;
//     console.log("a-error", error);

//     if (response && unauthorizedCode.includes(response?.status)) {
//       router.push(routes.LOGIN_SCREEN);
//     }

//     return Promise.reject(error);
//   }
// );

export default AxiosInstance;
