import { JSX } from 'react'

interface Icon {
  className: string
}

interface CardButton {
  Icon?: ({ className }: Icon) => JSX.Element
  iconClassName?: string
  hover?: boolean
  type: 'color' | 'favorite' | 'delete' | 'save' | 'cancel'
  onClickButton: (type: CardButton['type']) => void
}

export default function CardButton({
  Icon,
  iconClassName,
  type,
  hover,
  onClickButton,
}: CardButton) {
  const isHovered = hover ? 'hover:bg-gray-200' : ''
  const getBackground = type === 'save' ? 'bg-black text-white' : ''
  const isLarge = type === 'cancel' || type === 'save' ? 'px-2 py-1': 'p-1'
  return (
    <button
      className={`cursor-pointer rounded-md ${isHovered} ${getBackground} ${isLarge}`}
      onClick={() => onClickButton(type)}
    >
      {Icon ? <Icon className={iconClassName as string} /> : false}
      {type === 'cancel' || type === 'save'
        ? `${type.charAt(0).toUpperCase()}${type.slice(1)}`
        : false}
    </button>
  )
}
