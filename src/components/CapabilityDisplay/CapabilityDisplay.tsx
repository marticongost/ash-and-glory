import {
  Action,
  BuildingEnhancement,
  BuildingEnhancementTarget,
  BuildingWithMinCost,
  Limitation,
  Passive,
  type ActionTiming,
  type Adjacency,
  type Capability,
} from "@/models/capabilities"
import styles from "./CapabilityDisplay.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { ResourceSetDisplay } from "../ResourceSetDisplay"
import { Content } from "../Content"
import ActionIcon from "@/svg/action-timing/action.svg"
import ReactionIcon from "@/svg/action-timing/reaction.svg"
import InstantActionIcon from "@/svg/action-timing/instant.svg"
import ConvertIcon from "@/svg/convert.svg"
import { CapabilityList } from "../CapabilityList"
import { Building, BuildingType } from "@/models/buildings"
import { Reference } from "../Reference"
import { createElement, type JSXElementConstructor } from "react"

const actionTimingIcons: Record<ActionTiming, JSXElementConstructor<any>> = {
  action: ActionIcon,
  reaction: ReactionIcon,
  instant: InstantActionIcon,
}

export interface CapabilityDisplayProps extends StandardComponentProps {
  capability: Capability
}

export const CapabilityDisplay = ({ capability, ...baseProps }: CapabilityDisplayProps) => {
  if (capability instanceof BuildingEnhancement) {
    return (
      <div {...getStandardAttributes(baseProps, styles.BuildingEnhancementCapabilityDisplay)}>
        <div className={styles.buildingEnhancementIntroduction}>
          Els edificis{" "}
          <BuildingEnhancementTargetDisplay target={capability.target} targetAdjacency={capability.targetAdjacency} />{" "}
          guanyen {capability.capabilities.length > 1 ? "les següents capacitats" : "la capacitat següent"}:
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
      {(capability instanceof Action || capability instanceof Passive) && !capability.moment.implicit ? (
        <span className={styles.moment}>{capability.moment.title}</span>
      ) : null}
      {capability instanceof Action ? (
        <span className={styles.actionPreface}>
          {createElement(actionTimingIcons[capability.timing], { className: styles.actionIcon })}
          {capability.cost?.isNone() ? null : (
            <>
              <ResourceSetDisplay className={styles.cost} resourceSet={capability.cost} arrangement="inline" />
              <ConvertIcon className={styles.convertIcon} />
            </>
          )}
        </span>
      ) : null}
      <Content className={styles.content}>{capability.effect}</Content>
    </div>
  )
}

interface BuildingEnhancementTargetDisplayProps {
  target: BuildingEnhancementTarget
  targetAdjacency?: Adjacency
}

const BuildingEnhancementTargetDisplay = ({ target, targetAdjacency }: BuildingEnhancementTargetDisplayProps) => (
  <span className={styles.BuildingEnhancementTarget}>
    {target instanceof Building ? <Reference item={target} /> : null}
    {target instanceof BuildingType ? `de tipus ${target.title}` : null}
    {target instanceof BuildingWithMinCost ? `amb un cost de ${target.minCost}+ recursos` : null}
    {targetAdjacency === "sameHex" ? " a la casella" : null}
    {targetAdjacency === "inContact" ? " en contacte" : null}
  </span>
)
