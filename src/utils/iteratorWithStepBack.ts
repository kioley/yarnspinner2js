import { iIteratorWithStepBack } from "../i"

export function createIteratorWithStepBack<T>(
  arr: T[]
): iIteratorWithStepBack<T> {
  let index = 0
  let value = arr[index]
  return {
    next(): IteratorResult<T> {
      if (index >= arr.length) return { done: true, value: undefined }
      value = arr[index]
      index++
      return { done: false, value }
    },
    stepBack() {
      index--
      if (index < 0) index = 0
    },
    [Symbol.iterator]: function (): iIteratorWithStepBack<T> {
      return this
    },
  }
}
