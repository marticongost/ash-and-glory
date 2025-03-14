import type { Building } from "@/models/buildings"
import styles from "./BuildingsSheet.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { CapabilityList } from "../CapabilityList"
import { createElement } from "react"

export interface BuildingsSheetProps extends StandardComponentProps {
  buildings: Building[]
}

export const BuildingsSheet = ({ buildings, ...baseProps }: BuildingsSheetProps) => (
  <table {...getStandardAttributes(baseProps, styles.BuildingsSheet)}>
    <tbody>
      {buildings.map((building) => (
        <BuildingsSheetEntry key={building.id} building={building} />
      ))}
    </tbody>
  </table>
)

export const BuildingsSheetEntry = ({ building, ...baseProps }: { building: Building } & StandardComponentProps) => (
  <tr {...getStandardAttributes(baseProps, styles.BuildingsSheetEntry)}>
    <td className={styles.buildingIconCell}>{createElement(building.icon, { className: styles.buildingIcon })}</td>
    <td className={styles.buildingDescriptionCell}>
      <div className={styles.buildingTitle}>{building.title}</div>
      <div className={styles.buildingTypes}>
        {building.types.map((type) => (
          <div key={type.id} className={styles.buildingType}>
            {type.title}
          </div>
        ))}
      </div>
    </td>
    <td className={styles.buildingCost}>
      <ResourceSetDisplay className={styles.buildingCost} resourceSet={building.cost} arrangement="row" />
    </td>
    <td className={styles.buildingCapabilitiesCell}>
      <CapabilityList className={styles.buildingCapabilities} capabilities={building.capabilities} />
    </td>
  </tr>
)
