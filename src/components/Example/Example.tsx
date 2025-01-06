import type { ReactNode } from "react"
import styles from "./Example.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import ExampleIcon from "@/svg/example.svg"

export interface ExampleProps extends StandardComponentProps {
  children: ReactNode
}

export const Example = ({ children, ...baseProps }: ExampleProps) => (
  <div {...getStandardAttributes(baseProps, styles.Example)}>
    <ExampleIcon className={styles.icon} />
    <div className={styles.content}>{children}</div>
  </div>
)
