import { User } from '../../models/user.model';

export interface AuthState {
  error: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};
