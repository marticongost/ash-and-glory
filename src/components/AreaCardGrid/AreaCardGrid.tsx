import type { Area } from "@/models/areas"
import styles from "./AreaCardGrid.module.scss"
import { AreaCard } from "../AreaCard"

export interface AreaCardGridProps {
  areas: Area[]
}

export const AreaCardGrid = ({ areas }: AreaCardGridProps) => (
  <div className={styles.AreaCardGrid}>
    {areas.map((area) => (
      <AreaCard key={area.id} area={area} />
    ))}
  </div>
)
