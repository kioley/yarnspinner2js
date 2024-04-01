import { Header, Node, Settings } from "./i"
import { parseBody } from "./parseBody"

export function parseYarnSpinner(yarnRaw: string, settings?: Settings) {
  Object.assign(_settings, settings)
  const nodes: Node[] = []

  const nodesRaw = yarnRaw.split(/===\r?\n/)

  for (const nodeRaw of nodesRaw) {
    if (!nodeRaw.trim()) continue

    const node: Node = {
      header: {},
      body: [],
    }

    const [headerRaw, bodyRaw] = splitNode(nodeRaw)

    const header = parseNodeHeader(headerRaw)

    if (!header.title) {
      throw new SyntaxError("One of the nodes has no title")
    }

    node.header = header

    node.body = parseBody(bodyRaw)
    nodes.push(node)
  }

  return nodes
}

function splitNode(nodeRaw: string): [headerRaw: string, bodyRaw: string] {
  if (!/---\r?\n/.test(nodeRaw)) {
    throw new SyntaxError("One of the nodes has no delimiter")
  }

  const [headerRaw, bodyRaw, ...nodeParts] = nodeRaw.split(/---\r?\n/)

  if (nodeParts.length || !headerRaw.trim()) {
    throw new SyntaxError("One of the nodes has no header")
  }

  return [headerRaw, bodyRaw]
}

function parseNodeHeader(headerRaw: string): Header {
  const header: Header = {}

  const headerStrings = headerRaw.split("\n").map((s) => s.trim())

  for (const string of headerStrings) {
    const [key, value] = string.split(/:(.*)/)

    if (!key || _settings.ignoreHeaderParameters.includes(key)) continue

    header[key.trim()] = value === undefined ? "" : value.trim()
  }

  return header
}

export const _settings = {
  ignoreHeaderParameters: [""],
  normalizeText: true,
}
