'use client'
import { Note, Errors } from '@/interfaces/noteInterfaces'
import CardButton from './cardButton'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import ColorPick from './colorPick'
import PaintIcon from '@/icons/paint'
import DeleteIcon from '@/icons/delete'
import StarIcon from '@/icons/star'

interface Card {
  note: Note
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
  setNotes,
  setErrors,
  setMessage,
  noteUpdate,
  noteDestroy,
  setShowRestore,
  token,
}: Card) {
  const emptyNote: Note = {
    id: '',
    title: '',
    body: '',
    color: 'white',
    favorited: false,
  }

  const [colorPicked, setColorPicked] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [editableNote, setEditableNote] = useState<Note>(emptyNote)

  const titleInputRef = useRef<HTMLInputElement>(null)

  const isfavorited = note.favorited ? 'fill-yellow-400 text-yellow-400' : ''

  useEffect(() => {
    setEditableNote(note)
  }, [note])

  useEffect(() => {
    if(isEditable) titleInputRef.current?.focus()
  }, [isEditable])
  

  function OnClickButton(
    type: 'color' | 'favorite' | 'delete' | 'save' | 'cancel'
  ) {
    if (type === 'save') {
      noteUpdate(
        { ...note, title: editableNote.title, body: editableNote.body },
        setNotes,
        setErrors,
        setMessage,
        token
      )
      setIsEditable(!isEditable)
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
      setShowRestore({ visible: true, note: editableNote })
    }
    if (type === 'cancel') {
      setIsEditable(!isEditable)
      setEditableNote(note)
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

  return (
    <>
      {!isEditable ? (
        <div
          className={'cursor-pointer fixed z-10 mt-3 rounded-xl h-30 w-80 hover:shadow-md border border-gray-300'}
          onClick={() => setIsEditable(!isEditable)}
        />
      ) : (
        false
      )}
      <div className={`flex flex-col`}>
        <div
          className={`my-3 sm:mr-3 flex ${isEditable ? 'h-40' : 'h-30'} w-80 flex-col rounded-xl border border-gray-300 ${`bg-card-${note.color}`}`}
        >
          <div className={`mx-2 mt-2 mb-1 flex items-start`}>
            <input
              className={`grow px-2 py-1 font-semibold outline-none`}
              value={editableNote.title}
              disabled={!isEditable}
              ref={titleInputRef}
              onChange={(e) =>
                setEditableNote({ ...editableNote, title: e.target.value })
              }
            />
            <div className={'mt-1 z-20'}>
              <CardButton
                Icon={StarIcon}
                hover
                iconClassName={`h-5 w-5 ${isfavorited}`}
                type={'favorite'}
                onClickButton={OnClickButton}
              />
            </div>
          </div>
          <div className={'mx-2 my-1 flex'}>
            <textarea
              className={`grow resize-none px-2 py-1 outline-none`}
              value={editableNote.body}
              disabled={!isEditable}
              rows={2}
              onChange={(e) =>
                setEditableNote({ ...editableNote, body: e.target.value })
              }
            />
          </div>
          {isEditable ? (
            <div className={'mx-2 flex pt-2'}>
              <div className={'flex items-center'}>
                <CardButton
                  Icon={PaintIcon}
                  iconClassName={'h-5 w-5'}
                  type={'color'}
                  hover
                  onClickButton={OnClickButton}
                />
                <CardButton
                  Icon={DeleteIcon}
                  iconClassName={'h-5 w-5 text-red-500'}
                  type={'delete'}
                  hover
                  onClickButton={OnClickButton}
                />
              </div>
              <div className={'flex grow justify-end'}>
                <div className={'mr-1'}>
                  <CardButton
                    type={'cancel'}
                    hover
                    onClickButton={OnClickButton}
                  />
                </div>
                <CardButton type={'save'} onClickButton={OnClickButton} />
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
    </>
  )
}
