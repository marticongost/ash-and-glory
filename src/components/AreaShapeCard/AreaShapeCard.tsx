import type { HexSet } from "@/modules/hex"
import styles from "./AreaShapeCard.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { HexGrid } from "../HexGrid"

export interface AreaShapeCardProps extends StandardComponentProps {
  shape: HexSet
}

export const AreaShapeCard = ({ ...baseProps }: AreaShapeCardProps) => (
  <div {...getStandardAttributes(baseProps, styles.AreaShapeCard)}>
    <HexGrid className={styles.hexGrid} hexSet={baseProps.shape} />
  </div>
)
