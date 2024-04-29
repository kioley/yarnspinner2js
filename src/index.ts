import { NodeParameters, Node, Settings } from "./i"
import { parseBody } from "./parseBody"

export const _settings: Settings = {
  ignoreHeaderParameters: [""],
  normalizeText: true,
}

export function parseYarnSpinner(yarnRaw: string, settings?: Settings) {
  Object.assign(_settings, settings)
  const nodes: Node[] = []

  const nodesRaw = yarnRaw.split("\n===")

  for (const nodeRaw of nodesRaw) {
    if (!nodeRaw.trim()) continue

    const node: Node = {
      title: "",
      parameters: {},
      body: [],
    }

    const [headerRaw, bodyRaw] = splitNode(nodeRaw)

    ;[node.title, node.parameters] = parseNodeHeader(headerRaw)

    // node.title = title
    // node.parameters = params

    node.body = parseBody(bodyRaw)
    nodes.push(node)
  }

  return nodes
}

function splitNode(nodeRaw: string): [headerRaw: string, bodyRaw: string] {
  if (!/---\r?\n/.test(nodeRaw)) {
    throw new SyntaxError("One of the nodes has no delimiter")
  }

  const [headerRaw, bodyRaw, ...nodeParts] = nodeRaw.split("\n---")

  if (nodeParts.length || !headerRaw.trim()) {
    throw new SyntaxError("One of the nodes has no header")
  }

  return [headerRaw, bodyRaw]
}

function parseNodeHeader(headerRaw: string): [string, NodeParameters] {
  const params: NodeParameters = {}
  let title = ""

  const headerStrings = headerRaw.split("\n").map((s) => s.trim())

  for (const string of headerStrings) {
    // const [key, value] = string.split(/:(.*)/)
    const [key, value] = string.split(":").map((i) => i.trim())
    // key = key.trim()
    // value = value.trim()
    if (key === "title") {
      title = value
      continue
    }

    if (!key || _settings.ignoreHeaderParameters?.includes(key)) continue

    // params[key] = value === undefined ? "" : value
    key && (params[key] = value)
  }

  if (!title) {
    throw new SyntaxError("One of the nodes has no title")
  }
  return [title, params]
}
