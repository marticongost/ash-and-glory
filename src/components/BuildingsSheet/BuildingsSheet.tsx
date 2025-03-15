import type { Building } from "@/models/buildings"
import styles from "./BuildingsSheet.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { CapabilityList } from "../CapabilityList"
import { createElement } from "react"

export interface BuildingsSheetProps extends StandardComponentProps {
  buildingGroups: BuildingsGroup[]
}

export interface BuildingsGroup {
  title: string
  buildings: Building[]
}

export const BuildingsSheet = ({ buildingGroups, ...baseProps }: BuildingsSheetProps) => (
  <div {...getStandardAttributes(baseProps, styles.BuildingsSheet)}>
    {buildingGroups.map((group) => (
      <BuildingsGroup key={group.title} group={group} />
    ))}
  </div>
)

export const BuildingsGroup = ({ group, ...baseProps }: { group: BuildingsGroup } & StandardComponentProps) => (
  <div {...getStandardAttributes(baseProps, styles.BuildingsGroup)}>
    <div className={styles.groupTitle}>{group.title}</div>
    <div className={styles.groupBuildings}>
      {group.buildings.map((building) => (
        <BuildingsSheetEntry key={building.id} building={building} />
      ))}
    </div>
  </div>
)

export const BuildingsSheetEntry = ({ building, ...baseProps }: { building: Building } & StandardComponentProps) => (
  <div {...getStandardAttributes(baseProps, styles.BuildingsSheetEntry)}>
    <div className={styles.buildingHeader}>
      {createElement(building.icon, { className: styles.buildingIcon })}
      <div className={styles.buildingDescription}>
        <div className={styles.buildingTitle}>{building.title}</div>
        <div className={styles.buildingTypes}>
          {building.types.map((type) => (
            <div key={type.id} className={styles.buildingType}>
              {type.title}
            </div>
          ))}
        </div>
      </div>
    </div>
    <ResourceSetDisplay
      className={styles.buildingCost}
      resourceSet={building.cost}
      arrangement="row"
      background="night"
    />
    <CapabilityList className={styles.buildingCapabilities} capabilities={building.capabilities} />
  </div>
)
