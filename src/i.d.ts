export interface iSettings {
  ignoreHeaderParameters?: string[]
  normalizeText?: boolean
}

export interface iNode {
  header: iHeader
  body: iLine[]
}

export interface iHeader {
  [key: string]: string
}

export type iLine = iOptionsBlock | iSpeech | iConditionsBlock | iVariable

export interface iSpeech {
  type: "speech"
  name: string
  text: string
}

export interface iOption {
  type: "option"
  text: string
  body: iLine[]
}

export interface iOptionsBlock {
  type: "optionsBlock"
  options: iOption[]
}

export interface iIteratorWithStepBack<T> extends IterableIterator<T> {
  stepBack(): void
}

export interface iConditionItem {
  condition: string
  body: iLine[]
}

export interface iConditionsBlock {
  type: "conditionsBlock"
  condition: string
  body: iLine[]
  elseifs: iConditionItem[]
  else?: iLine[]
}

export interface iVariable {
  type: "declare" | "set"
  name: string
  value: string
}
