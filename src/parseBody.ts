import { isComment, isEmpty, isOption } from "./utils"
// import { extractLine } from "./strings"
import { iIteratorWithStepBack, iLine, iSpeech, iVariable } from "./i"
import { createIteratorWithStepBack } from "./utils/iteratorWithStepBack"

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

    if (/\s*<<if/.test(str)) {
      console.log("if:", str)
    } else if (/\s*<<(declare|set)/.test(str)) {
      console.log("set:", str)
    } else if (/\s*<<jump/.test(str)) {
      console.log("jump:", str)
    } else if (/\s*<</.test(str)) {
      console.log("command:", str)
    } else if (isOption(str)) {
      console.log("option:", str)
    } else {
      console.log("speech:", str)
    }

    line && body.push(line)
  }
  return body
}
