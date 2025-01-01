import { createElement, type JSXElementConstructor } from "react"
import styles from "./Reference.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface ReferenceProps extends StandardComponentProps {
  item: ReferencedItem | (() => ReferencedItem)
}

export interface ReferencedItem {
  id: string
  title: string
  icon: JSXElementConstructor<any>
}

export const Reference = ({ item, ...baseProps }: ReferenceProps) => {
  item = item instanceof Function ? item() : item
  return (
    <span {...getStandardAttributes(baseProps, styles.Reference)} data-item={item.id}>
      {createElement(item.icon, { className: styles.icon })}
      <span className={styles.title}>{item.title}</span>
    </span>
  )
}
