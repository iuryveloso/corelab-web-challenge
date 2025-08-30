import { ChangeEvent, JSX } from 'react'

interface Icon {
  className: string
}

interface Input {
  id?: string
  Icon?: ({ className }: Icon) => JSX.Element
  value: string
  type?: string
  iconClassName?: string
  placeholder?: string
  onCLickIcon?: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  id,
  Icon,
  onChange,
  value,
  type,
  iconClassName,
  onCLickIcon,
  placeholder,
}: Input) {
  const borderInput = Icon
    ? `border-y border-l rounded-l-lg`
    : `border rounded-lg`
  return (
    <div className={'flex focus-within:rounded-lg focus-within:outline-3 focus-within:outline-gray-300'}>
      <input
        type={type ?? 'text'}
        id={id as string}
        className={`px-3 py-1 outline-none ${borderInput} w-full border-gray-300`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {Icon ? (
        <div
          className={`flex items-center rounded-r-lg border-y border-r border-gray-300 px-3 py-1 text-gray-400`}
        >
          {onCLickIcon ? (
            <div onClick={onCLickIcon} className={'cursor-pointer'}>
              <Icon className={iconClassName as string} />
            </div>
          ) : (
            <div>
              <Icon className={iconClassName as string} />
            </div>
          )}
        </div>
      ) : (
        false
      )}
    </div>
  )
}
