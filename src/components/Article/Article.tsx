"use client"

import { useRef, type ReactNode } from "react"
import { Content } from "../Content"
import styles from "./Article.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { TableOfContents } from "../TableOfContents"

export interface ArticleProps extends StandardComponentProps {
  title: string
  children: ReactNode
}

export const Article = ({ title, children, ...baseProps }: ArticleProps) => {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} {...getStandardAttributes(baseProps, styles.Article)}>
      <TableOfContents className={styles.toc} contentRoot={ref} />
      <div className={styles.viewport}>
        <Content className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </Content>
      </div>
    </div>
  )
}
