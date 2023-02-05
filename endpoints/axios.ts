import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://eclipse-api.onpar.co.in",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(async function (config) {
  return config;
});

axiosInstance.interceptors.response.use(
  async function (result) {
    const apiName = result?.config?.url;
    console.log(`API result ${apiName}`, result);
    return result;
  },
  async function (error) {
    const apiName = error?.config?.url;
    console.log(`API error ${apiName}`, error);

    if (error.code === "ECONNABORTED") {
      // eslint-disable-next-line no-throw-literal
      throw { customMsg: "Damn! something broke." };
    }
    throw error.response.data;
  }
);

export const AXIOS = async (config: AxiosRequestConfig) => {
  const getRes = await axiosInstance(config);
  return getRes.data;
};

export const api = { AXIOS };
