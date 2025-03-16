const OUTLINE_TITLE_ATTR = "data-outline-title"

export interface OutlineNodeProps {
  id: string
  number: string
  title: string
  depth: number
  children: Array<OutlineNodeProps>
  parent?: OutlineNode
}

export class OutlineNode {
  readonly id: string
  readonly title: string
  readonly number: string
  readonly depth: number
  readonly children: Array<OutlineNode>
  readonly parent?: OutlineNode

  constructor({ id, title, number, depth, children, parent }: OutlineNodeProps) {
    this.id = id
    this.title = title
    this.number = number
    this.depth = depth
    this.children = children.map((childProps) => new OutlineNode({ ...childProps, parent: this }))
    this.parent = parent
  }
}

export interface OutlineOptions {
  numberClassName?: string
}

export const getOutline = (root: HTMLElement, options: OutlineOptions = {}): OutlineNode => {
  const descend = (element: HTMLElement, outline: OutlineNodeProps) => {
    if (isSectioningContent(element)) {
      const childOutlineNode: OutlineNodeProps = {
        id: element.id,
        title: "",
        number: `${outline.number ? outline.number + "." : ""}${outline.children.length + 1}`,
        depth: outline.depth + 1,
        children: [],
      }
      outline.children.push(childOutlineNode)
      outline = childOutlineNode
    } else {
      const headingLevel = getHeadingLevel(element)
      // TODO: Add support for implicit sections created by h2-h6 headings
      if (headingLevel > 1) {
        console.error("h2-h6 headings are not supported")
      } else if (headingLevel === 1) {
        outline.title = element.getAttribute(OUTLINE_TITLE_ATTR) || element.textContent || ""
        element.setAttribute(OUTLINE_TITLE_ATTR, outline.title)
        if (outline.number && options.numberClassName && !element.querySelector(`.${options.numberClassName}`)) {
          const numberLink = document.createElement("a")
          numberLink.href = `#${outline.id}`
          numberLink.className = options.numberClassName
          numberLink.textContent = outline.number
          element.insertBefore(numberLink, element.firstChild)
        }
      }
    }

    for (const childElement of element.children) {
      if (childElement instanceof HTMLElement) {
        descend(childElement, outline)
      }
    }
  }

  const outline: OutlineNodeProps = {
    id: root.id,
    title: "",
    number: "",
    depth: 0,
    children: [],
  }

  descend(root, outline)
  return new OutlineNode(outline)
}

const isSectioningContent = (container: HTMLElement): boolean => {
  return (
    container.tagName === "SECTION" ||
    container.tagName === "ARTICLE" ||
    container.tagName === "ASIDE" ||
    container.tagName === "HEADER" ||
    container.tagName === "FOOTER"
  )
}

const getHeadingLevel = (element: HTMLElement): number => {
  const tagName = element.tagName
  if (tagName === "H1") return 1
  if (tagName === "H2") return 2
  if (tagName === "H3") return 3
  if (tagName === "H4") return 4
  if (tagName === "H5") return 5
  if (tagName === "H6") return 6
  return 0
}
