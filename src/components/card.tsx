'use client'
import { Note, Errors } from '@/interfaces/noteInterfaces'
import CardButton from './cardButton'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ColorPick from './colorPick'

interface Card {
  note: Note
  emptyNote: Note
  setNotes: Dispatch<SetStateAction<Note[]>>
  setErrors: Dispatch<SetStateAction<Errors['errors']>>
  setMessage: Dispatch<SetStateAction<string>>
  setShowRestore: Dispatch<
    SetStateAction<{
      visible: boolean
      note: Note
    }>
  >
  noteUpdate: (
    note: Note,
    setNotes: Card['setNotes'],
    setErrors: Card['setErrors'],
    setMessage: Card['setMessage'],
    token: string
  ) => void
  noteDestroy: (
    id: string,
    setNotes: Card['setNotes'],
    setMessage: Card['setMessage'],
    token: string
  ) => void
  token: string
}

export default function Card({
  note,
  emptyNote,
  setNotes,
  setErrors,
  setMessage,
  noteUpdate,
  noteDestroy,
  setShowRestore,
  token,
}: Card) {
  const [colorPicked, setColorPicked] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [editedNote, setEditedNote] = useState<Note>(emptyNote)

  useEffect(() => {
    setEditedNote(note)
  }, [note])

  function OnClickButton(
    type: 'edit' | 'color' | 'favorite' | 'delete' | 'save'
  ) {
    if (type === 'edit') {
      if (!readOnly) {
        noteUpdate(
          { ...note, title: editedNote.title, body: editedNote.body },
          setNotes,
          setErrors,
          setMessage,
          token
        )
      }
      setReadOnly(!readOnly)
    }
    if (type === 'color') setColorPicked(!colorPicked)
    if (type === 'favorite')
      noteUpdate(
        { ...note, favorited: !note.favorited },
        setNotes,
        setErrors,
        setMessage,
        token
      )
    if (type === 'delete') {
      noteDestroy(note.id, setNotes, setMessage, token)
      setShowRestore({ visible: true, note: editedNote })
    }
  }

  function editColor(color: Note['color'] | 'all') {
    if (color !== 'all') {
      const whiteColorCheck = color === note.color ? 'white' : color
      noteUpdate(
        { ...note, color: whiteColorCheck },
        setNotes,
        setErrors,
        setMessage,
        token
      )
      setColorPicked(!colorPicked)
    }
  }

  const titleBorder =
    note.color !== 'white' ? 'border-white' : 'border-gray-400'
  const getIconFavorited = note.favorited
    ? '/icons/star_fill.svg'
    : '/icons/star.svg'
  const getIconEdit = readOnly ? '/icons/edit.svg' : '/icons/save.svg'
  return (
    <div className={'flex flex-col'}>
      <div
        className={`m-5 flex h-96 w-80 flex-col rounded-2xl shadow-md ${`bg-card-${note.color}`} ${readOnly ? '' : 'border border-gray-400'} `}
      >
        <div className={`flex items-start border-b ${titleBorder} `}>
          <input
            className={`grow resize-none rounded-tl-2xl px-3 py-2 font-semibold outline-none`}
            value={editedNote.title}
            readOnly={readOnly}
            onChange={(e) =>
              setEditedNote({ ...editedNote, title: e.target.value })
            }
          />
          <CardButton
            icon={getIconFavorited}
            className={'mx-3 my-2 h-auto w-5'}
            type={'favorite'}
            onClickButton={OnClickButton}
          />
        </div>
        <textarea
          className={`grow resize-none px-3 py-2 outline-none`}
          value={editedNote.body}
          readOnly={readOnly}
          onChange={(e) =>
            setEditedNote({ ...editedNote, body: e.target.value })
          }
        />
        <div className={'flex items-center px-3 py-2'}>
          <div className={'grow'}>
            <CardButton
              icon={getIconEdit}
              className={'h-auto w-5'}
              type={'edit'}
              onClickButton={OnClickButton}
            />
            <CardButton
              icon={'/icons/paint.svg'}
              className={'h-auto w-5'}
              type={'color'}
              onClickButton={OnClickButton}
            />
          </div>
          <div>
            <CardButton
              icon={'/icons/delete.svg'}
              className={'h-auto w-4'}
              type={'delete'}
              onClickButton={OnClickButton}
            />
          </div>
        </div>
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
