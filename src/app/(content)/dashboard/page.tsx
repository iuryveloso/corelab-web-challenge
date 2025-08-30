'use client'
import {
  noteIndex,
  noteUpdate,
  noteDestroy,
  noteStore,
  noteSearch,
  noteRestore,
  noteColorSearch,
} from '@/functions/noteFunctions'
import { Errors, Note } from '@/interfaces/noteInterfaces'
import { userShow } from '@/functions/userFunctions'
import { useContext, useEffect, useState } from 'react'
import Card from '@/components/card'
import NavProfile from '@/components/navProfile'
import { User } from '@/interfaces/userInterfaces'
import ColorFilter from '@/components/colorFilter'
import { AppContext } from '@/context/appContext'
import { authLogout } from '@/functions/authFunctions'
import SearchIcon from '@/icons/search'
import EmptyCard from '@/components/emptyCard'
import Button from '@/components/button'

export default function Dashboard() {
  const { token, setToken } = useContext(AppContext)

  const emptyNote: Note = {
    id: '',
    title: '',
    body: '',
    color: 'white',
    favorited: false,
  }

  const [color, setColor] = useState<Note['color'] | 'all'>('all')
  const [search, setSearch] = useState('')
  const [errors, setErrors] = useState<Errors['errors']>([])
  const [showErrors, setShowErrors] = useState(false)
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [shownNotes, setShownNotes] = useState<Note[]>([])
  const [showRestore, setShowRestore] = useState<{
    visible: boolean
    note: Note
  }>({
    visible: false,
    note: emptyNote,
  })

  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    avatar: '',
  })

  const colors = notes.map((note) => note.color)

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
    if (token) noteIndex(setNotes, token)
  }, [token])

  useEffect(() => {
    if (token) userShow(setUser, token)
  }, [token])

  useEffect(() => {
    const hasColor = color !== 'all'
    if (search && hasColor)
      setShownNotes(noteColorSearch(color, noteSearch(search, notes)))
    if (!search && hasColor) setShownNotes(noteColorSearch(color, notes))
    if (search && !hasColor) setShownNotes(noteSearch(search, notes))
    if (!search && !hasColor) setShownNotes(notes)
  }, [notes, search, color])

  function hasFavorited() {
    return (
      shownNotes.reduce((curr, note) => (note.favorited ? curr + 1 : curr), 0) >
      0
    )
  }

  function hasOther() {
    return (
      shownNotes.reduce(
        (curr, note) => (!note.favorited ? curr + 1 : curr),
        0
      ) > 0
    )
  }

  function onClickLogout() {
    authLogout(setMessage, setToken, token)
  }

  return (
    <div className={'m-5 flex flex-col items-center'}>
      <div className={'container'}>
        <div>
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
              <div
                className={
                  'mt-1 ml-3 flex w-80 focus-within:rounded-lg focus-within:outline-3 focus-within:outline-gray-300 sm:mt-0 lg:w-2xl'
                }
              >
                <div
                  className={`flex items-center rounded-l-lg border-y border-l border-gray-300 bg-white px-2 py-1 text-gray-400`}
                >
                  <SearchIcon className={'h-5 w-5'} />
                </div>
                <input
                  type={'text'}
                  className={`w-full rounded-r-lg border-y border-r border-gray-300 bg-white px-3 py-1 outline-0`}
                  value={search}
                  placeholder={'Search notes...'}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                />
              </div>
              <div className={'ml-3 flex'}>
                <div className={'hidden sm:block'}>
                  <NavProfile user={user} onClickLogout={onClickLogout} />
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className={'mt-16'}>
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
                  {showRestore.visible &&
                  Object.keys(showRestore.note).length !== 0 ? (
                    <>
                      <Button
                        color={'bg-green-600'}
                        onClick={() => {
                          noteRestore(
                            showRestore.note.id,
                            setNotes,
                            setMessage,
                            token
                          )
                          setShowRestore({
                            visible: false,
                            note: emptyNote,
                          })
                        }}
                        hoverColor={'hover:bg-green-700'}
                        borderless
                        underline
                      >
                        Click here to restore
                      </Button>
                    </>
                  ) : (
                    false
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={'-mt-8 flex justify-center'}>
            <EmptyCard
              message={message}
              setMessage={setMessage}
              setErrors={setErrors}
              setNotes={setNotes}
              noteStore={noteStore}
              token={token}
            />
          </div>
          {new Set(colors).size > 1 ? (
            <div className={'mt-7 flex justify-center sm:justify-start'}>
              <ColorFilter setColor={setColor} colors={colors} />
            </div>
          ) : (
            false
          )}
          <div className={'flex flex-col'}>
            <div className={'flex flex-col items-center sm:items-start'}>
              {hasFavorited() ? (
                <div className={'mt-5'}>
                  <h3 className={'text-md'}>Favorites</h3>
                </div>
              ) : (
                false
              )}
              <div className={'flex flex-col sm:flex-row sm:flex-wrap'}>
                {shownNotes
                  .filter((note) => note.favorited)
                  .map((note, key) => {
                    return (
                      <div className={'flex'} key={key}>
                        <Card
                          note={note}
                          setNotes={setNotes}
                          setErrors={setErrors}
                          setMessage={setMessage}
                          noteUpdate={noteUpdate}
                          noteDestroy={noteDestroy}
                          setShowRestore={setShowRestore}
                          token={token}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className={'flex flex-col items-center sm:items-start'}>
              {hasOther() ? (
                <div className={'mt-5'}>
                  <h3 className={'text-md'}>Others</h3>
                </div>
              ) : (
                false
              )}
              <div className={'flex flex-col sm:flex-row sm:flex-wrap'}>
                {shownNotes
                  .filter((note) => !note.favorited)
                  .map((note, key) => {
                    return (
                      <div className={'flex'} key={key}>
                        <Card
                          note={note}
                          setNotes={setNotes}
                          setErrors={setErrors}
                          setMessage={setMessage}
                          noteUpdate={noteUpdate}
                          noteDestroy={noteDestroy}
                          setShowRestore={setShowRestore}
                          token={token}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
