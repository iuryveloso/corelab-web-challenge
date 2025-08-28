export interface Credentials {
  old_password: string
  password: string
  password_confirmation: string
}

export interface Errors {
   errors: Array<{ message: string }>
}

export interface Message {
  message: string
}

export interface Token {
  token: string
}
