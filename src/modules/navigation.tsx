import RulesIcon from "@/svg/sections/rules.svg"
import BuildingsIcon from "@/svg/sections/buildings.svg"
import TraitsIcon from "@/svg/sections/traits.svg"
import FocusesIcon from "@/svg/sections/focuses.svg"
import ExplorationIcon from "@/svg/sections/exploration.svg"
import ShapesIcon from "@/svg/sections/shapes.svg"
import AreasIcon from "@/svg/sections/areas.svg"
import type { JSXElementConstructor } from "react"

export interface SectionProps {
  id: string
  title: string
  icon: JSXElementConstructor<any>
  parent?: Section
  children?: SectionProps[]
  redirectToFirstChild?: boolean
}

export type SelectionState = "unselected" | "selection-ancestor" | "selected"

export class Section {
  readonly id: string
  readonly title: string
  readonly icon: JSXElementConstructor<any>
  readonly url: string
  readonly parent?: Section
  readonly children: Section[]
  readonly redirectToFirstChild: boolean

  constructor({ id, title, icon, parent, children, redirectToFirstChild = false }: SectionProps) {
    this.id = id
    this.title = title
    this.icon = icon
    if (!id.length) {
      throw new Error("Section id can't be empty")
    }
    console.log(id, parent)
    if (parent) {
      this.url = parent.url + id + "/"
    } else {
      this.url = `/${id}/`
    }
    this.parent = parent
    this.children = (children ?? []).map((childProps) => new Section({ ...childProps, parent: this }))
    this.redirectToFirstChild = redirectToFirstChild
  }

  getSelectionState(pathName: string): SelectionState {
    pathName = normalisePath(pathName)
    if (pathName === this.url) {
      return "selected"
    }
    if (pathName.startsWith(this.url)) {
      return "selection-ancestor"
    }
    return "unselected"
  }

  getEffectiveUrl(): string {
    if (this.redirectToFirstChild && this.children.length) {
      return this.children[0].url
    }
    return this.url
  }
}

export const sections: Section[] = [
  new Section({ id: "rules", title: "Regles", icon: RulesIcon }),
  new Section({ id: "buildings", title: "Edificis", icon: BuildingsIcon }),
  new Section({ id: "traits", title: "Trets", icon: TraitsIcon }),
  new Section({ id: "focuses", title: "Focus", icon: FocusesIcon }),
  new Section({
    id: "exploration",
    title: "Exploració",
    icon: ExplorationIcon,
    redirectToFirstChild: true,
    children: [
      new Section({ id: "areas", title: "Àrees", icon: AreasIcon }),
      new Section({ id: "shapes", title: "Formes", icon: ShapesIcon }),
    ],
  }),
]

const sectionsUrlIndex: Record<string, Section> = {}

const normalisePath = (pathName: string): string => {
  pathName = pathName.trim()
  if (!pathName.startsWith("/")) {
    pathName = "/" + pathName
  }
  if (!pathName.endsWith("/")) {
    pathName += "/"
  }
  return pathName
}

const buildSectionsUrlIndex = (section: Section) => {
  sectionsUrlIndex[section.url] = section
  section.children.forEach(buildSectionsUrlIndex)
}

sections.forEach(buildSectionsUrlIndex)

export const getSection = (pathName: string): Section | undefined => {
  return sectionsUrlIndex[normalisePath(pathName)]
}

export const getTopSection = (pathName: string): Section | undefined => {
  pathName = normalisePath(pathName)
  const topPathName = pathName.substring(0, pathName.indexOf("/", 1) + 1)
  return getSection(topPathName)
}

export const requireSection = (pathName: string): Section => {
  const section = getSection(pathName)
  if (!section) {
    throw new Error(`Unknown section: ${pathName}`)
  }
  return section
}
