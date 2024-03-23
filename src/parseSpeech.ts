import { _settings } from "."
import { iSpeech } from "./i"

export function parseSpeech(speech: string): iSpeech {
  const [name, text] = extractSpeech(speech)
  return {
    type: "speech",
    name,
    text,
  }
}

function extractSpeech(speech: string): [string, string] {
  speech = speech.trim()
  let name = ""
  let text = speech
  const splitIndex = speech.indexOf(_settings.separator)

  if (splitIndex !== -1) {
    name = speech.substring(0, splitIndex)
    text = speech.substring(splitIndex + _settings.separator.length)
  }
  return [name, text]
}
