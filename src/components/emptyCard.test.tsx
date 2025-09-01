import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import EmptyCard from './emptyCard'
import { Errors, Note } from '@/interfaces/noteInterfaces'
import { Dispatch, SetStateAction } from 'react'
import { randomUUID } from 'node:crypto'

interface Mock {
  message: string
  setNotes: Dispatch<SetStateAction<Note[]>>
  setErrors: Dispatch<SetStateAction<Errors['errors']>>
  setMessage: Dispatch<SetStateAction<string>>
  noteStore: (
    note: Note,
    setNotes: Mock['setNotes'],
    setErrors: Mock['setErrors'],
    setMessage: Mock['setMessage'],
    token: string
  ) => void
  token: string
}

const mock: Mock = {
  message: '',
  setNotes: () => [],
  setErrors: () => [],
  setMessage: () => '',
  noteStore: () => [],
  token: randomUUID(),
}

describe('EmptyCard', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <EmptyCard
          message={mock.message}
          setNotes={mock.setNotes}
          setErrors={mock.setErrors}
          setMessage={mock.setMessage}
          noteStore={mock.noteStore}
          token={mock.token}
        />
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <EmptyCard
          message={mock.message}
          setNotes={mock.setNotes}
          setErrors={mock.setErrors}
          setMessage={mock.setMessage}
          noteStore={mock.noteStore}
          token={mock.token}
        />
      )
    )

    const inputParent = screen.getByRole('textbox').parentElement
    if(inputParent) fireEvent.focus(inputParent)

    const content = screen.getAllByRole('textbox')

    expect(content[0]).toBeInTheDocument()
    expect(content[0]).toHaveAttribute('placeholder', 'Title')
    
    expect(content[1]).toBeInTheDocument()
    expect(content[1]).toHaveAttribute('placeholder', 'Take a note...')
  })
})
