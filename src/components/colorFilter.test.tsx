import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import ColorFilter from './colorFilter'
import { Note } from '@/interfaces/noteInterfaces'
import { Dispatch, SetStateAction } from 'react'

const MockColors: Note['color'][] = [] 
const MockSetColor: Dispatch<SetStateAction<Note['color'] | 'all'>> = () => []

describe('ColorFilter', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <ColorFilter
        colors={MockColors}
        setColor={MockSetColor}
        />
      )
    )
  })
})
