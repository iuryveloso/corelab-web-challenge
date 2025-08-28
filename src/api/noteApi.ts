import { Note, Errors, Message } from '@/interfaces/noteInterfaces'

const domain = process.env.NEXT_PUBLIC_API_DOMAIN as string

export async function index(token: string): Promise<Note[]> {
  return await fetch(`${domain}/api/notes`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json())
}

export async function store(
  title: string,
  body: string,
  color: string,
  favorited: boolean,
  token: string
): Promise<Message | Errors> {
  return await fetch(`${domain}/api/notes`, {
    method: 'POST',
    body: JSON.stringify({ title, body, color, favorited }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then((e) => e.json())
}

export async function show(id: string, token: string): Promise<Note> {
  return await fetch(`${domain}/api/notes/${id as string}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json())
}

export async function update(
  id: string,
  title: string,
  body: string,
  color: string,
  favorited: boolean,
  token: string
): Promise<Message | Errors> {
  return await fetch(`${domain}/api/notes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title, body, color, favorited }),
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then((e) => e.json())
}

export async function destroy(id: string, token: string): Promise<Message> {
  return await fetch(`${domain}/api/notes/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json())
}

export async function restore(id: string, token: string): Promise<Message> {
  return await fetch(`${domain}/api/notes/restore/${id}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((e) => e.json())
}
