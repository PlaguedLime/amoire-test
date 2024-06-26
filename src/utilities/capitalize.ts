/**
 * Capitalizes the first letter of a string.
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 * @source
 * @example
 * ```ts
 * capitalize('hello'); // 'Hello'
 * capitalize('HELLO'); // 'Hello'
 * capitalize('hElLo'); // 'Hello'
 * ```
 */
export default function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
