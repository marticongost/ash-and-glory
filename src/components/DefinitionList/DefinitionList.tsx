import type { ReactNode } from "react"
import styles from "./DefinitionList.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface DefinitionListProps extends StandardComponentProps {
  definitions: Definition[]
}

export interface Definition {
  term: ReactNode
  description: ReactNode
}

export const DefinitionList = ({ definitions, ...baseProps }: DefinitionListProps) => (
  <dl {...getStandardAttributes(baseProps, styles.DefinitionList)}>
    {definitions.map((definition, index) => (
      <div key={index} className={styles.definition}>
        <dt>{definition.term}</dt>
        <dd>{definition.description}</dd>
      </div>
    ))}
  </dl>
)
