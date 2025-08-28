import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import ColorButton from './colorButton'
import { Note } from '@/interfaces/noteInterfaces'

interface Mock {
  color: Note['color'] | 'all'
  editColor: (color: Note['color'] | 'all') => void
  customSize: string
}

const mock: Mock = {
  color: 'white',
  editColor: () => [],
  customSize: 'h-2 w-2',
}

describe('ColorButton', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <ColorButton
          color={mock.color}
          editColor={mock.editColor}
          customSize={mock.customSize}
        />
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <ColorButton
          color={mock.color}
          editColor={mock.editColor}
          customSize={mock.customSize}
        />
      )
    )

    const content = screen.getByRole('button')

    expect(content).toBeInTheDocument()
    expect(content).toHaveClass(mock.customSize)
    expect(content).toHaveClass(`bg-card-${mock.color}`)
  })
})
