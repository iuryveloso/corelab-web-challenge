import { Errors, Note } from '@/interfaces/noteInterfaces'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import CardButton from './cardButton'
import PaintIcon from '@/icons/paint'
import StarIcon from '@/icons/star'
import ColorPick from './colorPick'

interface EmptyCard {
  message: string
  setNotes: Dispatch<SetStateAction<Note[]>>
  setErrors: Dispatch<SetStateAction<Errors['errors']>>
  setMessage: Dispatch<SetStateAction<string>>
  noteStore: (
    note: Note,
    setNotes: EmptyCard['setNotes'],
    setErrors: EmptyCard['setErrors'],
    setMessage: EmptyCard['setMessage'],
    token: string
  ) => void
  token: string
}

export default function EmptyCard({
  message,
  setNotes,
  setErrors,
  setMessage,
  noteStore,
  token,
}: EmptyCard) {
  const emptyNote: Note = {
    id: '',
    title: '',
    body: '',
    color: 'white',
    favorited: false,
  }

  const [colorPicked, setColorPicked] = useState(false)
  const [note, setNote] = useState<Note>(emptyNote)
  const [noteEdited, setNoteEdited] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (message) {
      setNoteEdited(false)
    }
  }, [message])

  useEffect(() => {
    if(noteEdited) {
        titleInputRef.current?.focus()
    }
  }, [noteEdited])
  

  const isfavorited = note.favorited
    ? 'fill-yellow-400 text-yellow-400'
    : 'text-gray-400'

  function OnClickCardButton(
    type: 'color' | 'favorite' | 'delete' | 'save' | 'cancel'
  ) {
    if (type === 'favorite') setNote({ ...note, favorited: !note.favorited })
    if (type === 'save') {
      noteStore(note, setNotes, setErrors, setMessage, token)
      setNote(emptyNote)
    }
    if (type === 'cancel') {
      setNoteEdited(!noteEdited)
      setNote(emptyNote)
    }
    if (type === 'color') setColorPicked(!colorPicked)
  }

  function editColor(color: Note['color'] | 'all') {
    if (color !== 'all') {
      const whiteColorCheck = color === note.color ? 'white' : color
      setNote({ ...note, color: whiteColorCheck })
      setColorPicked(!colorPicked)
    }
  }

  return (
    <div className={'flex grow flex-col'}>
      <div
        className={`w-full rounded-xl border border-gray-300 ${`bg-card-${note.color}`} ${noteEdited ? 'h-46' : 'h-10'}`}
      >
        <div className={'flex flex-col'}>
          {noteEdited ? (
            <>
              <input
                type={'text'}
                className={
                  'mx-2 mt-2 mb-1 grow px-2 py-1 outline-0 focus:rounded-lg focus:outline-3 focus:outline-gray-300'
                }
                placeholder={'Title'}
                value={note.title}
                ref={titleInputRef}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
              <textarea
                className={`mx-2 my-1 grow resize-none px-2 py-1 outline-0 focus:rounded-lg focus:outline-3 focus:outline-gray-300`}
                placeholder={'Take a note...'}
                value={note.body}
                rows={3}
                onChange={(e) => setNote({ ...note, body: e.target.value })}
              />
            </>
          ) : (
            <div className={'flex'} onFocus={() => setNoteEdited(!noteEdited)}>
              <input
                className={`mx-2 my-1 grow resize-none px-2 py-1 outline-0`}
                placeholder={'Take a note...'}
              />
            </div>
          )}
        </div>
        {noteEdited ? (
          <div className={'mx-2 my-2 flex'}>
            <div className={'flex'}>
              <CardButton
                Icon={PaintIcon}
                iconClassName={'h-5 w-5 text-gray-600'}
                type={'color'}
                hover
                onClickButton={OnClickCardButton}
              />
              <CardButton
                Icon={StarIcon}
                iconClassName={`h-5 w-5 ${isfavorited}`}
                type={'favorite'}
                hover
                onClickButton={OnClickCardButton}
              />
            </div>
            <div className={'flex grow justify-end'}>
              <div className={'mr-1'}>
                <CardButton
                  type={'cancel'}
                  hover
                  onClickButton={OnClickCardButton}
                />
              </div>
              <CardButton type={'save'} onClickButton={OnClickCardButton} />
            </div>
          </div>
        ) : (
          false
        )}
      </div>
      {colorPicked ? (
        <ColorPick
          colorPicked={colorPicked}
          setColorPicked={setColorPicked}
          editColor={editColor}
        />
      ) : (
        false
      )}
    </div>
  )
}
