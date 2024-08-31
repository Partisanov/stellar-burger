export const getAccessToken = () => localStorage.getItem('accessToken');
export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const deleteTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const setResetPassword = () => {
  localStorage.setItem('resetPassword', 'true');
};
export const getResetPassword = (): boolean => {
  const value = localStorage.getItem('resetPassword');
  return value === 'true';
};

export const clearResetPassword = () => {
  localStorage.removeItem('resetPassword');
};
