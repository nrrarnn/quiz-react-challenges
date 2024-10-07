import api from './api';

interface LoginResponse {
  token: string;
  user: {
    email: string;
    username: string;
  };
}

interface RegisterResponse {
  token : string;
}


export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Something went wrong';
  }
};


export const register = async (username: string, email: string, password: string): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Something went wrong during registration';
  }
};