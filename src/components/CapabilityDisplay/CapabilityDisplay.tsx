import { Action, BuildingEnhancement, Limitation, Passive, type Capability } from "@/models/capabilities"
import styles from "./CapabilityDisplay.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { Content } from "../Content"
import ConvertIcon from "@/svg/convert.svg"
import PassiveIcon from "@/svg/capabilities/passive.svg"
import LimitationIcon from "@/svg/capabilities/limitation.svg"
import AtGameEndIcon from "@/svg/capabilities/at-game-end.svg"
import AtTurnEndIcon from "@/svg/capabilities/at-turn-end.svg"
import WhenConstructedIcon from "@/svg/capabilities/when-constructed.svg"
import { createElement, type JSXElementConstructor } from "react"

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
        {capability.capabilities.map((extraCapability) => (
          <CapabilityDisplay key={extraCapability.id} capability={extraCapability} />
        ))}
      </div>
    )
  }

  let typeIcon: JSXElementConstructor<any>
  if (capability instanceof Passive) {
    if (capability.trigger === "at-game-end") {
      typeIcon = AtGameEndIcon
    } else if (capability.trigger === "at-turn-end") {
      typeIcon = AtTurnEndIcon
    } else if (capability.trigger === "when-constructed") {
      typeIcon = WhenConstructedIcon
    } else {
      typeIcon = PassiveIcon
    }
  } else if (capability instanceof Action) {
    typeIcon = capability.stage.icon
  } else if (capability instanceof Limitation) {
    typeIcon = LimitationIcon
  } else {
    return null
  }
  return (
    <div {...getStandardAttributes(baseProps, styles.CapabilityDisplay)}>
      {createElement(typeIcon, { className: styles.capabilityTypeIcon })}
      <div className={styles.details}>
        {capability.title && <div className={styles.title}>{capability.title}</div>}
        <div className={styles.effect}>
          {capability instanceof Action ? (
            <>
              <ResourceSetDisplay className={styles.cost} resourceSet={capability.cost} arrangement="column" />
              <ConvertIcon className={styles.convertIcon} />
            </>
          ) : null}
          <Content className={styles.content}>{capability.effect}</Content>
        </div>
      </div>
    </div>
  )
}
