import { StringsIter } from "../i"

export function createStringsIter(arr: string[]): StringsIter {
  let index = 0
  // let value = arr[index]
  return {
    next(): IteratorResult<string> {
      if (index >= arr.length) return { done: true, value: undefined }
      // value = arr[index]
      // index++
      return { done: false, value: arr[index++] }
    },
    stepBack() {
      index--
      if (index < 0) index = 0
    },
    [Symbol.iterator]: function (): StringsIter {
      return this
    },
    getLine() {
      return arr[index]
    },
    getPreviousLine() {
      return arr[index - 1]
    },
  }
}
