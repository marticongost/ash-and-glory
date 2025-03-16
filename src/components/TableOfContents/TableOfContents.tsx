import { getOutline, type OutlineNode } from "@/modules/outline"
import styles from "./TableOfContents.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { useCallback, useEffect, useState } from "react"
import { useWindowEventListener } from "@/modules/hooks"

export interface TableOfContentsProps extends StandardComponentProps {
  contentRoot: React.RefObject<HTMLElement>
}

export const TableOfContents = ({ contentRoot, ...baseProps }: TableOfContentsProps) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>("")
  const [outline, setOutline] = useState<OutlineNode | undefined>(undefined)

  const updateHash = useCallback(() => {
    setSelectedSectionId((location.hash || "#").substring(1))
    document.querySelector(`.${styles.link}[href="${location.hash}"]`)?.scrollIntoView()
  }, [])

  useWindowEventListener("hashchange", updateHash)

  useEffect(() => {
    updateHash()
    if (contentRoot.current !== null) {
      setOutline(getOutline(contentRoot.current, { numberClassName: styles.inlineNumberLink }))
      if (location.hash) {
        document.querySelector(location.hash)?.scrollIntoView()
      }
    }
  }, [contentRoot])
  return outline ? (
    <div {...getStandardAttributes(baseProps, styles.TableOfContents)}>
      <TableOfContentsEntries outline={outline} selectedSectionId={selectedSectionId} />
    </div>
  ) : null
}

export const TableOfContentsEntries = ({
  outline,
  selectedSectionId,
}: {
  outline: OutlineNode
  selectedSectionId: string
}) => (
  <ul className={styles.TableOfContentsEntries} data-depth={outline.depth}>
    {outline.children.map((child) => (
      <TableOfContentsEntry key={child.id} outline={child} selectedSectionId={selectedSectionId} />
    ))}
  </ul>
)

export const TableOfContentsEntry = ({
  outline,
  selectedSectionId,
}: {
  outline: OutlineNode
  selectedSectionId: string
}) => (
  <li key={outline.id} className={styles.TableOfContentsEntry}>
    <a
      className={styles.link}
      href={`#${outline.id}`}
      data-state={selectedSectionId === outline.id ? "selected" : "unselected"}
    >
      <span className={styles.number}>{outline.number}</span>
      <span className={styles.title}>{outline.title}</span>
    </a>
    <TableOfContentsEntries outline={outline} selectedSectionId={selectedSectionId} />
  </li>
)
