"use client"

import { usePathname } from "next/navigation"
import styles from "./InnerNavigation.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { requireTopSection } from "@/modules/navigation"
import Link from "next/link"
import { createElement } from "react"

export interface InnerNavigationProps extends StandardComponentProps {}

export const InnerNavigation = ({ ...baseProps }: InnerNavigationProps) => {
  const pathName = usePathname()
  const topSection = requireTopSection(pathName)
  return (
    <nav {...getStandardAttributes(baseProps, styles.InnerNavigation)}>
      {topSection.children.map((section) => (
        <Link
          className={styles.link}
          key={section.id}
          href={section.url}
          data-state={section.getSelectionState(pathName)}
        >
          {createElement(section.icon, { className: styles.icon })}
          <span className={styles.label}>{section.title}</span>
        </Link>
      ))}
    </nav>
  )
}
