interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  accessToken: string | null;
  id: number | null;
}

interface UserCredentials {
  username: string;
  accessToken: string;
  id: number;
}

export type { AuthState, UserCredentials };
