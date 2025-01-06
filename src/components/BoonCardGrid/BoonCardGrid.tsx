import { type Boon } from "@/models/boons"
import styles from "./BoonCardGrid.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { BoonCard } from "../BoonCard"

export interface BoonCardGridProps extends StandardComponentProps {
  boons: Boon[]
}

export const BoonCardGrid = ({ boons, ...baseProps }: BoonCardGridProps) => (
  <div {...getStandardAttributes(baseProps, styles.BoonCardGrid)}>
    {boons.map((boon) => (
      <BoonCard key={boon.id} boon={boon} />
    ))}
  </div>
)
