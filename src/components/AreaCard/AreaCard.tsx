import type { Area, TerrainChoice } from "@/models/areas"
import styles from "./AreaCard.module.scss"
import { createElement, type JSXElementConstructor } from "react"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { CapabilityList } from "../CapabilityList"
import type { TerrainType } from "@/models/terrain"
import { ItemIcon } from "../ItemIcon"
import { terrainHex } from "@/models/resources"

export interface AreaCardProps extends StandardComponentProps {
  area: Area
}

export const AreaCard = ({ area, ...baseProps }: AreaCardProps) => (
  <div {...getStandardAttributes(baseProps, styles.AreaCard)}>
    <div className={styles.titleBar}>
      <div className={styles.title}>{area.title}</div>
      {area.types.map((type) => (
        <div className={styles.type} key={type.id}>
          {type.title}
        </div>
      ))}
    </div>
    <div className={styles.terrainChoices}>
      <TerrainChoice choice={area.terrain.primary} />
      <TerrainChoice choice={area.terrain.secondary} />
      <TerrainChoice choice={area.terrain.tertiary} />
    </div>
    {area.feature ? (
      <div className={styles.feature}>
        {createElement(area.feature.icon, { className: styles.featureIcon })}
        <CapabilityList className={styles.featureCapabilities} capabilities={area.feature.capabilities} />
      </div>
    ) : null}
  </div>
)

const TerrainChoice = ({ choice }: { choice: TerrainType[] }) =>
  choice.length ? (
    <div className={styles.terrainChoice}>
      {choice.map((terrainType) => (
        <ItemIcon key={terrainType.id} className={styles.terrainIcon} item={terrainHex[`${terrainType.id}Hex`]} />
      ))}
    </div>
  ) : null
