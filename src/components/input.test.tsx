import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import Input from './input'
import { ChangeEvent } from 'react'

interface Mock {
  id?: string
  icon?: string
  value: string
  type?: string
  iconSize?: number
  placeholder: string
  onCLickIcon?: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const mock: Mock = {
  id: 'mockId',
  icon: '/icons/eye.svg',
  value: 'mockpassword',
  type: 'text',
  iconSize: 28,
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
          icon={mock.icon}
          value={mock.value}
          type={mock.type}
          iconSize={mock.iconSize}
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
          icon={mock.icon}
          value={mock.value}
          type={mock.type}
          iconSize={mock.iconSize}
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
    expect(content).toHaveClass('border-y-2 border-l-2 rounded-l-sm')
  })
})
