import {
  isCommand,
  isComment,
  isConditions,
  isEmpty,
  isJump,
  isOption,
  isVariable,
} from "./utils"

import { iIteratorWithStepBack, iLine } from "./i"
import { createIteratorWithStepBack } from "./utils/iteratorWithStepBack"
import { parseSpeech } from "./parseSpeech"

export function parseBody(bodyRaw: string): iLine[] {
  const strings = createIteratorWithStepBack(bodyRaw.split("\n"))

  return parseStrings(strings)
}

export function parseStrings(
  strings: iIteratorWithStepBack<string>,
  isOver?: (str: string) => boolean
): iLine[] {
  const body: iLine[] = []

  for (const str of strings) {
    if (isEmpty(str) || isComment(str)) continue

    if (isOver?.(str)) break

    let line: iLine | undefined

    if (isConditions(str)) {
      console.log("if:", str)
    } else if (isVariable(str)) {
      console.log("set:", str)
    } else if (isJump(str)) {
      console.log("jump:", str)
    } else if (isCommand(str)) {
      console.log("command:", str)
    } else if (isOption(str)) {
      console.log("option:", str)
    } else {
      console.log("speech:", str)
      line = parseSpeech(str)
    }

    line && body.push(line)
  }
  return body
}
