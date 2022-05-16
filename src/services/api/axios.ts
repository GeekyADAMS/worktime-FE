import Axios from "axios";
import { parse } from "../../modules/__env";

const baseURL = parse(import.meta.env.VITE_DEV_API_BASE_URL, "default");
const axios = Axios.create({
  baseURL,
  timeout: 30000,
});
// Intercept before sending HTTP requests
axios.interceptors.request.use(
  (config) => {
    /**
     * you can process config here
     */
    if (config.headers === undefined) {
      config.headers = {};
    }

    config.headers["Authorization"] = `Bearer ${parse(
      import.meta.env.VITE_DEV_API_TOKEN,
      "default"
    )}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Intercept after received HTTP requests
axios.interceptors.response.use(
  (response) => {
    /**
     * you can process response and error here
     */

    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status;
      const msg = error.response.data.message;
      console.error(`Code: ${code}, Message: ${msg}`);
      console.error(`[Axios Error]`, error.response);
    } else {
      console.error(`${error}`);
    }
    return Promise.reject(error.response.data.error);
  }
);
export default axios;
