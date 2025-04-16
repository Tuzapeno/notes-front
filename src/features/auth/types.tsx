interface AuthState {
  isAuthenticated: boolean
  username: string | null
  accessToken: string | null
}

interface UserCredentials {
  username: string
  accessToken: string
}

export type { AuthState, UserCredentials }
