import { RootState } from 'redux/types';

export const getUserToken = (store: RootState): string | null => store.login.token;
export const isLoggedIn = (store: RootState): boolean => store.login.isLoggedIn;
