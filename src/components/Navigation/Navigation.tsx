"use client"

import { createElement } from "react"
import styles from "./Navigation.module.scss"
import Link from "next/link"
import { sections } from "@/modules/navigation"
import { usePathname } from "next/navigation"

export interface NavigationProps {}

export const Navigation = ({}: NavigationProps) => {
  const pathName = usePathname()
  return (
    <nav className={styles.Navigation}>
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
