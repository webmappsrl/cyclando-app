import { User } from '../../models/user.model';

export interface AuthState {
  error: string | null;
  isAuthenticated: boolean;
  emailConfirmed: boolean;
  loading: boolean;
  user: User | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  user: null,
  loading: false,
  emailConfirmed: false,
  error: null,
  isAuthenticated: false,
};
