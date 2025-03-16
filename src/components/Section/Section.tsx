import type { ReactNode } from "react"
import styles from "./Section.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface SectionProps extends StandardComponentProps {
  title: string
  children?: ReactNode
}

export const Section = ({ title, children, id, ...baseProps }: SectionProps) => {
  id = id || generateIdFromTitle(title)
  return (
    <section {...getStandardAttributes({ ...baseProps, id }, styles.Section)}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

export const generateIdFromTitle = (title: string): string => {
  let id = title.toLowerCase().trim()
  id = removeDiacritics(id)
  id = id.replace(stopWordsRegex, "")
  id = id.replace(/[^a-z0-9]+/g, "-")
  return id
}

const stopWordsRegex = /\b(i|o|a|per|un|una|el|la|l'|de|del|d')\b/g

const removeDiacritics = (text: string): string => {
  return text
    .replace("·", "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
