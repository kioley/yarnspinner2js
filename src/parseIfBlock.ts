import { _settings } from "."
import { ifItem, ifBlock, StringsIter } from "./i"
import { parseStrings } from "./parseBody"
import { normalizeString } from "./utils"

const ifPrefixLength = 4
const elseifPrefixLength = 8
const postfixLength = -2

export function parseIfBlock(strings: StringsIter): ifBlock {
  const ifBlock: ifBlock = {
    type: "ifBlock",
    condition: "",
    body: [],
    elseif: [],
  }

  const str = strings.getLine()
  strings.next()
  ;({ condition: ifBlock.condition, body: ifBlock.body } = parseIfItem(
    str,
    strings,
    true
  ))

  for (const str of strings) {
    if (str.includes("<<endif>>")) break

    if (str.includes("<<else>>")) {
      ifBlock.else = parseStrings(strings, (_str) =>
        isIfBlockOver(_str, strings)
      )
    } else if (str.includes("<<elseif")) {
      const conditionItem = parseIfItem(str, strings)
      ifBlock.elseif.push(conditionItem)
    } else {
      throw new SyntaxError(
        `The condition block must contain only lines <<elseif>>, <<else>>, <<endif>> and nested lines. String: "${str}"`
      )
    }
  }

  return ifBlock
}

function parseIfItem(
  str: string,
  strings: StringsIter,
  isMainIf: boolean = false
): ifItem {
  const item: ifItem = {
    type: "elseif",
    condition: "",
    body: [],
  }

  let condition = str
    .trim()
    .slice(isMainIf ? ifPrefixLength : elseifPrefixLength, postfixLength)

  if (_settings.normalizeText) condition = normalizeString(condition)

  item.condition = condition

  item.body = parseStrings(strings, (_str) => isIfBlockOver(_str, strings))

  return item
}

function isIfBlockOver(str: string, strings: StringsIter): boolean {
  if (
    str.includes("<<else>>") ||
    str.includes("<<elseif") ||
    str.includes("<<endif>>")
  ) {
    strings.stepBack()
    return true
  }

  return false
}
