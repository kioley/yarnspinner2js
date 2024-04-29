import { Speech } from "./i"
import {
  extractCondition,
  extractID,
  hideEscapingChars,
  normalizeString,
  showEscapingChars,
} from "./utils/strings"

export function parseSpeech(str: string): Speech {
  str = hideEscapingChars(str)
  const [_speech, id] = extractID(str)
  const [speech, condition] = extractCondition(_speech)

  const [name, text] = extractSpeech(speech)
  return {
    type: "speech",
    name,
    text,
    condition,
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

  if (text.startsWith(" ")) text = text.substring(1)
  name = showEscapingChars(name)
  text = showEscapingChars(text)

  return [normalizeString(name), normalizeString(text)]
}
