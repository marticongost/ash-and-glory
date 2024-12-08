import { instantiate } from "@/modules/utils"
import { ResourceSet, ResourceSetProps } from "./resources"
import type { ReactNode } from "react"
import { type Building } from "./buildings"
import { Moment, MomentId, moments } from "./moments"

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
  limit?: number
  effect: ReactNode
}

export class Action extends Capability {
  readonly cost?: ResourceSet
  readonly limit: number
  readonly effect: ReactNode

  constructor({ moment = "productionStage", cost, limit = 1, effect, ...baseProps }: ActionProps) {
    super({ moment, ...baseProps })
    this.cost = cost && instantiate(cost, ResourceSet)
    this.limit = limit ?? Infinity
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
