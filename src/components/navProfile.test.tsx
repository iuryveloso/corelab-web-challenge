import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import NavProfile from './navProfile'
import { User } from '@/interfaces/userInterfaces'

interface Mock {
  user: User
  onClickLogout: () => void
}

const mock: Mock = {
  user: {
    name: 'Mock Name',
    email: 'mock.email@email.com',
    avatar: 'mock_avatar.png',
  },
  onClickLogout: () => [],
}

const domain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/storage/uploads/`

describe('NavProfile', () => {
  it('renders', async () => {
    await act(async () =>
      render(<NavProfile user={mock.user} onClickLogout={mock.onClickLogout} />)
    )
  })

  it('renders a profile image', async () => {
    await act(async () =>
      render(<NavProfile user={mock.user} onClickLogout={mock.onClickLogout} />)
    )

    const image = screen.getByRole('img')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src',`${domain}${mock.user.avatar}`)
  })

  it('renders hidden items', async () => {
    await act(async () =>
      render(<NavProfile user={mock.user} onClickLogout={mock.onClickLogout} />)
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const buttons = screen.getAllByRole('button')
    expect(buttons[1]).toBeInTheDocument()
    expect(buttons[1]).toHaveClass('cursor-pointer')
    expect(buttons[1]).toHaveTextContent('Sair do Sistema')

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/profile')
    expect(link).toHaveTextContent('Perfil de Usuário')

  })
})
