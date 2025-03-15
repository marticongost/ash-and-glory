import { AreaShapeCard } from "../AreaShapeCard"
import styles from "./AreaShapeGrid.module.scss"
import type { HexSet } from "@/modules/hex"

export interface AreaShapeGridProps {
  shapes: HexSet[]
}

export const AreaShapeGrid = ({ shapes }: AreaShapeGridProps) => (
  <div className={styles.AreaShapeGrid}>
    {shapes.map((shape, index) => (
      <AreaShapeCard key={index} shape={shape} />
    ))}
  </div>
)
