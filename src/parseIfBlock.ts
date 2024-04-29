import { ifBlockItem, ifBlock, StringsIter } from "./i"
import { parseStrings } from "./parseBody"
import { normalizeString } from "./utils/strings"

export function parseIfBlock(strings: StringsIter): ifBlock {
  const ifBlock: ifBlock = {
    type: "if-block",
    items: [],
  }

  for (const str of strings) {
    if (str.includes("<<endif>>")) break

    const item: ifBlockItem = {
      type: "if-block-item",
      condition: "",
      body: [],
    }

    if (str.includes("<<if") || str.includes("<<elseif")) {
      item.condition = parseCondition(str)
    } else if (!str.includes("<<else>>")) {
      throw new SyntaxError(
        `The condition block must contain only lines <<elseif>>, <<else>>, <<endif>> and nested lines. Line: "${str}"`
      )
    }
    item.body = parseStrings(strings, (_str) => ifBlockOver(_str, strings))
    ifBlock.items.push(item)
  }

  return ifBlock
}

function parseCondition(str: string): string {
  const condition = str.match(/<<(if|elseif)(.*)>>/)?.[2] || ""

  if (!condition.trim()) {
    throw new SyntaxError(`Condition not found. Line: "${str}"`)
  }

  return normalizeString(condition)
}

function ifBlockOver(str: string, strings: StringsIter): boolean {
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
