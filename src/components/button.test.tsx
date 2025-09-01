import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import Button from './button'

interface Mock {
  color: string
  hoverColor?: string
  onClick: () => void
  borderless?: boolean
  underline?: boolean
  children: string
}

const mock: Mock = {
  color: 'bg-gray-500',
  hoverColor: 'hover:bg-gray-500',
  onClick: () => [],
  borderless: true,
  underline: true,
  children: 'Test Button',
}

describe('Button', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <Button
          color={mock.color}
          hoverColor={mock.hoverColor}
          onClick={mock.onClick}
          borderless={mock.borderless}
          underline={mock.underline}
        >
          {mock.children}
        </Button>
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <Button
          color={mock.color}
          hoverColor={mock.hoverColor}
          onClick={mock.onClick}
          borderless={mock.borderless}
          underline={mock.underline}
        >
          {mock.children}
        </Button>
      )
    )

    const content = screen.getByRole('button')

    expect(content).toBeInTheDocument()
    expect(content).toHaveClass(mock.color)
    expect(content).toHaveTextContent(mock.children)
  })
})
