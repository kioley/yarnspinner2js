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

    // console.log(str)

    let line: Line | undefined

    if (lineIsIfBlockStart(str)) {
      // console.log("if:", str)
      strings.stepBack()
      line = parseIfBlock(strings)
    } else if (lineIsVariable(str)) {
      // console.log("set:", str)
      line = parseVariable(str)
    } else if (lineIsJump(str)) {
      // console.log("jump:", str)
      line = parseJump(str)
    } else if (lineIsCommand(str)) {
      // console.log("command:", str)
      line = parseCommand(str)
    } else if (lineIsOption(str)) {
      // console.log("option:", str)
      strings.stepBack()
      line = parseOptionsBlock(strings)
    } else {
      // console.log("speech:", str)
      line = parseSpeech(str)
    }

    line && body.push(line)
  }
  return body
}
