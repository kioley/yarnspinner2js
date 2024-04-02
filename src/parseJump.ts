import { Jump } from "./i"

export function parseJump(str: string): Jump {
  return {
    type: "jump",
    to: str.trim().slice(6, -2).trim(),
  }
}
