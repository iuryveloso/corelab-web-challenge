import { Note, Errors, Message } from '@/interfaces/noteInterfaces'

const domain = () => process.env.NEXT_PUBLIC_API_DOMAIN as string

export async function index(): Promise<Note[]> {
  return await fetch(`${domain()}/api/notes`, {
    method: 'GET',
    credentials: 'include',
  }).then((e) => e.json())
}

export async function store(
  title: string,
  body: string,
  color: string,
  favorited: boolean
): Promise<Message | Errors> {
  return await fetch(`${domain()}/api/notes`, {
    method: 'POST',
    body: JSON.stringify({ title, body, color, favorited }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    credentials: 'include',
  }).then((e) => e.json())
}

export async function show(id: string): Promise<Note> {
  return await fetch(`${domain()}/api/notes/${id as string}`, {
    method: 'GET',
    credentials: 'include',
  }).then((e) => e.json())
}

export async function update(
  id: string,
  title: string,
  body: string,
  color: string,
  favorited: boolean
): Promise<Message | Errors> {
  return await fetch(`${domain()}/api/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, body, color, favorited }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    credentials: 'include',
  }).then((e) => e.json())
}

export async function destroy(id: string): Promise<Message> {
  return await fetch(`${domain()}/api/notes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  }).then((e) => e.json())
}

export async function restore(id: string): Promise<Message> {
  return await fetch(`${domain()}/api/notes/restore/${id}`, {
    method: 'POST',
    credentials: 'include',
  }).then((e) => e.json())
}
