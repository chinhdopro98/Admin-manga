import { authApi } from '../../api/admin';
import apiClient from '../../api/axios';
import { PayloadLogin } from '../interfaces/interfaces';

export const authLogin = async (data: PayloadLogin) => {
  const response = await apiClient.post(authApi, data);
  return response.data;
};


export const authGetRequest = async () => {
  const response = await apiClient.get(authApi);
  return response.data;
};