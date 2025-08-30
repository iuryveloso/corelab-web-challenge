
interface Button {
  text: string
  color: string
  hoverColor?: string
  onClick: () => void
}

export default function Button({ onClick, text, color, hoverColor }: Button) {
  return (
    <div className={'flex'}>
      <button
        className={`w-full cursor-pointer border border-gray-300 rounded-md text-white px-3 py-1 outline-none ${color} ${hoverColor}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  )
}
