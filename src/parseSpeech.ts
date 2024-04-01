import { _settings } from "."
import { Speech } from "./i"
import { normalizeString } from "./utils"

export function parseSpeech(speech: string): Speech {
  const [name, text] = extractSpeech(speech)
  return {
    type: "speech",
    name,
    text,
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

  if (_settings.normalizeText) {
    name = normalizeString(name)
    text = normalizeString(text)
  }

  return [name, text]
}
