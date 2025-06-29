import { Note } from '@/interfaces/noteInterfaces'

interface CardColorButton {
  color: Note['color']
  editColor: (color: Note['color']) => void
}

export default function CardColorButton({ color, editColor }: CardColorButton) {
  const colorClassName = `bg-card-${color}`
  return (
    <button
      className={`h-8 w-8 ${colorClassName} cursor-pointer rounded-full`}
      onClick={() => editColor(color)}
    />
  )
}
