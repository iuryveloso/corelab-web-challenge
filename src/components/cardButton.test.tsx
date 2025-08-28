import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import CardButton from './cardButton'

interface Mock {
  type: 'edit' | 'color' | 'favorite' | 'delete' | 'save'
  onClickButton: (type: Mock['type']) => void
  icon: string
  className: string
}

const mock: Mock = {
  onClickButton: () => [],
  icon: '/icons/paint.svg',
  className: 'bg-gray-500',
  type: 'color',
}

describe('CardButton', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <CardButton
          icon={mock.icon}
          className={mock.className}
          type={mock.type}
          onClickButton={mock.onClickButton}
        />
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <CardButton
          icon={mock.icon}
          className={mock.className}
          type={mock.type}
          onClickButton={mock.onClickButton}
        />
      )
    )

    const content = screen.getByAltText('Main logo')

    expect(content).toBeInTheDocument()
    expect(content).toHaveAttribute('src', mock.icon)
    expect(content).toHaveClass(mock.className)
  })
})
