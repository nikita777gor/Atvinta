export const API_STATUS = {
  success: 'success',
  error: 'error'
} as const;

export type TApiStatus = typeof API_STATUS[keyof typeof API_STATUS];
