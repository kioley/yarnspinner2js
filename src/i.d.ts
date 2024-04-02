export interface Settings {
  ignoreHeaderParameters?: string[]
  normalizeText?: boolean
}

export interface Node {
  header: Header
  body: Line[]
}

export interface Header {
  [key: string]: string
}

export type Line = OptionsBlock | Speech | ifBlock | Variable | Jump

export interface Speech {
  type: "speech"
  name: string
  text: string
}

export interface Option {
  type: "option"
  text: string
  body: Line[]
}

export interface OptionsBlock {
  type: "optionsBlock"
  options: Option[]
}

export interface StringsIter extends IterableIterator<string> {
  stepBack(): void
  getLine(): string
}

export interface ifItem {
  type: "elseif"
  condition: string
  body: Line[]
}

export interface ifBlock {
  type: "ifBlock"
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
