import { Action, BuildingEnhancement, Limitation, Passive, type Capability } from "@/models/capabilities"
import styles from "./CapabilityDisplay.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { Content } from "../Content"
import ConvertIcon from "@/svg/convert.svg"
import { CapabilityList } from "../CapabilityList"

export interface CapabilityDisplayProps extends StandardComponentProps {
  capability: Capability
}

export const CapabilityDisplay = ({ capability, ...baseProps }: CapabilityDisplayProps) => {
  if (capability instanceof BuildingEnhancement) {
    // TODO: Add a BuildingDisplay that shows the building icon as well as the name
    return (
      <div {...getStandardAttributes(baseProps, styles.BuildingEnhancementCapabilityDisplay)}>
        <div className={styles.buildingEnhancementIntroduction}>
          Els edificis <em>{capability.target.title}</em> guanyen{" "}
          {capability.capabilities.length > 1 ? "les següents capacitats" : "la capacitat següent"}:
        </div>
        <CapabilityList className={styles.buildingEnhancementCapabilities} capabilities={capability.capabilities} />
      </div>
    )
  }

  if (!(capability instanceof Action || capability instanceof Limitation || capability instanceof Passive)) {
    return null
  }

  return (
    <div {...getStandardAttributes(baseProps, styles.CapabilityDisplay)} data-type={capability.constructor.name}>
      {capability instanceof Action ? (
        <>
          <ResourceSetDisplay className={styles.cost} resourceSet={capability.cost} arrangement="column" />
          <ConvertIcon className={styles.convertIcon} />
        </>
      ) : null}
      <Content className={styles.content}>{capability.effect}</Content>
    </div>
  )
}
