interface CardColorButton {
  color: string
}

export default function CardColorButton({ color}: CardColorButton) {
  const colorClassName = `bg-card-${color}`
  return (
    <button
      className={`h-8 w-8 ${colorClassName} cursor-pointer rounded-full`}
    />
  )
}
