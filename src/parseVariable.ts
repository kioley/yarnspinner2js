import { Variable } from "./i"
import { normalizeString } from "./utils/strings"

const declarePrefixLength = 10
const setPrefixLength = 6
const postfixPosition = -2

export function parseVariable(str: string): Variable {
  str = str.trim()
  let prefixLength = declarePrefixLength
  let type: Variable["type"] = "declare"

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
  const name = str.slice(prefixLength, splitIndex)
  let value = str.slice(splitIndex + separator.length, postfixPosition)

  if (operator) {
    value = name + operator + "(" + value + ")"
  }

  value = normalizeString(value)

  return {
    type,
    name,
    value,
  }
}
