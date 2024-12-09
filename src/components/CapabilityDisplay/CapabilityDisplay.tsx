import {
  Action,
  BuildingEnhancement,
  BuildingEnhancementTarget,
  BuildingWithMinCost,
  Limitation,
  Passive,
  type Capability,
} from "@/models/capabilities"
import styles from "./CapabilityDisplay.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { Content } from "../Content"
import ConvertIcon from "@/svg/convert.svg"
import { CapabilityList } from "../CapabilityList"
import { Building, BuildingType } from "@/models/buildings"

export interface CapabilityDisplayProps extends StandardComponentProps {
  capability: Capability
}

export const CapabilityDisplay = ({ capability, ...baseProps }: CapabilityDisplayProps) => {
  if (capability instanceof BuildingEnhancement) {
    return (
      <div {...getStandardAttributes(baseProps, styles.BuildingEnhancementCapabilityDisplay)}>
        <div className={styles.buildingEnhancementIntroduction}>
          Els edificis <BuildingEnhancementTargetDisplay target={capability.target} /> guanyen{" "}
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

interface BuildingEnhancementTargetDisplayProps {
  target: BuildingEnhancementTarget
}

const BuildingEnhancementTargetDisplay = ({ target }: BuildingEnhancementTargetDisplayProps) => (
  <span className={styles.BuildingEnhancementTarget}>
    {target instanceof Building ? target.title : null}
    {target instanceof BuildingType ? `de tipus ${target.title}` : null}
    {target instanceof BuildingWithMinCost ? `amb un cost de ${target.minCost}+ recursos` : null}
  </span>
)
