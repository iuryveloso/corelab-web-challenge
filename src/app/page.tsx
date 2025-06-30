'use client'
import {
  noteIndex,
  noteUpdate,
  noteDestroy,
  noteStore,
  noteSearch,
  noteColorSearch,
  noteRestore,
} from '@/functions/noteFunctions'
import { Errors, Note } from '@/interfaces/noteInterfaces'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Card from '@/components/card'
import CardButton from '@/components/cardButton'
import ColorFilter from '@/components/colorFilter'

export default function Login() {
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

  const getIconFavorited = note.favorited
    ? '/icons/star_fill.svg'
    : '/icons/star.svg'

  function OnClickCardButton(
    type: 'edit' | 'color' | 'favorite' | 'delete' | 'save'
  ) {
    if (type === 'favorite') setNote({ ...note, favorited: !note.favorited })
    if (type === 'save') {
      noteStore(note, setNotes, setErrors, setMessage)
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
    noteIndex(setNotes)
  }, [])

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
  return (
    <div>
      <div className={'relative'}>
        <div className={'fixed inset-x-0 top-0'}>
          <nav
            className={'flex flex-row flex-wrap bg-white px-5 py-1 shadow-md'}
          >
            <div className={'flex items-center'}>
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
              <label className={' mr-2 text-md text-gray-500'}>CoreNotes</label>
            </div>
            <div className={'my-1 w-48 sm:w-80 flex shadow-md md:w-lg lg:w-2xl'}>
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
          </nav>
        </div>
      </div>
      <div>
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
                      noteRestore(showRestore.note.id, setNotes, setMessage)
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

        <div className={'inset-y-14 container mx-auto'}>
          <div className={'h-20'} />
          <div className={'flex justify-center'}>
            <div
              className={
                'h-40 w-80 rounded-2xl bg-white shadow-md md:w-lg md:rounded-sm lg:w-2xl'
              }
            >
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

          <div
            className={'mt-7 ml-0 flex justify-center md:ml-5 md:justify-start'}
          >
            <ColorFilter setColor={setColor} />
          </div>

          <div>
            <div className={'flex flex-col items-center md:items-start'}>
              {hasFavorited() ? (
                <div className={'mt-3 ml-0 text-center md:ml-5'}>
                  <h3 className={'text-xl'}>Favoritos</h3>
                </div>
              ) : (
                false
              )}
              <div className={'flex flex-wrap justify-center md:justify-start'}>
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
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className={'flex flex-col items-center md:items-start'}>
              {hasOther() ? (
                <div className={'mt-3 ml-0 text-center md:ml-5'}>
                  <h3 className={'text-xl'}>Outros</h3>
                </div>
              ) : (
                false
              )}
              <div className={'flex flex-wrap justify-center md:justify-start'}>
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
