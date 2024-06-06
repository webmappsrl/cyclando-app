import { User, UserProfile } from '../../models/user.model';

export interface AuthState {
  error: string | null;
  isAuthenticated: boolean;
  emailConfirmed: boolean;
  loading: boolean;
  user: User | null;
  userProfile: UserProfile | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  user: null,
  userProfile: null,
  loading: false,
  emailConfirmed: false,
  error: null,
  isAuthenticated: false,
};
