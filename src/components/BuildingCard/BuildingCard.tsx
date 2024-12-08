import type { Building } from "@/models/buildings"
import styles from "./BuildingCard.module.scss"
import { createElement } from "react"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { CapabilityList } from "../CapabilityList"

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
      {building.cost.isNone() ? null : (
        <ResourceSetDisplay className={styles.cost} resourceSet={building.cost} arrangement="row" background="night" />
      )}
    </div>
    <CapabilityList className={styles.capabilities} capabilities={building.capabilities} />
  </div>
)
