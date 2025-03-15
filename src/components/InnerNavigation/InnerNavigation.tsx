"use client"

import { usePathname } from "next/navigation"
import styles from "./InnerNavigation.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { getTopSection } from "@/modules/navigation"
import Link from "next/link"
import { createElement } from "react"

export interface InnerNavigationProps extends StandardComponentProps {}

export const InnerNavigation = ({ ...baseProps }: InnerNavigationProps) => {
  const pathName = usePathname()
  const sections = getTopSection(pathName)?.children || []
  return (
    <nav {...getStandardAttributes(baseProps, styles.InnerNavigation)}>
      {sections.map((section) => (
        <Link
          className={styles.link}
          key={section.id}
          href={section.getEffectiveUrl()}
          data-state={section.getSelectionState(pathName)}
        >
          {createElement(section.icon, { className: styles.icon })}
          <span className={styles.label}>{section.title}</span>
        </Link>
      ))}
    </nav>
  )
}
