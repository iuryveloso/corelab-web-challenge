import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import ColorButton from './colorButton'
import { Note } from '@/interfaces/noteInterfaces'

const MockColor: Note['color'] | 'all' = 'white'
const MockEditColor: (color: Note['color'] | 'all') => void = () => []
const MockCustomSize: string = 'h-2 w-2'

describe('ColorButton', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <ColorButton
          color={MockColor}
          editColor={MockEditColor}
          customSize={MockCustomSize}
        />
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <ColorButton
          color={MockColor}
          editColor={MockEditColor}
          customSize={MockCustomSize}
        />
      )
    )

    const content = screen.getByRole('button')

    expect(content).toBeInTheDocument()
    expect(content).toHaveClass(MockCustomSize)
    expect(content).toHaveClass(`bg-card-${MockColor}`)

  })
})
