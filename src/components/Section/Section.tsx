import type { ReactNode } from "react"
import styles from "./Section.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface SectionProps extends StandardComponentProps {
  title: string
  children?: ReactNode
}

export const Section = ({ title, children, ...baseProps }: SectionProps) => (
  <section {...getStandardAttributes(baseProps, styles.Section)}>
    <h1>{title}</h1>
    {children}
  </section>
)
