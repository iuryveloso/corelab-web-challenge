import { Note } from '@/interfaces/noteInterfaces'
import CardColorButton from './cardColorButton'
import { Dispatch, SetStateAction } from 'react'

interface ColorFilter {
  setColor: Dispatch<SetStateAction<Note['color'] | 'all'>>
}

export default function ColorFilter({ setColor }: ColorFilter) {
  function editColor(color: Note['color'] | 'all') {
    setColor(color)
  }

  const colorList: Note['color'][] = [
    'white',
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
    <div
      className={
        `flex items-center justify-center rounded-2xl md:rounded-md
        bg-white px-1 pb-1 shadow-md w-80 md:w-auto`
      }
    >
      <label className={'text-md mx-1 mt-1 text-gray-500'}>Filtrar: </label>
      <div className={'flex flex-wrap items-center'}>
        <div className={'mr-1'}>
          <CardColorButton
            color={'all'}
            editColor={editColor}
            customSize={'h-6 w-6'}
          />
        </div>
        {colorList.map((color, key) => {
          return (
            <div key={key} className={`mr-1`}>
              <CardColorButton
                color={color}
                editColor={editColor}
                customSize={'h-6 w-6'}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
