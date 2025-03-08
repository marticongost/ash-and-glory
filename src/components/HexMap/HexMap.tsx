import type { Territory } from "@/modules/map"
import { HexGrid, type HexDecoration, type HexGridProps } from "../HexGrid/HexGrid"
import styles from "./HexMap.module.scss"
import { createElement } from "react"
import { mergeClassName } from "@/modules/react-utils"

export interface HexMapProps extends Omit<HexGridProps<Territory>, "hexDecorator"> {}

export const HexMap = ({ className, ...baseProps }: HexMapProps) => (
  <HexGrid className={mergeClassName(styles.HexMap, className)} {...baseProps} hexDecorator={decorateTerritoryHex} />
)

const decorateTerritoryHex = (territory: Territory): HexDecoration => {
  return {
    className: styles.territory,
    data: { type: territory.type.id },
    contourProps: { className: styles.territoryContour },
    children: (
      <>
        {createElement(territory.type.icon, { className: styles.terrainIcon })}
        <div className={styles.buildings}>
          {territory.buildings.map((building) => createElement(building.icon, { className: styles.buildingIcon }))}
        </div>
      </>
    ),
  }
}
