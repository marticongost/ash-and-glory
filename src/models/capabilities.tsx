import { instantiate } from "@/modules/utils"
import { ResourceSet, ResourceSetProps } from "./resources"
import type { ReactNode } from "react"
import { stages, type Stage, type StageId } from "./stages"
import { buildings, type Building } from "./buildings"

export interface CapabilityProps {
  id: string
  title?: string
}

export abstract class Capability {
  readonly id: string
  readonly title: string

  constructor({ id, title = "" }: CapabilityProps) {
    this.id = id
    this.title = title
  }
}

export interface ActionProps extends CapabilityProps {
  stage?: StageId | Stage
  cost?: ResourceSet | ResourceSetProps
  limit?: number
  effect: ReactNode
}

export class Action extends Capability {
  readonly stage: Stage
  readonly cost?: ResourceSet
  readonly limit: number
  readonly effect: ReactNode

  constructor({ stage = "production", cost, limit = 1, effect, ...baseProps }: ActionProps) {
    super(baseProps)
    this.stage = typeof stage === "string" ? stages[stage] : stage
    this.cost = cost && instantiate(cost, ResourceSet)
    this.limit = limit ?? Infinity
    this.effect = effect
  }
}

export type CapabilityTrigger = "when-constructed" | "at-turn-end" | "at-game-end"

export interface PassiveProps extends CapabilityProps {
  trigger?: CapabilityTrigger
  effect: ReactNode
}

export class Passive extends Capability {
  readonly trigger?: CapabilityTrigger
  readonly effect: ReactNode

  constructor({ trigger, effect, ...baseProps }: PassiveProps) {
    super(baseProps)
    this.trigger = trigger
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

export interface BuildingEnhancementProps extends CapabilityProps {
  target: Building
  capabilities: Capability[]
}

export class BuildingEnhancement extends Capability {
  readonly target: Building
  readonly capabilities: Capability[]

  constructor({ target, capabilities, ...baseProps }: BuildingEnhancementProps) {
    super(baseProps)
    this.target = target
    this.capabilities = capabilities
  }
}
