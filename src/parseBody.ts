import {
  isCommand,
  isComment,
  isIf,
  isEmpty,
  isJump,
  isOption,
  isVariable,
} from "./utils"

import { StringsIter, Line } from "./i"
import { createStringsIter } from "./utils/createStringsIter"
import { parseSpeech } from "./parseSpeech"
import { parseVariable } from "./parseVariable"
import { parseOptionsBlock } from "./parseOptionsBlock"
import { parseIfBlock } from "./parseIfBlock"
import { parseJump } from "./parseJump"

export function parseBody(bodyRaw: string): Line[] {
  const nodeBody = createStringsIter(bodyRaw.split("\n"))

  return parseStrings(nodeBody)
}

export function parseStrings(
  strings: StringsIter,
  isOver?: (str: string) => boolean
): Line[] {
  const body: Line[] = []

  for (const str of strings) {
    if (isEmpty(str) || isComment(str)) continue

    if (isOver?.(str)) break

    let line: Line | undefined

    if (isIf(str)) {
      // console.log("if:", str)
      strings.stepBack()
      line = parseIfBlock(strings)
    } else if (isVariable(str)) {
      // console.log("set:", str)
      line = parseVariable(str)
    } else if (isJump(str)) {
      // console.log("jump:", str)
      line = parseJump(str)
    } else if (isCommand(str)) {
      // console.log("command:", str)
    } else if (isOption(str)) {
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
