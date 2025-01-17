import type { Area } from "@/models/areas"
import styles from "./AreaCard.module.scss"
import { createElement, type JSXElementConstructor } from "react"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { CapabilityList } from "../CapabilityList"
import { terrainTypes, type TerrainTypeId } from "@/models/terrain"
import AreaSizeIcon from "@/svg/area-size.svg"
import BuildingSlotsIcon from "@/svg/building-slots.svg"

export interface AreaCardProps extends StandardComponentProps {
  area: Area
}

export const AreaCard = ({ area, ...baseProps }: AreaCardProps) => (
  <div {...getStandardAttributes(baseProps, styles.AreaCard)}>
    <div className={styles.properties}>
      <Property icon={AreaSizeIcon} name="size" value={area.size} />
      <Property icon={BuildingSlotsIcon} name="building-slots" value={area.buildingSlots} />
      {Object.entries(area.terrain).map(([terrainTypeId, terrainSize]) => (
        <Property
          key={terrainTypeId}
          icon={terrainTypes[terrainTypeId as TerrainTypeId].icon}
          name={terrainTypeId}
          value={terrainSize}
        />
      ))}
    </div>
    {area.feature ? (
      <div className={styles.feature}>
        <div className={styles.featureTitleBar}>
          {createElement(area.feature.icon, { className: styles.featureIcon })}
          <div className={styles.featureTaxonomy}>
            <div className={styles.featureTitle}>{area.feature.title}</div>
            <div className={styles.featureTypes}>
              {area.feature.types.map((type) => (
                <div className={styles.featureType} key={type.id}>
                  {type.title}
                </div>
              ))}
            </div>
          </div>
        </div>
        <CapabilityList className={styles.featureCapabilities} capabilities={area.feature.capabilities} />
      </div>
    ) : null}
  </div>
)

const Property = ({ icon, name, value }: { icon: JSXElementConstructor<any>; name: string; value: any }) => (
  <div className={styles.property} data-property={name}>
    {createElement(icon, { className: styles.propertyIcon })}
    <div className={styles.propertyValue}>{value.toString()}</div>
  </div>
)
