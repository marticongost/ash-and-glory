import { eraLabels, type Boon } from "@/models/fate"
import styles from "./BoonCard.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"

export interface BoonCardProps extends StandardComponentProps {
  boon: Boon
}

export const BoonCard = ({ boon, ...baseProps }: BoonCardProps) => (
  <div {...getStandardAttributes(baseProps, styles.BoonCard)} data-era={boon.era}>
    <div className={styles.titleBar}>
      <div className={styles.era}>
        <div className={styles.eraLabel}>{eraLabels[boon.era]}</div>
      </div>
      <div className={styles.title}>{boon.title}</div>
    </div>
    <div className={styles.resourceSets}>
      {boon.resourceSets.map((resourceSet, index) => (
        <ResourceSetDisplay key={index} className={styles.resources} arrangement="column" resourceSet={resourceSet} />
      ))}
    </div>
  </div>
)
