/**
 * @packageDocumentation
 * Utilities for making HTTP requests that return JSON
 *
 * @remarks
 * This package uses the `fetch` API to make HTTP requests
 * and returns the JSON response. It also provides a way to
 * validate the response using a schema from the `zod` package.
 *
 * @example Fetch a post from the JSONPlaceholder API
 * ```ts
 * const post = await get('post', 'https://jsonplaceholder.typicode.com/posts/1')
 * console.log(post) // { userId: 1, id: 1, title: '...', body: '...' }
 * ```
 * @example Fetch a post from the JSONPlaceholder API with validation
 * ```ts
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string()
 * })
 * const post = await get('post', 'https://jsonplaceholder.typicode.com/posts/1', PostSchema)
 * console.log(post) // { userId: 1, id: 1, title: '...', body: '...' }
 * ```
 * @example Create a new post on the JSONPlaceholder API
 * ```ts
 * const post = await post('post', 'https://jsonplaceholder.typicode.com/posts', {
 *   userId: 1,
 *   title: 'Hello, World!',
 *   body: 'This is my first post.'
 * })
 * console.log(post) // { userId: 1, id: 101, title: 'Hello, World!', body: 'This is my first post.' }
 * ```
 * @example Create a new post on the JSONPlaceholder API with validation
 * ```ts
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string()
 * })
 * const post = await post('post', 'https://jsonplaceholder.typicode.com/posts', {
 *   userId: 1,
 *   title: 'Hello, World!',
 *   body: 'This is my first post.'
 * }, PostSchema)
 * console.log(post) // { userId: 1, id: 101, title: 'Hello, World!', body: 'This is my first post.' }
 * ```
 * @example Update a post on the JSONPlaceholder API
 * ```ts
 * const post = await put('post', 'https://jsonplaceholder.typicode.com/posts/1', {
 *   userId: 1,
 *   title: 'Hello, World!',
 *   body: 'This is my first post.'
 * })
 * console.log(post) // { userId: 1, id: 1, title: 'Hello, World!', body: 'This is my first post.' }
 * ```
 * @example Update a post on the JSONPlaceholder API with validation
 * ```ts
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string()
 * })
 * const post = await put('post', 'https://jsonplaceholder.typicode.com/posts/1', {
 *   userId: 1,
 *   title: 'Hello, World!',
 *   body: 'This is my first post.'
 * }, PostSchema)
 * console.log(post) // { userId: 1, id: 1, title: 'Hello, World!', body: 'This is my first post.' }
 * ```
 * @example Update a post on the JSONPlaceholder API
 * ```ts
 * const post = await patch('post', 'https://jsonplaceholder.typicode.com/posts/1', {
 *   title: 'Hello, World!'
 * })
 * console.log(post) // { userId: 1, id: 1, title: 'Hello, World!', body: '...' }
 * ```
 * @example Update a post on the JSONPlaceholder API with validation
 * ```ts
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string()
 * })
 * const post = await patch('post', 'https://jsonplaceholder.typicode.com/posts/1', {
 *   title: 'Hello, World!'
 * }, PostSchema)
 * console.log(post) // { userId: 1, id: 1, title: 'Hello, World!', body: '...' }
 * ```
 * @example Delete a post from the JSONPlaceholder API
 * ```ts
 * await del('post', 'https://jsonplaceholder.typicode.com/posts/1')
 * ```
 * @example Delete a post from the JSONPlaceholder API with validation
 * ```ts
 * const RequestSchema = z.object({})
 * await del('post', 'https://jsonplaceholder.typicode.com/posts/1', RequestSchema)
 * ```
 */

import { type ZodType } from 'zod'

/**
 * Fetch a resource from a URL
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @returns The fetched resource
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @example Fetch a post from the JSONPlaceholder API
 * ```ts
 * const post = await get('post', 'https://jsonplaceholder.typicode.com/posts/1')
 * console.log(post) // { userId: 1, id: 1, title: '...', body: '...' }
 * ```
 */
export async function get(
  name: string,
  url: string | URL | Request
): Promise<unknown>

