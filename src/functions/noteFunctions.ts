import { index, store, show, update, destroy, restore } from '@/api/noteApi'
import { Dispatch, SetStateAction } from 'react'
import { Note, Errors } from '@/interfaces/noteInterfaces'

interface NoteFunctions {
  setErrors: Dispatch<SetStateAction<Errors['errors']>>
  setMessage: Dispatch<SetStateAction<string>>
  setNote: Dispatch<SetStateAction<Note>>
  setNotes: Dispatch<SetStateAction<Note[]>>
  setAllNotes: Dispatch<SetStateAction<Note[]>>
}

const isErrors = (value: unknown): value is Errors =>
  (value as Errors).errors !== undefined

export function noteSearch(search: string, notes: Note[]) {
  return notes.filter((note) => {
    const lowerSearch = search.toLowerCase()
    const lowerTitle = note.title.toLowerCase()
    const lowerBody = note.body.toLowerCase()
    return lowerTitle.includes(lowerSearch) || lowerBody.includes(lowerSearch)
  })
}

export async function noteIndex(setNotes: NoteFunctions['setNotes']) {
  await index().then((data) => {
    setNotes(data)
  })
}

export async function noteStore(
  note: Note,
  setNotes: NoteFunctions['setNotes'],
  setErrors: NoteFunctions['setErrors'],
  setMessage: NoteFunctions['setMessage']
) {
  const { body, color, favorited, title } = note
  await store(title, body, color, favorited).then((data) => {
    if (isErrors(data)) {
      setErrors(data.errors)
      return
    }
    noteIndex(setNotes)
    setMessage(data.message)
  })
}

export async function noteShow(id: string, setNote: NoteFunctions['setNote']) {
  await show(id).then((data) => {
    setNote(data)
  })
}

export async function noteUpdate(
  note: Note,
  setNotes: NoteFunctions['setNotes'],
  setErrors: NoteFunctions['setErrors'],
  setMessage: NoteFunctions['setMessage']
) {
  const { id, body, color, favorited, title } = note
  await update(id, title, body, color, favorited).then((data) => {
    if (isErrors(data)) {
      setErrors(data.errors)
      return
    }
    noteIndex(setNotes)
    setMessage(data.message)
  })
}

export async function noteDestroy(
  id: string,
  setNotes: NoteFunctions['setNotes'],
  setMessage: NoteFunctions['setMessage']
) {
  await destroy(id).then((data) => {
    noteIndex(setNotes)
    setMessage(data.message)
  })
}

export async function noteRestore(
  id: string,
  setNotes: NoteFunctions['setNotes'],
  setMessage: NoteFunctions['setMessage']
) {
  await restore(id).then((data) => {
    noteIndex(setNotes)
    setMessage(data.message)
  })
}
