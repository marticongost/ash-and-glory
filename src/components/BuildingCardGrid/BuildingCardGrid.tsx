import type { Building } from "@/models/buildings"
import styles from "./BuildingCardGrid.module.scss"
import { BuildingCard } from "../BuildingCard"

export interface BuildingCardGridProps {
  buildings: Building[]
}

export const BuildingCardGrid = ({ buildings }: BuildingCardGridProps) => (
  <div className={styles.BuildingCardGrid}>
    {buildings.map((building) => (
      <BuildingCard key={building.id} building={building} />
    ))}
  </div>
)
