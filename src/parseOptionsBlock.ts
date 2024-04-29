import { StringsIter, Option, OptionsBlock } from "./i"
import { parseStrings } from "./parseBody"
import { countIndents, lineIsOption } from "./utils"
import { extractCondition, extractID, normalizeString } from "./utils/strings"

export function parseOptionsBlock(strings: StringsIter): OptionsBlock {
  const options: OptionsBlock = {
    type: "options-block",
    options: [],
  }

  const indents = countIndents(strings.getLine())

  for (const str of strings) {
    strings.stepBack()
    if (!lineIsOption(str) || countIndents(str) < indents) break
    const option = parseOption(strings)
    options.options.push(option)
  }

  return options
}

function parseOption(strings: StringsIter): Option {
  const str = strings.next().value
  const [_text, id] = extractOptionTextAndId(str)
  const [text, condition] = extractCondition(_text)
  const option: Option = {
    type: "option",
    text: normalizeString(text),
    id,
    condition,
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

export function extractOptionTextAndId(option: string): [string, string] {
  const prefixLength = 2
  const text = option.trimStart().substring(prefixLength)
  return extractID(text)
}
