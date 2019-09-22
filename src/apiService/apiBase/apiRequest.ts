import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const has = require("lodash/has");
const CancelToken = axios.CancelToken;
const instance: AxiosInstance = axios.create({
  timeout: 500000,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "-1",
  },
  withCredentials: true
});

export let uploadApi: AxiosInstance = axios.create({
  timeout: 500000,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "-1",
  }
});

function success(resp:any) {
  if (resp.status === 200) {
    if (resp.data.errorCode) {
      return Promise.reject(new Error());
    } else {
      return resp.data;
    }
  }
}

function error(error:any) {
  if (error.response && error.response.status === 401) {
    // setTimeout(() => {
    //   history.go(0);
    // }, 2000);
  } else if (error.response && error.response.status === 403) {

  } else {

  }

  return Promise.reject(error);
}

instance.interceptors.response.use(success, error);

export function initHeaders(user:any) {
  if (has(user, "access_token")) {
    instance.defaults.headers.accessToken = '';
  } else if (has(user, "accessToken")) {
    instance.defaults.headers.accessToken = '';
  } else {
    // console.info('没有token 准备登出');
    // history.go(0);
  }
}

export function resetHeaders() {
  delete instance.defaults.headers.userId;
  delete instance.defaults.headers.accessToken;
}

// 因为使用interceptors去掉axios response的status, headers等属性，所以需要重新改对应方法的返回值
export default instance as {
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
};