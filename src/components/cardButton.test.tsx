import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import CardButton from './cardButton'
import { JSX } from 'react'
import StarIcon from '@/icons/star'

interface Icon {
  className: string
}

interface Mock {
  type: 'color' | 'favorite' | 'delete' | 'save' | 'cancel'
  onClickButton: (type: Mock['type']) => void
  Icon?: ({ className }: Icon) => JSX.Element
  iconClassName: string
}

const mock: Mock = {
  onClickButton: () => [],
  Icon: StarIcon,
  iconClassName: 'bg-gray-500',
  type: 'color',
}

describe('CardButton', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <CardButton
          Icon={mock.Icon}
          iconClassName={mock.iconClassName}
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
          Icon={mock.Icon}
          iconClassName={mock.iconClassName}
          type={mock.type}
          onClickButton={mock.onClickButton}
        />
      )
    )

    const content = screen.getByRole('button')
    expect(content).toBeInTheDocument()
  })
})
