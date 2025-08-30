'use client'
import { AppContext } from '@/context/appContext'
import { useContext, useEffect, useState } from 'react'
import Input from '@/components/input'
import { Errors, User } from '@/interfaces/userInterfaces'
import Button from '@/components/button'
import { Credentials } from '@/interfaces/authInterfaces'
import { authLogin, authRegister } from '@/functions/authFunctions'
import EyeSlashIcon from '@/icons/eyeSlash'
import EyeIcon from '@/icons/eye'

export default function Login() {
  const { setToken } = useContext(AppContext)

  const [mode, setMode] = useState<'login' | 'register'>('login')

  const emptyUser = {
    name: '',
    email: '',
    avatar: '',
  }

  const emptyCredentials = {
    old_password: '',
    password: '',
    password_confirmation: '',
  }

  const [user, setUser] = useState<User>(emptyUser)
  const [credentials, setCredentials] = useState<Credentials>(emptyCredentials)
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    password: false,
    password_confirmation: false,
  })
  const [errors, setErrors] = useState<Errors['errors']>([])
  const [showErrors, setShowErrors] = useState(false)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)

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

  function loginSubmit() {
    authLogin(user, credentials, setErrors, setMessage, setToken)
  }

  function registerSubmit() {
    authRegister(user, credentials, setErrors, setMessage, setToken)
  }

  return (
    <div className={'flex h-full flex-col justify-center'}>
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

      <div className={'flex flex-col items-center'}>
        <div className={'container flex justify-center'}>
          <div className={'w-11/12 px-5 py-2 text-center lg:w-4/5'}>
            <h1 className={'mt-3 pb-3 text-3xl'}>CORE NOTES</h1>
          </div>
        </div>
        {mode === 'login' ? (
          <div className={'container flex flex-wrap justify-center'}>
            <div
              className={
                'w-11/12 rounded-xl border border-gray-300 bg-white px-5 py-3 lg:w-4/5'
              }
            >
              <div className={'mb-5'}>
                <label htmlFor={'emailInput'}>Email</label>
                <Input
                  value={user.email}
                  id={'emailInput'}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className={'mb-5'}>
                <label htmlFor={'passwordInput'}>Password</label>
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
              </div>
              <div>
                <Button
                  color={'bg-sky-500'}
                  hoverColor={'hover:bg-sky-600'}
                  onClick={loginSubmit}
                >
                  Login
                </Button>
              </div>
              <div className={'mt-1 flex'}>
                <label className={'mr-2'}>Not registered yet?</label>
                <button
                  className={'cursor-pointer font-semibold text-blue-400'}
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login')
                    setUser(emptyUser)
                    setCredentials(emptyCredentials)
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={'container flex flex-wrap justify-center'}>
            <div
              className={
                'w-11/12 rounded-xl border border-gray-300 bg-white px-5 py-3 lg:w-4/5'
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
              <div className={'mb-5'}>
                <label htmlFor={'emailInput'}>Email</label>
                <Input
                  value={user.email}
                  id={'emailInput'}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className={'mb-5'}>
                <label htmlFor={'passwordInput'}>Password</label>
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
                  Confirm Password
                </label>
                <Input
                  type={
                    showPassword.password_confirmation ? 'text' : 'password'
                  }
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
                  color={'bg-green-500'}
                  hoverColor={'hover:bg-green-600'}
                  onClick={registerSubmit}
                >
                  Register
                </Button>
              </div>
              <div className={'mt-1 flex'}>
                <label className={'mr-2'}>Already registered?</label>
                <button
                  className={'cursor-pointer font-semibold text-blue-400'}
                  onClick={() => {
                    setMode(mode === 'register' ? 'login' : 'register')
                    setUser(emptyUser)
                    setCredentials(emptyCredentials)
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
