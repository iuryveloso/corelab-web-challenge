import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import Main from './page'
import { Note } from '@/interfaces/noteInterfaces'

const mockData: Note[] = [
  {
    id: '1',
    title: 'Mock Title ',
    body: 'Mock body',
    color: 'white',
    favorited: false,
  }
]

function mockFetch(data: Note[]) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  )
}

describe('Page', () => {
  window.fetch = mockFetch(mockData)
  it('renders', async () => {
    await act(async () => render(<Main />))
  })

})
