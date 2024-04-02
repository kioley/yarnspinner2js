import { StringsIter, Option, OptionsBlock } from "./i"
import { parseStrings } from "./parseBody"
import { countIndents, isOption, normalizeString } from "./utils"
import { _settings } from "."

export function parseOptionsBlock(strings: StringsIter): OptionsBlock {
  const options: OptionsBlock = {
    type: "optionsBlock",
    options: [],
  }

  const indents = countIndents(strings.getLine())

  for (const str of strings) {
    strings.stepBack()
    if (!isOption(str) || countIndents(str) < indents) break
    const option = parseOption(strings)
    options.options.push(option)
  }

  return options
}

function parseOption(strings: StringsIter): Option {
  const str = strings.next().value
  const option: Option = {
    type: "option",
    text: extractOptionText(str),
    body: [],
  }

  const indents = countIndents(str)

  option.body = parseStrings(strings, (s) => {
    if (countIndents(s) > indents) return false

    strings.stepBack()

    return true
  })

  return option
}

export function extractOptionText(option: string): string {
  const prefixLength = 2
  let text = option.trimStart().substring(prefixLength)

  if (_settings.normalizeText) text = normalizeString(text)

  return text
}
