import { Note } from '@/interfaces/noteInterfaces'
import CardColorButton from './cardColorButton'
import { Dispatch, SetStateAction } from 'react'

interface ColorFilter {
  setColor: Dispatch<SetStateAction<Note['color'] | 'all'>>
  colors: Note['color'][]
}

export default function ColorFilter({ setColor, colors }: ColorFilter) {
  function editColor(color: Note['color'] | 'all') {
    setColor(color)
  }

  const colorList = Array.from(new Set(colors).values())
  
  return (
    <div
      className={`flex w-80 items-center rounded-2xl bg-white px-2 pb-1 shadow-md md:w-auto md:rounded-md`}
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
        {colorList.map((color, key, array) => {
          const margin = key + 1 !== array.length ? 'mr-1' : ''
          return (
            <div key={key} className={margin}>
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
