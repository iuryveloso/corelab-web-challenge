'use client'
import { Note, Errors } from '@/interfaces/noteInterfaces'
import CardButton from './cardButton'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ColorButton from './colorButton'

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
    setMessage: Card['setMessage']
  ) => void
  noteDestroy: (
    id: string,
    setNotes: Card['setNotes'],
    setMessage: Card['setMessage']
  ) => void
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
}: Card) {
  const [colorPick, setColorPick] = useState(false)
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
          setMessage
        )
      }
      setReadOnly(!readOnly)
    }
    if (type === 'color') setColorPick(!colorPick)
    if (type === 'favorite')
      noteUpdate(
        { ...note, favorited: !note.favorited },
        setNotes,
        setErrors,
        setMessage
      )
    if (type === 'delete') {
      noteDestroy(note.id, setNotes, setMessage)
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
        setMessage
      )
      setColorPick(!colorPick)
    }
  }

  const colorList: Note['color'][] = [
    'blue',
    'teal',
    'yellow',
    'salmon',
    'red',
    'sky',
  ]

  const colorList2: Note['color'][] = [
    'pink',
    'lime',
    'orange',
    'cloud',
    'gray',
    'brown',
  ]

  const titleBorder =
    note.color !== 'white' ? 'border-white' : 'border-gray-400'
  const getIconFavorited = note.favorited
    ? '/icons/star_fill.svg'
    : '/icons/star.svg'
  const getIconEdit = readOnly ? '/icons/edit.svg' : '/icons/save.svg'
  const getEditBackground = !readOnly ? 'bg-orange-300 rounded-full': ''
  const getColorBackground = colorPick ? 'bg-orange-300 rounded-full': ''
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
        <div className={'flex items-center px-3 pt-2'}>
          <div className={'grow'}>
            <CardButton
              icon={getIconEdit}
              className={`h-auto w-7 p-1 ${getEditBackground}`}
              type={'edit'}
              onClickButton={OnClickButton}
            />
            <CardButton
              icon={'/icons/paint.svg'}
              className={`h-auto w-7 p-1 ${getColorBackground}`}
              type={'color'}
              onClickButton={OnClickButton}
            />
          </div>
          <div>
            <CardButton
              icon={'/icons/delete.svg'}
              className={'h-auto w-4 mr-1'}
              type={'delete'}
              onClickButton={OnClickButton}
            />
          </div>
        </div>
      </div>
      {colorPick ? (
        <div
          className={`z-10 -mt-8 -mb-12 ml-10 h-20 w-60 lg:h-auto lg:w-120 lg:-mr-40 rounded-md bg-white p-1 shadow-md`}
        >
          <div className={'lg:flex lg:flex-wrap'}>
            <div className={'mb-2 lg:mb-0 lg:mr-2 flex lg:grow justify-between'}>
              {colorList.map((color, key) => {
                return (
                  <ColorButton
                    key={key}
                    color={color}
                    editColor={editColor}
                  />
                )
              })}
            </div>
            <div className={'flex lg:grow justify-between'}>
              {colorList2.map((color, key) => {
                return (
                  <ColorButton
                    key={key}
                    color={color}
                    editColor={editColor}
                  />
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  )
}
