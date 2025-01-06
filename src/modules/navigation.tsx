import RulesIcon from "@/svg/sections/rules.svg"
import BuildingsIcon from "@/svg/sections/buildings.svg"
import TraitsIcon from "@/svg/sections/traits.svg"
import FocusesIcon from "@/svg/sections/focuses.svg"
import type { JSXElementConstructor } from "react"

export interface SectionProps {
  id: string
  title: string
  icon: JSXElementConstructor<any>
}

export type SelectionState = "unselected" | "selection-ancestor" | "selected"

export class Section {
  readonly id: string
  readonly title: string
  readonly icon: JSXElementConstructor<any>
  readonly url: string

  constructor({ id, title, icon }: SectionProps) {
    this.id = id
    this.title = title
    this.icon = icon
    this.url = id ? `/${id}/` : "/"
  }

  getSelectionState(pathName: string): SelectionState {
    // Normalise the path
    pathName = pathName.trim()
    if (!pathName.startsWith("/")) {
      pathName = "/" + pathName
    }
    if (!pathName.endsWith("/")) {
      pathName += "/"
    }

    if (pathName === this.url) {
      return "selected"
    }
    if (pathName.startsWith(this.url)) {
      return "selection-ancestor"
    }
    return "unselected"
  }
}

export const sections: Section[] = [
  new Section({ id: "rules", title: "Regles", icon: RulesIcon }),
  new Section({ id: "buildings", title: "Edificis", icon: BuildingsIcon }),
  new Section({ id: "traits", title: "Trets", icon: TraitsIcon }),
  new Section({ id: "focuses", title: "Cartes de focus", icon: FocusesIcon }),
]

export const getSection = (id: string): Section | undefined => {
  for (let section of sections) {
    if (section.id === id) {
      return section
    }
  }
  return undefined
}

export const requireSection = (id: string): Section => {
  const section = getSection(id)
  if (!section) {
    throw new Error(`Unknown section: ${id}`)
  }
  return section
}
