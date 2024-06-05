export interface User {
  email: string;
  id: number;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
