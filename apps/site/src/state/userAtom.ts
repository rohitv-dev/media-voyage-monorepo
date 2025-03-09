import { atom } from "jotai";

export interface User {
  id: number;
  username: string;
  email: string;
  createdOn: string;
  updatedOn: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const initialUser: User = {
  id: 0,
  username: "",
  email: "",
  createdOn: "",
  updatedOn: "",
};

export const authAtom = atom<AuthState>({
  isLoggedIn: false,
  isLoading: true,
});

export const userAtom = atom<User>({
  id: 0,
  username: "",
  email: "",
  createdOn: "",
  updatedOn: "",
});
