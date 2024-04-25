export interface Settings {
  ignoreHeaderParameters?: string[]
  normalizeText?: boolean
  cutIdPrefixLine?: boolean
}

export interface Node {
  header: Header
  body: Line[]
}

export interface Header {
  [key: string]: string
}

export interface StringsIter extends IterableIterator<string> {
  stepBack(): void
  getLine(): string
}

export type Line = OptionsBlock | Speech | ifBlock | Variable | Jump | Command

export interface Speech {
  type: "speech"
  name: string
  text: string
  id: string
}

export interface Option {
  type: "option"
  text: string
  body: Line[]
  id: string
}

export interface OptionsBlock {
  type: "options-block"
  options: Option[]
}

export interface ifItem {
  type: "elseif"
  condition: string
  body: Line[]
}

export interface ifBlock {
  type: "if-block"
  condition: string
  body: Line[]
  elseif: ifItem[]
  else?: Line[]
}

export interface Variable {
  type: "declare" | "set"
  name: string
  value: string
}

export interface Jump {
  type: "jump"
  to: string
}

export interface Command {
  type: "command"
  name: string
  params: string[]
}
