import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import ColorPick from './colorPick'
import { Note } from '@/interfaces/noteInterfaces'
import { Dispatch, SetStateAction } from 'react'

interface Mock {
  colorPicked: boolean
  setColorPicked: Dispatch<SetStateAction<boolean>>
  editColor: (color: Note['color'] | 'all') => void
}

const mock: Mock = {
  colorPicked: true,
  setColorPicked: () => [],
  editColor: () => [],
}

describe('ColorPick', () => {
  it('renders', async () => {
    await act(async () =>
      render(
        <ColorPick
          colorPicked={mock.colorPicked}
          setColorPicked={mock.setColorPicked}
          editColor={mock.editColor}
        />
      )
    )
  })
})
