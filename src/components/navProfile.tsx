'use client'
import { User } from '@/interfaces/userInterfaces'
import Image from 'next/image'
import { useState } from 'react'

interface NavProfile {
  user: User
  onClickLogout: () => void
}

export default function NavProfile({ user, onClickLogout }: NavProfile) {
  const domain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/uploads/avatar/`
  const [showMenu, setShowMenu] = useState(false)

  const profileHeight = user.name.length > 10 ? 'h-35' : 'h-32'

  return (
    <div className={`flex flex-col items-center`}>
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
                'h-10 w-10 rounded-full border border-gray-300 bg-white'
              }
            />
          ) : (
            false
          )}
        </button>
      </div>
      {showMenu ? (
        <>
          <div
            className={'fixed inset-0 z-10 h-screen w-screen'}
            onClick={() => setShowMenu(!showMenu)}
          />
          <div
            className={`z-20 mt-1 -mb-33 -ml-50 border border-gray-300 ${profileHeight} w-60 rounded-xl bg-white shadow-md`}
          >
            <div className={'flex h-full flex-col justify-center p-2'}>
              <div
                className={
                  'flex flex-wrap items-center border-b border-gray-300 pb-1 font-semibold'
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
              <a
                href={'/profile'}
                className={'mt-1 px-1 py-1 hover:bg-gray-100'}
              >
                User profile
              </a>
              <button
                onClick={() => {
                  setShowMenu(!showMenu)
                  onClickLogout()
                }}
                className={
                  'mt-1 flex cursor-pointer justify-start px-1 py-1 hover:bg-gray-100'
                }
              >
                Log out
              </button>
            </div>
          </div>
        </>
      ) : (
        false
      )}
    </div>
  )
}
