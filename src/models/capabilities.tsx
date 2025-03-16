import { instantiate } from "@/modules/utils"
import { ResourceSet, ResourceSetProps } from "./resources"
import type { JSXElementConstructor, ReactNode } from "react"
import { BuildingType, type Building } from "./buildings"
import { Moment, MomentId, moments } from "./moments"
import ActionIcon from "@/svg/action-timing/action.svg"
import ReactionIcon from "@/svg/action-timing/reaction.svg"
import InstantActionIcon from "@/svg/action-timing/instant.svg"

export type ActionTimingId = "action" | "reaction" | "instant"

export interface ActionTimingProps {
  id: ActionTimingId
  title: string
  icon: JSXElementConstructor<any>
}

export class ActionTiming {
  readonly id: ActionTimingId
  readonly title: string
  readonly icon: JSXElementConstructor<any>

  constructor({ id, title, icon }: ActionTimingProps) {
    this.id = id
    this.title = title
    this.icon = icon
  }
}

export const actionTimings: Record<ActionTimingId, ActionTiming> = {
  action: new ActionTiming({ id: "action", title: "Acció principal", icon: ActionIcon }),
  reaction: new ActionTiming({ id: "reaction", title: "Reacció", icon: ReactionIcon }),
  instant: new ActionTiming({ id: "instant", title: "Acció instantània", icon: InstantActionIcon }),
}

export interface RulebookLink {
  hash: string
  title: string
}

export interface CapabilityProps {
  id: string
  title?: string
  moment?: MomentId | Moment
  rulebookLink?: RulebookLink
}

export abstract class Capability {
  readonly id: string
  readonly title: string
  readonly moment: Moment
  readonly rulebookLink?: RulebookLink

  constructor({ id, title = "", moment = "constant", rulebookLink }: CapabilityProps) {
    this.id = id
    this.title = title
    this.moment = typeof moment === "string" ? moments[moment] : moment
    this.rulebookLink = rulebookLink
  }
}

export interface ActionProps extends CapabilityProps {
  cost?: ResourceSet | ResourceSetProps
  timing?: ActionTimingId | ActionTiming
  effect: ReactNode
}

export class Action extends Capability {
  readonly cost?: ResourceSet
  readonly timing: ActionTiming
  readonly effect: ReactNode

  constructor({ moment = "actionPhase", cost, timing = "action", effect, ...baseProps }: ActionProps) {
    super({ moment, ...baseProps })
    this.cost = cost && instantiate(cost, ResourceSet)
    this.timing = typeof timing === "string" ? actionTimings[timing] : timing
    this.effect = effect
  }
}

export interface PassiveProps extends CapabilityProps {
  effect: ReactNode
}

export class Passive extends Capability {
  readonly effect: ReactNode

  constructor({ effect, ...baseProps }: PassiveProps) {
    super(baseProps)
    this.effect = effect
  }
}

export interface LimitationProps extends CapabilityProps {
  effect: ReactNode
}

export class Limitation extends Capability {
  readonly effect: ReactNode

  constructor({ effect, ...baseProps }: LimitationProps) {
    super(baseProps)
    this.effect = effect
  }
}

export const unique = new Limitation({
  id: "unique",
  effect: <>Màxim d'una còpia per ciutat</>,
})

export type BuildingEnhancementTarget = Building | BuildingType | BuildingWithMinCost

export interface BuildingWithMinCostProps {
  minCost: number
}

export class BuildingWithMinCost {
  minCost: number

  constructor({ minCost }: BuildingWithMinCostProps) {
    this.minCost = minCost
  }
}

export type Adjacency = "sameHex" | "inContact"

export interface BuildingEnhancementProps extends CapabilityProps {
  target: BuildingEnhancementTarget
  targetAdjacency?: Adjacency
  capabilities: Capability[]
}

export class BuildingEnhancement extends Capability {
  readonly target: BuildingEnhancementTarget
  readonly targetAdjacency?: Adjacency
  readonly capabilities: Capability[]

  constructor({ target, targetAdjacency, capabilities, ...baseProps }: BuildingEnhancementProps) {
    super(baseProps)
    this.target = target
    this.targetAdjacency = targetAdjacency
    this.capabilities = capabilities
  }
}
