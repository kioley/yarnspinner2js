import {
  lineIsCommand,
  lineIsComment,
  lineIsIfBlockStart,
  lineIsEmpty,
  lineIsJump,
  lineIsOption,
  lineIsVariable,
} from "./utils"

import { StringsIter, Line } from "./i"
import { createStringsIter } from "./utils/createStringsIter"
import { parseSpeech } from "./parseSpeech"
import { parseVariable } from "./parseVariable"
import { parseOptionsBlock } from "./parseOptionsBlock"
import { parseIfBlock } from "./parseIfBlock"
import { parseJump } from "./parseJump"
import { parseCommand } from "./parseCommand"
import { clearComment } from "./utils/strings"

export function parseBody(bodyRaw: string): Line[] {
  const nodeBody = createStringsIter(bodyRaw.split("\n"))

  return parseStrings(nodeBody)
}

export function parseStrings(
  strings: StringsIter,
  isOver?: (str: string) => boolean
): Line[] {
  const body: Line[] = []

  for (let str of strings) {
    if (lineIsEmpty(str) || lineIsComment(str)) continue

    if (isOver?.(str)) break

    str = clearComment(str)

    let line: Line | undefined

    if (lineIsIfBlockStart(str)) {
      strings.stepBack()
      line = parseIfBlock(strings)
    } else if (lineIsVariable(str)) {
      line = parseVariable(str)
    } else if (lineIsJump(str)) {
      line = parseJump(str)
    } else if (lineIsCommand(str)) {
      line = parseCommand(str)
    } else if (lineIsOption(str)) {
      strings.stepBack()
      line = parseOptionsBlock(strings)
    } else {
      line = parseSpeech(str)
    }

    line && body.push(line)
  }
  return body
}
