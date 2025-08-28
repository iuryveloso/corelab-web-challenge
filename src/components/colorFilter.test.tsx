import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import ColorFilter from './colorFilter'
import { Note } from '@/interfaces/noteInterfaces'
import { Dispatch, SetStateAction } from 'react'

interface Mock {
  colors: Note['color'][]
  setColor: Dispatch<SetStateAction<Note['color'] | 'all'>>
}

const mock: Mock = {
  colors: [],
  setColor: () => []
}

describe('ColorFilter', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <ColorFilter
        colors={mock.colors}
        setColor={mock.setColor}
        />
      )
    )
  })
})
