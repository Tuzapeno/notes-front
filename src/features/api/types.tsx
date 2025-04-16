interface RegisterData {
  username: string
  email: string
  password: string
  password_confirmation: string
  cpf: string
}

interface LoginResponseData {
  user: {
    id: number
    username: string
    email: string
    cpf: string
    created_at: string
    updated_at: string
  }
  status: number
  token: string
}

export type { RegisterData }
export type { LoginResponseData }
