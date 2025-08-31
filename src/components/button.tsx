interface Button {
  color: string
  hoverColor?: string
  onClick: () => void
  borderless?: boolean
  underline?: boolean
  children: React.ReactNode
}

export default function Button({
  onClick,
  color,
  hoverColor,
  borderless,
  underline,
  children,
}: Button) {
  const border = !borderless ? 'border border-gray-300': ''
  return (
    <div className={'flex'}>
      <button
        className={`w-full cursor-pointer rounded-md  px-3 py-1 outline-none text-white ${underline? 'underline' : ''} ${border} ${color} ${hoverColor}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}
