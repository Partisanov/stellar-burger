import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/constants.ts';
import {
  IApiError,
  IAxiosErrorResponse,
  ILoginForm,
  ILoginResponse,
  IRegisterForm,
  IUser,
} from '../../utils/types.ts';
import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from '../../utils/local-storage.ts';
import { toast } from 'react-toastify';

export const login = createAsyncThunk<
  ILoginResponse,
  ILoginForm,
  { rejectValue: IApiError }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post<ILoginResponse>(
      `${BASE_URL}/auth/login`,
      { email, password },
    );
    if (!response.data.success) {
      toast.error(response.data.message || 'Login failed');
      return rejectWithValue({
        message: response.data.message || 'Login failed',
      });
    }
    setTokens(response.data.accessToken, response.data.refreshToken);
    toast.success('Вход успешно выполнен!');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IAxiosErrorResponse>;
    toast.error(axiosError.response?.data?.message);
    return rejectWithValue({
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Login failed',
    });
  }
});

export const register = createAsyncThunk<
  ILoginResponse,
  IRegisterForm,
  { rejectValue: IApiError }
>('auth/register', async ({ email, password, name }, { rejectWithValue }) => {
  try {
    const response = await axios.post<ILoginResponse>(
      `${BASE_URL}/auth/register`,
      { email, password, name },
    );
    if (!response.data.success) {
      toast.error(response.data.message || 'Registration failed');
      return rejectWithValue({
        message: response.data.message || 'Registration failed',
      });
    }
    setTokens(response.data.accessToken, response.data.refreshToken);
    toast.success('Регистрация прошла успешно!');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IAxiosErrorResponse>;
    toast.error(axiosError.response?.data?.message);
    return rejectWithValue({
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        'An error occurred',
    });
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: IApiError }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {
        token: getRefreshToken() || '',
      });
      deleteTokens();
      toast.success('Вы успешно вышли из учетной записи.!');
    } catch (error) {
      const axiosError = error as AxiosError<IAxiosErrorResponse>;
      toast.error(
        axiosError.response?.data?.message ||
          'Произошла ошибка. Попробуйте еще раз.',
      );
      return rejectWithValue({
        message:
          axiosError.response?.data?.message ||
          axiosError.message ||
          'An error occurred',
      });
    }
  },
);

export const updateUser = createAsyncThunk<
  ILoginResponse,
  IRegisterForm,
  { rejectValue: IApiError }
>('auth/updateUser', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.patch<ILoginResponse>(
      `${BASE_URL}/auth/user`,
      { name, email, password },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getAccessToken() || ''}`,
        },
      },
    );
    toast.success('Данные успешно обновлены!');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<IAxiosErrorResponse>;
    toast.error(
      axiosError.response?.data?.message ||
        axiosError.message ||
        'An error occurred',
    );
    return rejectWithValue({
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        'An error occurred',
    });
  }
});

export const refreshToken = async () => {
  try {
    const response = await axios.post<{
      accessToken: string;
      refreshToken: string;
    }>(`${BASE_URL}/auth/token`, { token: getRefreshToken() || '' });
    const { accessToken, refreshToken } = response.data;
    setTokens(accessToken, refreshToken);
    return accessToken;
  } catch (error) {
    throw new Error('Не удалось обновить токены');
  }
};

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) return null;

      const response = await axios.get<{ user: IUser }>(
        `${BASE_URL}/auth/user`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,
          },
        },
      );
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;

        if (message === 'jwt expired') {
          try {
            const newAccessToken = await refreshToken();
            const userResponse = await axios.get<{ user: IUser }>(
              `${BASE_URL}/auth/user`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: newAccessToken,
                },
              },
            );
            return userResponse.data.user;
          } catch (refreshError) {
            toast.error(
              'Не удалось обновить токен. Пожалуйста, войдите в систему снова.',
            );
            return rejectWithValue(
              'Не удалось обновить токен. Пожалуйста, войдите в систему снова.',
            );
          }
        }
        return rejectWithValue(message);
      }
      return rejectWithValue('Произошла неизвестная ошибка.');
    }
  },
);
