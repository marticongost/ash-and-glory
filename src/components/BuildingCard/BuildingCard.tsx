import type { Building } from "@/models/buildings"
import styles from "./BuildingCard.module.scss"
import { createElement } from "react"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { CapabilityDisplay } from "../CapabilityDisplay"

export interface BuildingCardProps extends StandardComponentProps {
  building: Building
}

export const BuildingCard = ({ building, ...baseProps }: BuildingCardProps) => (
  <div {...getStandardAttributes(baseProps, styles.BuildingCard)}>
    <div className={styles.titleBar}>
      {createElement(building.icon, { className: styles.icon })}
      <div className={styles.taxonomy}>
        <div className={styles.title}>{building.title}</div>
        <div className={styles.types}>
          {building.types.map((type) => (
            <div className={styles.type} key={type.id}>
              {type.title}
            </div>
          ))}
        </div>
      </div>
      <ResourceSetDisplay className={styles.cost} resourceSet={building.cost} arrangement="vertical" />
    </div>
    <div className={styles.capabilities}>
      {building.capabilities.map((capability) => (
        <CapabilityDisplay key={capability.id} capability={capability} />
      ))}
    </div>
  </div>
)
