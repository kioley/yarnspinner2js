import { _settings } from ".."

export function normalizeString(str: string): string {
  return _settings.normalizeText ? str.trim().replace(/\s+/g, " ") : str
}

export function splitWithEscaping(
  str: string,
  splitter: string
): [string, string] {
  const placeholder = "sad98KLFKsdfsadf0409t5igsdfg"
  const escaped = splitter
    .split("")
    .map((s) => "\\\\" + s)
    .join("")

  str = str.replace(new RegExp(escaped, "g"), placeholder)
  const strings = str.split(splitter)
  strings[0] = strings[0].replace(new RegExp(placeholder, "g"), splitter)

  return strings.length < 2 ? [strings[0], ""] : [strings[0], strings[1]]
}

export function extractID(str: string): [string, string] {
  let id: string
  ;[str, id] = splitWithEscaping(str, "#")
  id =
    id.startsWith("line:") && _settings.cutIdPrefixLine ? id.split(":")[1] : id
  return [str, normalizeString(id)]
}

export function clearComment(str: string): string {
  return splitWithEscaping(str, "//")[0]
}
