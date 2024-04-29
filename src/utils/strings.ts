import { _settings } from ".."

const escapingChars = {
  "\\": "L34KLFdfg3",
  "#": "jt5437teWY",
  "/": "kdf8438hjf",
  "[": "asLS8345KL",
  "]": "fsdkgDf768",
  ">": "dK48fkK20G",
  "<": "F7gi8f3Jk0",
}

export function normalizeString(str: string): string {
  return _settings.normalizeText ? str.trim().replace(/\s+/g, " ") : str
}

export function extractID(str: string): [string, string] {
  let id: string
  ;[str, id] = str.split("#")

  return [str, id ? normalizeString(id) : ""]
}

export function clearComment(str: string): string {
  return str.split("//")[0]
}

export function extractCondition(str: string): [string, string] {
  const reg = str.match(/(<<if(.+)>>)\s*$/)

  if (!reg?.length) {
    return [str, ""]
  }

  str = str.replace(reg?.[1], "")

  const condition = normalizeString(reg?.[2])

  return [str, condition]
}

export function hideEscapingChars(str: string) {
  for (const i in escapingChars) {
    str = str.split("\\" + i).join(escapingChars[i])
  }
  return str
}

export function showEscapingChars(str: string) {
  for (const i in escapingChars) {
    str = str.split(escapingChars[i]).join(i)
  }
  return str
}
