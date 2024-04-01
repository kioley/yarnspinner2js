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

export type Line = OptionsBlock | Speech | ConditionsBlock | Variable

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
  getPreviousLine(): string
}

export interface ConditionItem {
  condition: string
  body: Line[]
}

export interface ConditionsBlock {
  type: "conditionsBlock"
  condition: string
  body: Line[]
  elseifs: ConditionItem[]
  else?: Line[]
}

export interface Variable {
  type: "declare" | "set"
  name: string
  value: string
}
