import { _settings } from "."
import { iVariable } from "./i"
import { normalizeString } from "./utils"

const declarePrefixLength = 10
const setPrefixLength = 6
const postfixPosition = -2

export function parseVariable(str: string): iVariable {
  str = str.trim()
  let prefixLength = declarePrefixLength
  let type: iVariable["type"] = "declare"

  if (str.startsWith("<<set")) {
    prefixLength = setPrefixLength
    type = "set"
  }

  let separator = " = "
  let operator = ""

  if (/<<set/.test(str) && /\sto\s/.test(str)) {
    separator = " to "
  } else if (str.startsWith("<<set") && str.includes(" += ")) {
    separator = " += "
    operator = " + "
  } else if (str.startsWith("<<set") && str.includes(" -= ")) {
    separator = " -= "
    operator = " - "
  } else if (str.startsWith("<<set") && str.includes(" *= ")) {
    separator = " *= "
    operator = " * "
  } else if (str.startsWith("<<set") && str.includes(" /= ")) {
    separator = " /= "
    operator = " / "
  } else if (str.startsWith("<<set") && str.includes(" %= ")) {
    separator = " %= "
    operator = " % "
  } else if (!/\s=\s/.test(str)) {
    throw new SyntaxError("Missing assignment operator at" + str)
  }

  const splitIndex = str.indexOf(separator)
  let name = str.slice(prefixLength, splitIndex)
  let value = str.slice(splitIndex + separator.length, postfixPosition)

  if (operator) {
    value = name + operator + "(" + value + ")"
  }

  if (_settings.normalizeText) {
    name = normalizeString(name)
    value = value.trim()
  }

  return {
    type,
    name,
    value,
  }
}
