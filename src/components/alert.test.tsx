import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import Alert from './alert'

interface Alert {
  errors: { message: string }[]
  message: string
  showErrors: boolean
  showMessage: boolean
}

const mock: Alert = {
  errors: [{ message: 'mock message error' }],
  message: 'mock message',
  showErrors: false,
  showMessage: false,
}

describe('Card', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <Alert
          errors={mock.errors}
          message={mock.message}
          showErrors={mock.showErrors}
          showMessage={mock.showMessage}
        />
      )
    )
  })

  it('renders a right content', async () => {
    await act(async () =>
      render(
        <Alert
          errors={mock.errors}
          message={mock.message}
          showErrors={mock.showErrors}
          showMessage={mock.showMessage}
        />
      )
    )

    const errors = screen.getByText(mock.errors[0].message)
    expect(errors).toBeInTheDocument()

    const message = screen.getByText(mock.message)
    expect(message).toBeInTheDocument()
  })
})