/**
 * Fetch a resource from a URL with validation with a schema
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @param schema - The schema to validate the resource with
 * @returns The fetched and validated resource
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @throws An error if the response does not match the schema
 * @example Fetch a post from the JSONPlaceholder API with validation
 * ```ts
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string()
 * })
 * const post = await get('post', 'https://jsonplaceholder.typicode.com/posts/1', PostSchema)
 * console.log(post) // { userId: 1, id: 1, title: '...', body: '...' }
 * ```
 */
export async function get<Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  schema: Schema
): Promise<ReturnType<Schema['parse']>>

export async function get<Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  schema?: Schema
) {
  const res = await fetch(url)
  if (!res.ok) {
    if (res.status === 404) throw new Error(`${name} was not found`)
    throw new Error(`Failed to fetch ${name}`)
  }
  const raw = await res.json()
  if (raw.error) throw new Error(raw.message ?? `Error fetching ${name}`)
  return schema ? schema.parse(raw) : raw
}

/**
 * Post data to a URL
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @param data - The data to send in the request
 * @returns The response from the server
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @example Create a new post on the JSONPlaceholder API
 * ```ts
 * const post = await post('post', 'https://jsonplaceholder.typicode.com/posts', {
 *   userId: 1,
 *   title: 'Hello, World!',
 *   body: 'This is my first post.'
 * })
 * console.log(post) // { userId: 1, id: 101, title: 'Hello, World!', body: 'This is my first post.' }
 * ```
 */
export async function post<Data = unknown>(
  name: string,
  url: string | URL | Request,
  data: Data
): Promise<unknown>

/**
 * Post data to a URL and validate the response with a schema
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @param data - The data to send in the request
 * @param schema - The schema to validate the response with
 * @returns The response from the server
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @throws An error if the response does not match the schema
 * @example Create a new post on the JSONPlaceholder API with validation
 * ```ts
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string()
 * })
 * const post = await post('post', 'https://jsonplaceholder.typicode.com/posts', {
 *   userId: 1,
 *   title: 'Hello, World!',
 *   body: 'This is my first post.'
 * }, PostSchema)
 * console.log(post) // { userId: 1, id: 101, title: 'Hello, World!', body: 'This is my first post.' }
 * ```
 */
export async function post<Data = unknown, Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  data: Data,
  schema: Schema
): Promise<ReturnType<Schema['parse']>>

export async function post<Data = unknown, Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  data: Data,
  schema?: Schema
) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    if (res.status === 404) throw new Error(`${name} was not found`)
    throw new Error(`Failed to fetch ${name}`)
  }
  const raw = await res.json()
  if (raw.error) throw new Error(raw.message ?? `Error fetching ${name}`)
  return schema ? schema.parse(raw) : raw
}

/**
 * Put data to a URL
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @param data - The data to send in the request
 * @returns The response from the server
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @example Update a post on the JSONPlaceholder API
 * ```ts
 * const post = await put('post', 'https://jsonplaceholder.typicode.com/posts/1', {
 *   userId: 1,
 *   title: 'Hello, World!',
 *   body: 'This is my first post.'
 * })
 * console.log(post) // { userId: 1, id: 1, title: 'Hello, World!', body: 'This is my first post.' }
 * ```
 */
export async function put<Data = unknown>(
  name: string,
  url: string | URL | Request,
  data: Data
): Promise<unknown>

/**
 * Put data to a URL and validate the response with a schema
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @param data - The data to send in the request
 * @param schema - The schema to validate the response with
 * @returns The response from the server
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @throws An error if the response does not match the schema
 * @example Update a post on the JSONPlaceholder API with validation
 * ```ts
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string()
 * })
 * const post = await put('post', 'https://jsonplaceholder.typicode.com/posts/1', {
 *   userId: 1,
 *   title: 'Hello, World!',
 *   body: 'This is my first post.'
 * }, PostSchema)
 * console.log(post) // { userId: 1, id: 1, title: 'Hello, World!', body: 'This is my first post.' }
 * ```
 */
export async function put<Data = unknown, Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  data: Data,
  schema: Schema
): Promise<ReturnType<Schema['parse']>>

