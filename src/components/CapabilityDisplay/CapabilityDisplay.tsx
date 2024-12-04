import { Action, Passive, type Capability } from "@/models/capabilities"
import styles from "./CapabilityDisplay.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { Content } from "../Content"
import ActionIcon from "@/svg/capabilities/action.svg"
import PassiveIcon from "@/svg/capabilities/passive.svg"
import { createElement, type JSXElementConstructor } from "react"

export interface CapabilityDisplayProps extends StandardComponentProps {
  capability: Capability
}

export const CapabilityDisplay = ({ capability, ...baseProps }: CapabilityDisplayProps) => {
  let typeIcon: JSXElementConstructor<any>
  if (capability instanceof Passive) {
    typeIcon = PassiveIcon
  } else if (capability instanceof Action) {
    typeIcon = ActionIcon
  } else {
    return null
  }
  return (
    <div {...getStandardAttributes(baseProps, styles.CapabilityDisplay)}>
      {createElement(typeIcon, { className: styles.capabilityTypeIcon })}
      <div className={styles.details}>
        {capability.title && (
          <div className={styles.titlebar}>
            <div className={styles.title}>{capability.title}</div>
            {capability instanceof Action ? (
              <ResourceSetDisplay className={styles.cost} resourceSet={capability.cost} />
            ) : null}
          </div>
        )}
        <Content className={styles.effect}>{capability.effect}</Content>
      </div>
    </div>
  )
}
