'use client'
import CardButton from './cardButton'
import CardColorButton from './cardColorButton'

interface Card {
  color: string
  favorited: boolean
}

export default function Card({
  color,
  favorited,
}: Card) {
  


  const colorList = [
    'blue',
    'teal',
    'yellow',
    'salmon',
    'red',
    'sky',
  ]

  const colorList2 = [
    'pink',
    'lime',
    'orange',
    'cloud',
    'gray',
    'brown',
  ]

  const titleBorder =
    color !== 'white' ? 'border-white' : 'border-gray-400'
  const getIconFavorited = favorited
    ? '/icons/star_fill.svg'
    : '/icons/star.svg'
  return (
    <div className={'flex flex-col'}>
      <div
        className={`m-5 flex h-96 w-80 flex-col rounded-2xl shadow-md ${`bg-card-${color}`}`}
      >
        <div className={`flex items-start border-b ${titleBorder} `}>
          <input
            className={`grow resize-none rounded-tl-2xl px-3 py-2 font-semibold outline-none`}
            readOnly={true}
          />
          <CardButton
            icon={getIconFavorited}
            className={'mx-3 my-2 h-auto w-5'}
          />
        </div>
        <textarea
          className={`grow resize-none px-3 py-2 outline-none`}
          readOnly={true}
        />
        <div className={'flex items-center px-3 py-2'}>
          <div className={'grow'}>
            <CardButton
              icon={'/icons/edit.svg'}
              className={'h-auto w-5'}
            />
            <CardButton
              icon={'/icons/paint.svg'}
              className={'h-auto w-5'}
            />
          </div>
          <div>
            <CardButton
              icon={'/icons/delete.svg'}
              className={'h-auto w-4'}
            />
          </div>
        </div>
      </div>
        <div
          className={`z-10 -mt-8 -mb-12 ml-10 h-20 w-60 rounded-2xl bg-white p-1 shadow-md`}
        >
          <div className={'mb-2 flex justify-between'}>
            {colorList.map((color, key) => {
              if (color)
                return (
                  <CardColorButton
                    key={key}
                    color={color}
                  />
                )
            })}
          </div>
          <div className={'flex justify-between'}>
            {colorList2.map((color, key) => {
              if (color)
                return (
                  <CardColorButton
                    key={key}
                    color={color}
                  />
                )
            })}
          </div>
        </div>
    </div>
  )
}
