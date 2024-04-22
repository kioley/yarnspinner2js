export function countIndents(str: string) {
  return str.match(/^\s+/)?.[0].length || 0
}

export function isEmpty(str: string) {
  return !/\S/.test(str)
}

export function isComment(str: string) {
  return /^\/\//.test(str)
}

export function isOption(str: string) {
  return /\s*->/.test(str)
}

export function isIf(str: string) {
  return /\s*<<if/.test(str)
}

export function isVariable(str: string) {
  return /\s*<<(declare|set)/.test(str)
}

export function isJump(str: string) {
  return /\s*<<jump/.test(str)
}

export function isCommand(str: string) {
  return /\s*<</.test(str)
}

export function normalizeString(str: string): string {
  return str.trim().replace(/\s+/g, " ")
}
