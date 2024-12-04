import { instantiate } from "@/modules/utils"
import { ResourceSet, ResourceSetProps } from "./resources"
import type { ReactNode } from "react"

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
  cost?: ResourceSet | ResourceSetProps
  limit?: number
}

export class Action extends Capability {
  readonly cost: ResourceSet
  readonly limit: number

  constructor({ cost, limit = 1, ...baseProps }: ActionProps) {
    super(baseProps)
    this.cost = instantiate(cost ?? {}, ResourceSet)
    this.limit = limit ?? Infinity
  }
}

export type CapabilityTrigger = "when-constructed" | "at-game-end"

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
