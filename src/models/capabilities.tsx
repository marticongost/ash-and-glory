import { instantiate } from "@/modules/utils"
import { ResourceSet, ResourceSetProps } from "./resources"
import type { ReactNode } from "react"
import { stages, type Stage, type StageId } from "./stages"

export interface CapabilityProps {
  id: string
  title?: string
  effect: ReactNode
}

export abstract class Capability {
  readonly id: string
  readonly title: string
  readonly effect: ReactNode

  constructor({ id, title = "", effect }: CapabilityProps) {
    this.id = id
    this.title = title
    this.effect = effect
  }
}

export interface ActionProps extends CapabilityProps {
  stage?: StageId | Stage
  cost?: ResourceSet | ResourceSetProps
  limit?: number
}

export class Action extends Capability {
  readonly stage: Stage
  readonly cost?: ResourceSet
  readonly limit: number

  constructor({ stage = "production", cost, limit = 1, ...baseProps }: ActionProps) {
    super(baseProps)
    this.stage = typeof stage === "string" ? stages[stage] : stage
    this.cost = cost && instantiate(cost, ResourceSet)
    this.limit = limit ?? Infinity
  }
}

export type CapabilityTrigger = "when-constructed" | "at-turn-end" | "at-game-end"

export interface PassiveProps extends CapabilityProps {
  trigger?: CapabilityTrigger
}

export class Passive extends Capability {
  readonly trigger?: CapabilityTrigger

  constructor({ trigger, ...baseProps }: PassiveProps) {
    super(baseProps)
    this.trigger = trigger
  }
}

export class Limitation extends Capability {}

export const unique = new Limitation({
  id: "unique",
  effect: <>Màxim d'una còpia per ciutat</>,
})
