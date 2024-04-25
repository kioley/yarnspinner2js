import { Speech } from "./i"
import { extractID, normalizeString } from "./utils/strings"

export function parseSpeech(str: string): Speech {
  const [speech, id] = extractID(str)

  const [name, text] = extractSpeech(speech)
  return {
    type: "speech",
    name,
    text,
    id,
  }
}

function extractSpeech(speech: string): [string, string] {
  speech = speech.trimStart()
  let name = ""
  let text = speech
  const splitIndex = speech.indexOf(":")

  if (splitIndex !== -1) {
    name = speech.substring(0, splitIndex)
    text = speech.substring(splitIndex + 1)
  }

  return [normalizeString(name), normalizeString(text)]
}
