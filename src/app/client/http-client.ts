import axios from 'axios';





const Axios = axios.create({
  baseURL: "/api",
  timeout: 150000,
  headers: {
    'Content-Type': 'application/json',

  },
});

export class HttpClient {
    private static fake = false;


  static async get<T>(url: string, params?: unknown) {

    const response = await Axios.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await Axios.post<T>(url, data, options);
    return response.data;
  }

  static async put<T>(url: string, data: unknown) {
    const response = await Axios.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string) {
    const response = await Axios.delete<T>(url);
    return response.data;
  }



}
