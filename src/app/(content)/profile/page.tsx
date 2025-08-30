'use client'
import Image from 'next/image'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import {
  userUpdate,
  userUpdateAvatar,
  userUpdatePassword,
  userShow,
} from '@/functions/userFunctions'
import Input from '@/components/input'
import { Errors, User } from '@/interfaces/userInterfaces'
import NavProfile from '@/components/navProfile'
import Button from '@/components/button'
import { AppContext } from '@/context/appContext'
import { authLogout } from '@/functions/authFunctions'
import EyeSlashIcon from '@/icons/eyeSlash'
import EyeIcon from '@/icons/eye'

export default function Profile() {
  const { token, setToken } = useContext(AppContext)

  const imagesDomain = `${process.env.NEXT_PUBLIC_API_DOMAIN}/uploads/avatar/`

  const emptyCredentials = {
    old_password: '',
    password: '',
    password_confirmation: '',
  }

  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    avatar: '',
  })
  const [credentials, setCredentials] = useState(emptyCredentials)
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    password: false,
    password_confirmation: false,
  })
  const [errors, setErrors] = useState<Errors['errors']>([])
  const [showErrors, setShowErrors] = useState(false)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setShowErrors(true)
      setTimeout(() => {
        setErrors([])
        setShowErrors(false)
      }, 3000)
    }
  }, [errors])

  useEffect(() => {
    if (message) {
      setShowMessage(true)
      setTimeout(() => {
        setMessage('')
        setShowMessage(false)
      }, 3000)
    }
  }, [message])

  useEffect(() => {
    if (token) userShow(setUser, token)
  }, [token])

  function onCLickOldPasswordIcon() {
    setShowPassword({
      ...showPassword,
      old_password: !showPassword.old_password,
    })
  }

  function onCLickPasswordIcon() {
    setShowPassword({
      ...showPassword,
      password: !showPassword.password,
    })
  }

  function onCLickPasswordConfirmationIcon() {
    setShowPassword({
      ...showPassword,
      password_confirmation: !showPassword.password_confirmation,
    })
  }

  function updateUserClick() {
    userUpdate(user, setUser, token, setErrors, setMessage)
  }
  function updatePasswordClick() {
    userUpdatePassword(credentials, setErrors, setMessage, token)
    setCredentials(emptyCredentials)
  }

  function fileupload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    userUpdateAvatar(files[0], setUser, setErrors, setMessage, token)
  }

  function updateAvatarClick() {
    if (!inputRef || !inputRef.current) return

    inputRef.current.click()
  }

  function onClickLogout() {
    authLogout(setMessage, setToken, token)
  }

  return (
    <div>
      <div className={'mx-5 mt-5 flex flex-col items-center'}>
        <div className={'container'}>
          <nav
            className={
              'flex flex-col flex-wrap sm:flex-row sm:flex-wrap-reverse'
            }
          >
            <div className={'flex grow items-center'}>
              <a href="/dashboard">
                <label className={'cursor-pointer text-2xl text-gray-700'}>
                  CORE NOTES
                </label>
              </a>
              <div className={'ml-3 flex grow justify-end'}>
                <div className={'sm:hidden'}>
                  <NavProfile user={user} onClickLogout={onClickLogout} />
                </div>
              </div>
            </div>
            <div
              className={'flex grow items-center justify-center sm:justify-end'}
            >
              <div className={'ml-3 flex'}>
                <div className={'hidden sm:block'}>
                  <NavProfile user={user} onClickLogout={onClickLogout} />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className={'mt-8'}>
        <div className={'relative z-0'}>
          <div className={'fixed inset-y-14 right-0 z-10 mr-2'}>
            <div className={'mt-3 flex flex-col'}>
              <div
                className={`mt-1 flex flex-col items-center rounded-lg border border-red-800 bg-red-500 px-2 py-1 text-white ${showErrors ? '' : 'hidden'}`}
              >
                {errors ? (
                  <>
                    {errors.map((error, key) => (
                      <label key={key}>{error.message}</label>
                    ))}
                  </>
                ) : (
                  false
                )}
              </div>
              <div
                className={`mt-1 flex flex-col items-center rounded-lg border border-green-900 bg-green-600 px-2 py-1 text-white ${showMessage ? '' : 'hidden'}`}
              >
                {message ? <label>{message}</label> : false}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={'flex flex-col items-center'}>
        <div className={'container flex flex-wrap justify-center'}>
          <div
            className={`mb-2 flex w-11/12 pr-0 sm:w-3/9 sm:pr-2 md:w-2/7 lg:w-1/5`}
          >
            <div
              className={`h-full w-full rounded-xl border border-gray-300 bg-white px-5 pt-4 pb-3`}
            >
              <div className={'mb-3 flex justify-center'}>
                {user.avatar ? (
                  <Image
                    loader={({ src }) => src}
                    unoptimized={true}
                    src={`${imagesDomain}${user.avatar}`}
                    width={250}
                    height={250}
                    alt={'Profile'}
                    priority={true}
                    className={`h-36 w-36 rounded-full border border-gray-300`}
                  />
                ) : (
                  <Image
                    src={'/user.svg'}
                    width={250}
                    height={250}
                    alt={'Profile'}
                    priority={true}
                    className={`h-36 w-36 rounded-full border border-gray-300`}
                  />
                )}
              </div>
              <div>
                <Button
                  color={'bg-amber-500'}
                  hoverColor={'hover:bg-amber-600'}
                  onClick={updateAvatarClick}
                >
                  Change Avatar
                </Button>
                <input
                  type={'file'}
                  accept={'image/png, image/jpeg, .svg'}
                  hidden
                  ref={inputRef}
                  onChange={(e) => fileupload(e)}
                />
              </div>
            </div>
          </div>
          <div
            className={
              'mb-2 w-11/12 rounded-xl border border-gray-300 bg-white px-5 py-3 sm:w-6/9 md:w-5/7 lg:w-4/5'
            }
          >
            <div className={'mb-5'}>
              <label htmlFor={'nameInput'}>Name</label>
              <Input
                value={user.name}
                id={'nameInput'}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className={'mb-6'}>
              <label htmlFor={'emailInput'}>Email</label>
              <Input
                value={user.email}
                id={'emailInput'}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div>
              <Button
                color={'bg-green-500'}
                hoverColor={'hover:bg-green-600'}
                onClick={updateUserClick}
              >
                Change Personal Data
              </Button>
            </div>
          </div>
          <div
            className={
              'w-11/12 rounded-xl border border-gray-300 bg-white px-5 py-3 sm:w-full'
            }
          >
            <div className={'mb-5'}>
              <label htmlFor={'old_passwordInput'}>Current Password</label>
              <Input
                type={showPassword.old_password ? 'text' : 'password'}
                value={credentials.old_password}
                id={'old_passwordInput'}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    old_password: e.target.value,
                  })
                }
                Icon={showPassword.old_password ? EyeSlashIcon : EyeIcon}
                iconClassName={'h-5 w-5 text-gray-500'}
                onCLickIcon={onCLickOldPasswordIcon}
              />
            </div>
            <div className={'mb-5'}>
              <label htmlFor={'passwordInput'}>New Password</label>
              <Input
                type={showPassword.password ? 'text' : 'password'}
                value={credentials.password}
                id={'passwordInput'}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                Icon={showPassword.password ? EyeSlashIcon : EyeIcon}
                iconClassName={'h-5 w-5 text-gray-500'}
                onCLickIcon={onCLickPasswordIcon}
              />
              <div className={'flex'}>
                <label className={'text-end text-xs'}>
                  Please make sure the password is at least 6 characters long
                </label>
              </div>
            </div>
            <div className={'mb-5'}>
              <label htmlFor={'password_confirmationInput'}>
                Confirm New Password
              </label>
              <Input
                type={showPassword.password_confirmation ? 'text' : 'password'}
                value={credentials.password_confirmation}
                id={'password_confirmationInput'}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password_confirmation: e.target.value,
                  })
                }
                Icon={
                  showPassword.password_confirmation ? EyeSlashIcon : EyeIcon
                }
                iconClassName={'h-5 w-5 text-gray-500'}
                onCLickIcon={onCLickPasswordConfirmationIcon}
              />
            </div>
            <div>
              <Button
                color={'bg-indigo-400'}
                hoverColor={'hover:bg-indigo-500'}
                onClick={updatePasswordClick}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
