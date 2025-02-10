import { instantiate } from "@/modules/utils"
import { ResourceSet, ResourceSetProps } from "./resources"
import type { ReactNode } from "react"
import { BuildingType, type Building } from "./buildings"
import { Moment, MomentId, moments } from "./moments"

export type ActionTiming = "action" | "reaction" | "instant"

export interface CapabilityProps {
  id: string
  title?: string
  moment?: MomentId | Moment
}

export abstract class Capability {
  readonly id: string
  readonly title: string
  readonly moment: Moment

  constructor({ id, title = "", moment = "constant" }: CapabilityProps) {
    this.id = id
    this.title = title
    this.moment = typeof moment === "string" ? moments[moment] : moment
  }
}

export interface ActionProps extends CapabilityProps {
  cost?: ResourceSet | ResourceSetProps
  timing?: ActionTiming
  effect: ReactNode
}

export class Action extends Capability {
  readonly cost?: ResourceSet
  readonly timing: ActionTiming
  readonly effect: ReactNode

  constructor({ moment = "actionPhase", cost, timing = "action", effect, ...baseProps }: ActionProps) {
    super({ moment, ...baseProps })
    this.cost = cost && instantiate(cost, ResourceSet)
    this.timing = timing
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
