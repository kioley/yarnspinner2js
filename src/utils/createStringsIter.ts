import { StringsIter } from "../i"

export function createStringsIter(arr: string[]): StringsIter {
  let index = 0

  return {
    next(): IteratorResult<string> {
      if (index >= arr.length) return { done: true, value: undefined }
      return { done: false, value: arr[index++] }
    },
    stepBack() {
      index--
      if (index < 0) index = 0
    },
    [Symbol.iterator]: function (): StringsIter {
      return this
    },
    getLine(): string {
      return arr[index]
    },
  }
}
