export interface SnackbarData {
  message: string;
  type: 'success' | 'error' | 'loading' | 'info';
  action?: string;
}
