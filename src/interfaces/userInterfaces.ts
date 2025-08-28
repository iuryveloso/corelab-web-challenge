export interface User {
  name: string
  email: string
  avatar: string
}

export interface Errors {
  errors: Array<{ message: string }>
}

export interface Message {
  message: string
}

export interface Unauthenticated {
  unauthenticated: boolean
}
