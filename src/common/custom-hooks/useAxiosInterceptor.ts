import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { useEffect } from "react";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const useAxiosInterceptor = () => {
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config: AdaptAxiosRequestConfig) => {
        const url = config.url || "";
        if (url.includes("login")) return config;

        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          config.headers.Authorization = `Bearer ${jwt}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove the interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};

export default useAxiosInterceptor;
