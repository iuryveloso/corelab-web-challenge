import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import Card from './card'
import { Errors, Note } from '@/interfaces/noteInterfaces'
import { Dispatch, SetStateAction } from 'react'
import { randomUUID } from 'node:crypto'

interface Mock {
  token: string
  note: Note
  emptyNote: Note
  setNotes: Dispatch<SetStateAction<Note[]>>
  setErrors: Dispatch<SetStateAction<Errors['errors']>>
  setMessage: Dispatch<SetStateAction<string>>
  setShowRestore: Dispatch<SetStateAction<{ visible: boolean; note: Note }>>
  noteUpdate: (
    note: Note,
    setNotes: Mock['setNotes'],
    setErrors: Mock['setErrors'],
    setMessage: Mock['setMessage']
  ) => void
  noteDestroy: (
    id: string,
    setNotes: Mock['setNotes'],
    setMessage: Mock['setMessage']
  ) => void
}

const mock: Mock = {
  token: randomUUID(),
  note: {
    id: '1',
    title: 'Mock Title 1',
    body: 'Mock body 1',
    color: 'white',
    favorited: false,
  },
  emptyNote: {
    id: '',
    title: '',
    body: '',
    color: 'white',
    favorited: false,
  },
  setNotes: () => [],
  setErrors: () => [],
  setMessage: () => '',
  setShowRestore: () => {},
  noteUpdate: () => [],
  noteDestroy: () => [],
}

describe('Card', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <Card
          note={mock.note}
          emptyNote={mock.emptyNote}
          setNotes={mock.setNotes}
          setErrors={mock.setErrors}
          setMessage={mock.setMessage}
          setShowRestore={mock.setShowRestore}
          noteDestroy={mock.noteDestroy}
          noteUpdate={mock.noteUpdate}
          token={mock.token}
        />
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <Card
          note={mock.note}
          emptyNote={mock.emptyNote}
          setNotes={mock.setNotes}
          setErrors={mock.setErrors}
          setMessage={mock.setMessage}
          setShowRestore={mock.setShowRestore}
          noteDestroy={mock.noteDestroy}
          noteUpdate={mock.noteUpdate}
          token={mock.token}
        />
      )
    )

    const content = screen.getAllByRole('textbox')

    expect(content[0]).toBeInTheDocument()
    expect(content[0]).toHaveValue(mock.note.title)

    expect(content[1]).toBeInTheDocument()
    expect(content[1]).toHaveTextContent(mock.note.body)
  })
})
