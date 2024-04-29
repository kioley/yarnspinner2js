import { Command } from "./i"

export function parseCommand(str: string): Command {
  str = str.trim()
  const name = str.match(/<<\w+/)?.[0].slice(2) || ""
  return {
    type: "command",
    name,
    parameters: str
      .slice(name.length + 2, -2)
      .trim()
      .split(/\s+/),
  }
}
