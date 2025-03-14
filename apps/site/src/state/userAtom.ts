import { atom } from "jotai";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const initialUser: User = {
  id: "",
  name: "",
  email: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: false,
};

export const authAtom = atom<AuthState>({
  isLoggedIn: false,
  isLoading: true,
});

export const userAtom = atom<User>(initialUser);
