import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import Dashboard from './page'
import { Note } from '@/interfaces/noteInterfaces'

interface Mock {
  note: Note[]
  fetch: (data: Note[]) => jest.Mock
}

const mock: Mock = {
  note: [
    {
      id: '1',
      title: 'Mock Title ',
      body: 'Mock body',
      color: 'white',
      favorited: false,
    }
  ],
  fetch: (data) => {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data,
      })
    )
  }
}

describe('Page', () => {
  window.fetch = mock.fetch(mock.note)
  it('renders', async () => {
    await act(async () => render(<Dashboard />))
  })

})
