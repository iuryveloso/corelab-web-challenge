import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import Login from './page'

describe('Page', () => {
  it('renders', async () => {
    await act(async () => render(<Login />))
  })
})
 