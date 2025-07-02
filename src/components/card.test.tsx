import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import Card from './card'
import { Errors, Note } from '@/interfaces/noteInterfaces'
import { Dispatch, SetStateAction } from 'react'

const mockData: Note = {
  id: '1',
  title: 'Mock Title 1',
  body: 'Mock body 1',
  color: 'white',
  favorited: false,
}

const mockEmptyData: Note = {
  id: '',
  title: '',
  body: '',
  color: 'white',
  favorited: false,
}

const mockSetNotes: Dispatch<SetStateAction<Note[]>> = () => []
const mockSetErrors: Dispatch<SetStateAction<Errors['errors']>> = () => []
const mockSetMessage: Dispatch<SetStateAction<string>> = () => ''
const mockSetShowRestore: Dispatch<
  SetStateAction<{ visible: boolean; note: Note }>
> = () => {}
const mockNoteUpdate: (
  note: Note,
  setNotes: typeof mockSetNotes,
  setErrors: typeof mockSetErrors,
  setMessage: typeof mockSetMessage
) => void = () => []
const mockNoteDestroy: (
  id: string,
  setNotes: typeof mockSetNotes,
  setMessage: typeof mockSetMessage
) => void = () => []

describe('Card', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <Card
          note={mockData}
          emptyNote={mockEmptyData}
          setNotes={mockSetNotes}
          setErrors={mockSetErrors}
          setMessage={mockSetMessage}
          setShowRestore={mockSetShowRestore}
          noteDestroy={mockNoteDestroy}
          noteUpdate={mockNoteUpdate}
        />
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <Card
          note={mockData}
          emptyNote={mockEmptyData}
          setNotes={mockSetNotes}
          setErrors={mockSetErrors}
          setMessage={mockSetMessage}
          setShowRestore={mockSetShowRestore}
          noteDestroy={mockNoteDestroy}
          noteUpdate={mockNoteUpdate}
        />
      )
    )

    const content = screen.getAllByRole('textbox')

    expect(content[0]).toBeInTheDocument()
    expect(content[0]).toHaveValue(mockData.title)

    expect(content[1]).toBeInTheDocument()
    expect(content[1]).toHaveTextContent(mockData.body)
  })
})
