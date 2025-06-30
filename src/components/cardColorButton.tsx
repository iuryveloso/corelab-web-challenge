import { Note } from '@/interfaces/noteInterfaces'

interface CardColorButton {
  color: Note['color'] | 'all'
  editColor: (color: Note['color'] | 'all') => void
  customSize?: string
}

export default function CardColorButton({color, editColor, customSize }: CardColorButton) {
  const size = customSize ? customSize : 'h-8 w-8'

  const border = color === 'white' ? 'border border-gray-300  rounded-full' : ''
  
  const colorClassName =
    color === 'all'
      ? 'bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700'
      : `bg-card-${color}`
  return (
    <button
      className={`${size} ${colorClassName} ${border} cursor-pointer rounded-full`}
      onClick={() => editColor(color)}
    />
  )
}
