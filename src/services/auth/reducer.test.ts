import { authSlice, initialState } from './reducer';
import { login, register, logout, updateUser, getUser } from './action';
import {
  IApiError,
  ILoginForm,
  ILoginResponse,
  IRegisterForm,
  IUser,
} from '../../utils/types';

describe('authSlice', () => {
  const mockUser: IUser = {
    email: 'test@example.com',
    name: 'Test User',
  };

  const mockLoginResponse: ILoginResponse = {
    success: true,
    accessToken: 'mockAccessToken',
    refreshToken: 'mockRefreshToken',
    user: mockUser,
  };

  const mockApiError: IApiError = {
    message: 'Error occurred',
  };

  const mockLoginForm: ILoginForm = {
    email: 'test@example.com',
    password: 'password123',
  };

  const mockRegisterForm: IRegisterForm = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle login.pending', () => {
    const nextState = authSlice.reducer(initialState, {
      type: login.pending.type,
    });
    expect(nextState.isLoading).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle login.fulfilled', () => {
    const nextState = authSlice.reducer(
      initialState,
      login.fulfilled(mockLoginResponse, '', mockLoginForm),
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isLogIn).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle login.rejected', () => {
    const nextState = authSlice.reducer(
      initialState,
      login.rejected(new Error(mockApiError.message), '', mockLoginForm),
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
    expect(nextState.errorMessage).toBe('Login failed');
  });

  it('should handle register.pending', () => {
    const nextState = authSlice.reducer(initialState, {
      type: register.pending.type,
    });
    expect(nextState.isLoading).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle register.fulfilled', () => {
    const nextState = authSlice.reducer(
      initialState,
      register.fulfilled(mockLoginResponse, '', mockRegisterForm),
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isLogIn).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle register.rejected', () => {
    const nextState = authSlice.reducer(
      initialState,
      register.rejected(new Error(mockApiError.message), '', mockRegisterForm),
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
    expect(nextState.errorMessage).toBe('Registration failed');
  });

  it('should handle logout.pending', () => {
    const nextState = authSlice.reducer(initialState, {
      type: logout.pending.type,
    });
    expect(nextState.isLoading).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle logout.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      user: mockUser,
      isLogIn: true,
    };
    const nextState = authSlice.reducer(
      loggedInState,
      logout.fulfilled(undefined, '', undefined),
    ); // Заменили на undefined
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual({ email: null, name: null });
    expect(nextState.isLogIn).toBe(false);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle logout.rejected', () => {
    const nextState = authSlice.reducer(
      initialState,
      logout.rejected(new Error(mockApiError.message), '', undefined),
    ); // Заменили на undefined
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
    expect(nextState.errorMessage).toBe('Logout failed');
  });

  it('should handle updateUser.pending', () => {
    const nextState = authSlice.reducer(initialState, {
      type: updateUser.pending.type,
    });
    expect(nextState.isLoading).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle updateUser.fulfilled', () => {
    const nextState = authSlice.reducer(
      initialState,
      updateUser.fulfilled(mockLoginResponse, '', mockRegisterForm),
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isLogIn).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle updateUser.rejected', () => {
    const nextState = authSlice.reducer(
      initialState,
      updateUser.rejected(
        new Error(mockApiError.message),
        '',
        mockRegisterForm,
      ),
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
    expect(nextState.errorMessage).toBe('Update failed');
  });

  it('should handle getUser.pending', () => {
    const nextState = authSlice.reducer(initialState, {
      type: getUser.pending.type,
    });
    expect(nextState.isLoading).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle getUser.fulfilled with user data', () => {
    const nextState = authSlice.reducer(
      initialState,
      getUser.fulfilled(mockUser, '', undefined),
    ); // Заменили на undefined
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isLogIn).toBe(true);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle getUser.fulfilled without user data', () => {
    const nextState = authSlice.reducer(
      initialState,
      getUser.fulfilled(null, '', undefined),
    ); // Заменили на undefined
    expect(nextState.isLoading).toBe(false);
    expect(nextState.user).toEqual({ email: null, name: null });
    expect(nextState.isLogIn).toBe(false);
    expect(nextState.hasError).toBe(false);
    expect(nextState.errorMessage).toBe(null);
  });

  it('should handle getUser.rejected', () => {
    const nextState = authSlice.reducer(
      initialState,
      getUser.rejected(new Error(mockApiError.message), '', undefined),
    ); // Заменили на undefined
    expect(nextState.isLoading).toBe(false);
    expect(nextState.hasError).toBe(true);
    expect(nextState.errorMessage).toBe(mockApiError.message);
  });
});
