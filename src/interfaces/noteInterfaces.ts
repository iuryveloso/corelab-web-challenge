export interface Note {
  id: string
  title: string
  body: string
  color:
    | 'blue'
    | 'teal'
    | 'yellow'
    | 'salmon'
    | 'red'
    | 'sky'
    | 'pink'
    | 'lime'
    | 'orange'
    | 'cloud'
    | 'gray'
    | 'brown'
    | 'white'
  favorited: boolean
}

export interface Message {
  message: string
}

export interface Errors {
 errors: Array<{ message: string }>
}
