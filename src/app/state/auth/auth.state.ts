import { User, UserProfile } from '../../models/user.model';

export interface AuthState {
  isAuthenticated: boolean;
  emailConfirmed: boolean;
  loading: boolean;
  error?: string;
  user?: User;
  userProfile?: UserProfile;
  token?: string;
}

export const initialAuthState: AuthState = {
  loading: false,
  emailConfirmed: false,
  isAuthenticated: false,
};
