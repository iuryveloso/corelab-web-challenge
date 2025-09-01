import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import Input from './input'
import { ChangeEvent, JSX } from 'react'
import StarIcon from '@/icons/star'

interface Icon {
  className: string
}

interface Mock {
  id?: string
  Icon?: ({ className }: Icon) => JSX.Element
  value: string
  type?: string
  iconClassName?: string
  placeholder: string
  onCLickIcon?: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const mock: Mock = {
  id: 'mockId',
  Icon: StarIcon,
  value: 'mockpassword',
  type: 'text',
  iconClassName: 'h-6 w-6',
  placeholder: 'Mock placeholder',
  onCLickIcon: () => [],
  onChange: () => []
}

describe('Input', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <Input
          id={mock.id}
          Icon={mock.Icon}
          value={mock.value}
          type={mock.type}
          iconClassName={mock.iconClassName}
          placeholder={mock.placeholder}
          onCLickIcon={mock.onCLickIcon}
          onChange={mock.onChange}
        />
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <Input
          id={mock.id}
          Icon={mock.Icon}
          value={mock.value}
          type={mock.type}
          iconClassName={mock.iconClassName}
          placeholder={mock.placeholder}
          onCLickIcon={mock.onCLickIcon}
          onChange={mock.onChange}
        />
      )
    )

    const content = screen.getByDisplayValue(mock.value)

    expect(content).toBeInTheDocument()
    expect(content).toHaveAttribute('type', mock.type)
    expect(content).toHaveAttribute('id', mock.id)
    expect(content).toHaveAttribute('placeholder', mock.placeholder)
    expect(content).toHaveClass('px-3 py-1 outline-none')
  })
})
