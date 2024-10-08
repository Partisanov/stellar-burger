import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUser, login, logout, register, updateUser } from './action';
import { IApiError, ILoginResponse, IUser } from '../../utils/types';

export interface AuthState {
  user: {
    email: string | null;
    name: string | null;
  };
  isLogIn: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  user: {
    email: null,
    name: null,
  },
  isLogIn: false,
  isLoading: false,
  hasError: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.isLoading = false;
          state.user = {
            email: action.payload.user.email,
            name: action.payload.user.name,
          };
          state.isLogIn = true;
          state.hasError = false;
          state.errorMessage = null;
        },
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<IApiError | undefined>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errorMessage = action.payload?.message || 'Login failed';
        },
      )
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.isLoading = false;
          state.user = {
            email: action.payload.user.email,
            name: action.payload.user.name,
          };
          state.isLogIn = true;
          state.hasError = false;
          state.errorMessage = null;
        },
      )
      .addCase(
        register.rejected,
        (state, action: PayloadAction<IApiError | undefined>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errorMessage = action.payload?.message || 'Registration failed';
        },
      )
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {
          email: null,
          name: null,
        };
        state.isLogIn = false;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(
        logout.rejected,
        (state, action: PayloadAction<IApiError | undefined>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errorMessage = action.payload?.message || 'Logout failed';
        },
      )
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.isLoading = false;
          state.user = {
            email: action.payload.user.email,
            name: action.payload.user.name,
          };
          state.isLogIn = true;
          state.hasError = false;
          state.errorMessage = null;
        },
      )
      .addCase(
        updateUser.rejected,
        (state, action: PayloadAction<IApiError | undefined>) => {
          state.isLoading = false;
          state.hasError = true;
          state.errorMessage = action.payload?.message || 'Update failed';
        },
      )
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
        state.errorMessage = null;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<IUser | null>) => {
          state.isLoading = false;
          if (action.payload) {
            state.user = {
              email: action.payload.email,
              name: action.payload.name,
            };
            state.isLogIn = true;
          } else {
            state.isLogIn = false;
          }
          state.hasError = false;
          state.errorMessage = null;
        },
      )
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = error.message || 'Failed to fetch user';
      });
  },
});
