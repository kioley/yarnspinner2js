export function countIndents(str: string) {
  return str.match(/^\s+/)?.[0].length || 0
}

export function isEmpty(str: string) {
  return !/\S/.test(str)
}

export function isComment(str: string) {
  return /^.*\/\//.test(str)
}

export function isOption(str: string) {
  return /\s*->/.test(str)
}
