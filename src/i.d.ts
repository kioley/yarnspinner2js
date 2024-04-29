export interface Settings {
  ignoreHeaderParameters?: string[]
  normalizeText?: boolean
}

export interface Node {
  title: string
  parameters: NodeParameters
  body: Line[]
}

export interface NodeParameters {
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
  condition: string
  id: string
}

export interface Option {
  type: "option"
  text: string
  body: Line[]
  condition: string
  id: string
}

export interface OptionsBlock {
  type: "options-block"
  options: Option[]
}

export interface ifBlockItem {
  type: "if-block-item"
  condition: string
  body: Line[]
}

export interface ifBlock {
  type: "if-block"
  items: ifBlockItem[]
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
  parameters: string[]
}
