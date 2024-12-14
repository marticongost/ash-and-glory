import type { ReactNode } from "react"
import { Content } from "../Content"
import styles from "./Article.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface ArticleProps extends StandardComponentProps {
  title: string
  children: ReactNode
}

export const Article = ({ title, children, ...baseProps }: ArticleProps) => (
  <div {...getStandardAttributes(baseProps, styles.Article)}>
    <Content className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </Content>
  </div>
)
