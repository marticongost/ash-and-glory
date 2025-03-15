import { focusLevelLabels, type Focus } from "@/models/focus"
import styles from "./FocusCard.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"

export interface FocusCardProps extends StandardComponentProps {
  focus: Focus
}

export const FocusCard = ({ focus, ...baseProps }: FocusCardProps) => (
  <div {...getStandardAttributes(baseProps, styles.FocusCard)} data-era={focus.era}>
    <div className={styles.titleBar}>
      <div className={styles.era}>
        <div className={styles.eraLabel}>{focusLevelLabels[focus.era]}</div>
      </div>
      <div className={styles.title}>{focus.title}</div>
    </div>
    <div className={styles.resourceSets}>
      {focus.resourceSets.map((resourceSet, index) => (
        <ResourceSetDisplay key={index} className={styles.resources} arrangement="flat" resourceSet={resourceSet} />
      ))}
    </div>
  </div>
)
