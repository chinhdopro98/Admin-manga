import axios, { AxiosRequestConfig } from 'axios';

import { logger } from '@/lib/default-logger';

import { url } from '.';

const apiClient = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Xử lý phản hồi và lỗi toàn cục (các interceptor)
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('access_token');
    const token = '68|5w9H8KyD7YE6K2PT0YJHUQqPtjlLum8JgB93ybzJ';
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    logger.debug('API call error:', error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    logger.debug('API response error:', error);
  }
);

export const getApi = async (url: string, queryParams?: any, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.get(url, {
      ...config,
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postApi = async (url: string, data: any, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateApi = async (url: string, data: any, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteApi = async (url: string, config?: AxiosRequestConfig) => {
  try {
    const response = await apiClient.delete(url, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
