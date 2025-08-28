import { Note } from '@/interfaces/noteInterfaces'
import { Dispatch, SetStateAction } from 'react'
import ColorButton from './colorButton'

interface ColorPick {
  colorPicked: boolean
  setColorPicked: Dispatch<SetStateAction<boolean>>
  editColor: (color: Note['color'] | 'all') => void
}

export default function ColorPick({
  colorPicked,
  setColorPicked,
  editColor,
}: ColorPick) {
  const colorList: Note['color'][] = [
    'blue',
    'teal',
    'yellow',
    'salmon',
    'red',
    'sky',
    'pink',
    'lime',
    'orange',
    'cloud',
    'gray',
    'brown',
  ]
  return (
    <>
      <div
        className={'fixed inset-0 z-10 h-screen w-screen'}
        onClick={() => setColorPicked(!colorPicked)}
      />

      <div
        className={`z-20 -mt-8 -mb-12 ml-10 flex h-20 w-56 flex-wrap justify-between rounded-2xl bg-white px-1 pt-1 shadow-md`}
      >
        {colorList.map((color, key) => {
          if (color)
            return (
              <ColorButton key={key} color={color} editColor={editColor} />
            )
        })}
      </div>
    </>
  )
}
