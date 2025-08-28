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
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import Card from '@/components/card'
import CardButton from '@/components/cardButton'
import NavProfile from '@/components/navProfile'
import { User } from '@/interfaces/userInterfaces'
import ColorFilter from '@/components/colorFilter'
import { AppContext } from '@/context/appContext'
import { authLogout } from '@/functions/authFunctions'

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
  const [note, setNote] = useState<Note>(emptyNote)
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

  const getIconFavorited = note.favorited
    ? '/icons/star_fill.svg'
    : '/icons/star.svg'

  const colors = notes.map((note) => note.color)

  function OnClickCardButton(
    type: 'edit' | 'color' | 'favorite' | 'delete' | 'save'
  ) {
    if (type === 'favorite') setNote({ ...note, favorited: !note.favorited })
    if (type === 'save') {
      noteStore(note, setNotes, setErrors, setMessage, token)
      setNote(emptyNote)
    }
  }

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
    <div>
      <div className={'relative'}>
        <div className={'fixed inset-x-0 top-0'}>
          <nav
            className={
              'flex flex-col flex-wrap bg-white px-5 py-1 shadow-md sm:flex-row'
            }
          >
            <div className={'mb-3 flex items-center sm:mb-0'}>
              <div className={'mr-1'}>
                <a href="/dashboard">
                  <Image
                    src={'/logo.svg'}
                    width={35}
                    height={35}
                    alt={'Main logo'}
                    priority={true}
                  />
                </a>
              </div>
              <label className={'mr-7 text-xl text-gray-500'}>
                 CORE NOTES
              </label>
              <div className={'flex grow justify-end'}>
                <div className={'sm:hidden'}>
                  <NavProfile user={user} onClickLogout={onClickLogout} />
                </div>
              </div>
            </div>
            <div
              className={'flex items-center justify-center md:justify-start'}
            >
              <div className={'flex w-80 shadow-md lg:w-2xl'}>
                <input
                  type={'text'}
                  className={`w-full rounded-l-sm border-y-2 border-l-2 border-gray-300 px-3 py-1 outline-none`}
                  value={search}
                  placeholder={'Pesquisar notas'}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                />
                <div
                  className={`flex items-center rounded-r-sm border-y-2 border-r-2 border-gray-300 px-3 py-1 text-gray-400`}
                >
                  <Image
                    src={'/icons/search.svg'}
                    width={20}
                    height={20}
                    alt={'Input Icon'}
                    priority={true}
                  />
                </div>
              </div>
            </div>
            <div className={'flex grow justify-end'}>
              <div className={'hidden sm:block'}>
                <NavProfile user={user} onClickLogout={onClickLogout} />
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className={'mt-28 sm:mt-16'}>
        <div className={'relative z-0'}>
          <div className={'fixed inset-y-14 right-0 z-10 mr-2'}>
            <div className={'flex flex-col'}>
              <div
                className={`mt-1 flex flex-col items-center rounded-sm bg-red-300 px-3 py-2 shadow-md ${showErrors ? '' : 'hidden'}`}
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
                className={`mt-1 flex flex-col items-center rounded-sm bg-green-300 px-3 py-2 shadow-md ${showMessage ? '' : 'hidden'}`}
              >
                {message ? <label>{message}</label> : false}
                {showRestore.visible &&
                Object.keys(showRestore.note).length !== 0 ? (
                  <button
                    className={`m-1 cursor-pointer rounded-sm bg-white px-2 py-1 shadow-md`}
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
                  >
                    Restaurar
                  </button>
                ) : (
                  false
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={'mt-3 flex justify-center'}>
          <div className={'h-40 w-80 rounded-sm bg-white shadow-md lg:w-2xl'}>
            <div className={'flex border-b border-gray-400'}>
              <input
                type={'text'}
                className={'grow px-3 py-2 font-semibold outline-none'}
                placeholder={'Título'}
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
              <CardButton
                icon={getIconFavorited}
                className={'mx-3 my-2 h-auto w-5'}
                type={'favorite'}
                onClickButton={OnClickCardButton}
              />
            </div>
            <div className={'flex'}>
              <textarea
                className={`grow resize-none px-3 py-2 outline-none`}
                placeholder={'Criar nota...'}
                value={note.body}
                rows={4}
                onChange={(e) => setNote({ ...note, body: e.target.value })}
              />
              <div className={'flex flex-col justify-end'}>
                <CardButton
                  icon={'/icons/save.svg'}
                  className={'mx-3 my-2 h-auto w-5'}
                  type={'save'}
                  onClickButton={OnClickCardButton}
                />
              </div>
            </div>
          </div>
        </div>
        {new Set(colors).size > 1 ? (
          <div className={'mt-7 ml-0 flex justify-center md:ml-5'}>
            <ColorFilter setColor={setColor} colors={colors} />
          </div>
        ) : (
          false
        )}
        <div className={'flex flex-wrap justify-center'}>
          <div>
            {hasFavorited() ? (
              <div className={'mt-5 text-center'}>
                <h3 className={'text-xl'}>Favoritos</h3>
              </div>
            ) : (
              false
            )}
            <div className={'flex flex-wrap justify-center'}>
              {shownNotes
                .filter((note) => note.favorited)
                .map((note, key) => {
                  return (
                    <div className={'flex'} key={key}>
                      <Card
                        note={note}
                        emptyNote={emptyNote}
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
          <div>
            {hasOther() ? (
              <div className={'mt-5 text-center'}>
                <h3 className={'text-xl'}>Outros</h3>
              </div>
            ) : (
              false
            )}
            <div className={'flex flex-wrap justify-center'}>
              {shownNotes
                .filter((note) => !note.favorited)
                .map((note, key) => {
                  return (
                    <div className={'flex'} key={key}>
                      <Card
                        note={note}
                        emptyNote={emptyNote}
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
  )
}
