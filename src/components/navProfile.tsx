'use client'
import { User } from '@/interfaces/userInterfaces'
import Image from 'next/image'
import { useState } from 'react'

interface NavProfile {
  user: User
  onClickLogout: () => void
}

export default function NavProfile({ user, onClickLogout }: NavProfile) {
  const domain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/storage/uploads/`
  const [showMenu, setShowMenu] = useState(false)

  const profileHeight = user.name.length > 10 ? 'h-35' : 'h-32'

  return (
    <div className={'flex flex-col items-center'}>
      <div className={'flex items-center'}>
        <button
          className={'cursor-pointer'}
          onClick={() => setShowMenu(!showMenu)}
        >
          {user.avatar ? (
            <Image
              loader={({ src }) => src}
              unoptimized={true}
              src={`${domain}${user.avatar}`}
              width={100}
              height={100}
              alt={'Main logo'}
              priority={true}
              className={
                'h-10 w-10 rounded-full border border-gray-300 shadow-md'
              }
            />
          ) : (
            false
          )}
        </button>
      </div>
      {showMenu ? (
        <>
          <div className={'fixed inset-0 h-screen w-screen z-10'} onClick={() => setShowMenu(!showMenu)} />
          <div className={'relative'}>
            <div
              className={`fixed z-20 inset-y-0 top-14 right-6 ${profileHeight} w-60 rounded-sm bg-white shadow-md`}
            >
              <div className={'flex h-full flex-col justify-center p-2'}>
                <div
                  className={
                    'flex flex-wrap items-center border-b border-gray-400 pb-1 font-semibold'
                  }
                >
                  {user.avatar ? (
                    <Image
                      loader={({ src }) => src}
                      unoptimized={true}
                      src={`${domain}${user.avatar}`}
                      width={100}
                      height={100}
                      alt={'Main logo'}
                      priority={true}
                      className={
                        'mr-1 h-10 w-10 rounded-full border border-gray-300'
                      }
                    />
                  ) : (
                    false
                  )}
                  <label>{user.name}</label>
                </div>
                <div className={`mt-1 px-1 py-1 hover:bg-gray-100`}>
                  <a href={'/profile'} className={''}>
                    Perfil de Usuário
                  </a>
                </div>
                <div className={`mt-1 px-1 py-1 hover:bg-gray-100`}>
                  <button
                    onClick={() => {
                      setShowMenu(!showMenu)
                      onClickLogout()
                    }}
                    className={'cursor-pointer'}
                  >
                    Sair do Sistema
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        false
      )}
    </div>
  )
}
