import Image from 'next/image'

interface CardButton {
  icon: string
  className: string
}

export default function CardButton({
  icon,
  className,
}: CardButton) {
  return (
    <button className={'cursor-pointer'}>
      <Image
        src={icon}
        alt={'Main logo'}
        width={0}
        height={0}
        priority={true}
        className={className}
      />
    </button>
  )
}
