import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import CardButton from './cardButton'

const MockOnClickButton: (
  type: 'edit' | 'color' | 'favorite' | 'delete' | 'save'
) => void = () => []

const MockIcon = '/icons/paint.svg'
const MockClassName = 'bg-gray-500'
const MockType = 'color'

describe('CardButton', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <CardButton
          icon={MockIcon}
          className={MockClassName}
          type={MockType}
          onClickButton={MockOnClickButton}
        />
      )
    )
  })

  it('renders a right content', async () => {
      await act(async () =>
        render(
          <CardButton
          icon={MockIcon}
          className={MockClassName}
          type={MockType}
          onClickButton={MockOnClickButton}
        />
        )
      )
  
      const content = screen.getByAltText('Main logo')
  
      expect(content).toBeInTheDocument()
      expect(content).toHaveAttribute('src', MockIcon)
      expect(content).toHaveClass(MockClassName)
    })
})