export async function put<Data = unknown, Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  data: Data,
  schema?: Schema
) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    if (res.status === 404) throw new Error(`${name} was not found`)
    throw new Error(`Failed to fetch ${name}`)
  }
  const raw = await res.json()
  if (raw.error) throw new Error(raw.message ?? `Error fetching ${name}`)
  return schema ? schema.parse(raw) : raw
}

/**
 * Patch data to a URL
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @param data - The data to send in the request
 * @returns The response from the server
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @example Update a post on the JSONPlaceholder API
 * ```ts
 * const post = await patch('post', 'https://jsonplaceholder.typicode.com/posts/1', {
 *   title: 'Hello, World!'
 * })
 * console.log(post) // { userId: 1, id: 1, title: 'Hello, World!', body: '...' }
 * ```
 */
export async function patch<Data = unknown>(
  name: string,
  url: string | URL | Request,
  data: Data
): Promise<unknown>

/**
 * Patch data to a URL and validate the response with a schema
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @param data - The data to send in the request
 * @param schema - The schema to validate the response with
 * @returns The response from the server
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @throws An error if the response does not match the schema
 * @example Update a post on the JSONPlaceholder API with validation
 * ```ts
 * const PostSchema = z.object({
 *   userId: z.number(),
 *   id: z.number(),
 *   title: z.string(),
 *   body: z.string()
 * })
 * const post = await patch('post', 'https://jsonplaceholder.typicode.com/posts/1', {
 *   title: 'Hello, World!'
 * }, PostSchema)
 * console.log(post) // { userId: 1, id: 1, title: 'Hello, World!', body: '...' }
 * ```
 */
export async function patch<Data = unknown, Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  data: Data,
  schema: Schema
): Promise<ReturnType<Schema['parse']>>

export async function patch<Data = unknown, Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  data: Data,
  schema?: Schema
) {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data)
  })
  if (!res.ok) {
    if (res.status === 404) throw new Error(`${name} was not found`)
    throw new Error(`Failed to fetch ${name}`)
  }
  const raw = await res.json()
  if (raw.error) throw new Error(raw.message ?? `Error fetching ${name}`)
  return schema ? schema.parse(raw) : raw
}

/**
 * Delete a resource from a URL
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @returns The response from the server
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @example Delete a post from the JSONPlaceholder API
 * ```ts
 * await del('post', 'https://jsonplaceholder.typicode.com/posts/1')
 * ```
 */
export async function del(
  name: string,
  url: string | URL | Request
): Promise<unknown>

/**
 * Delete a resource from a URL and validate the response with a schema
 * @param name - The name of the resource
 * @param url - The URL to fetch the resource from
 * @param schema - The schema to validate the response with
 * @returns The response from the server
 * @throws An error if the resource is not found or if the request fails
 * @throws An error if the response contains an error message
 * @throws An error if the response does not match the schema
 * @example Delete a post from the JSONPlaceholder API with validation
 * ```ts
 * const RequestSchema = z.object({})
 * await del('post', 'https://jsonplaceholder.typicode.com/posts/1', RequestSchema)
 * ```
 */
export async function del<Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  schema: Schema
): Promise<ReturnType<Schema['parse']>>

export async function del<Schema extends ZodType = ZodType>(
  name: string,
  url: string | URL | Request,
  schema?: Schema
) {
  const res = await fetch(url, { method: 'DELETE' })
  if (!res.ok) {
    if (res.status === 404) throw new Error(`${name} was not found`)
    throw new Error(`Failed to fetch ${name}`)
  }
  const raw = await res.json()
  if (raw.error) throw new Error(raw.message ?? `Error fetching ${name}`)
  return schema ? schema.parse(raw) : raw
}

// If we are in a development environment, add the functions to the global object for debugging
if (import.meta.env.DEV) {
  // This is necessary so that the functions can be accessed in the browser console, but doesn't type them as globals
  const Window = window as unknown as {
    get: typeof get
    post: typeof post
    put: typeof put
    patch: typeof patch
    del: typeof del
  }
  Window.get = get
  Window.post = post
  Window.put = put
  Window.patch = patch
  Window.del = del
}
