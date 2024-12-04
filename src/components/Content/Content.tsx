import type { ReactNode } from "react"
import styles from "./Content.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface ContentProps extends StandardComponentProps {
  children: ReactNode
}

export const Content = ({ children, ...baseProps }: ContentProps) => (
  <div {...getStandardAttributes(baseProps, styles.Content)}>{children}</div>
)
