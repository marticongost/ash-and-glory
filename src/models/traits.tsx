import { groupBy, instantiateAll } from "@/modules/utils"
import type { JSXElementConstructor } from "react"
import WarriorsIcon from "@/svg/archetypes/warriors.svg"
import TradersIcon from "@/svg/archetypes/traders.svg"
import { Action, Capability, CapabilityProps, Passive } from "./capabilities"
import { Resolve } from "@/components/ResourceIcon"

export type ArchetypeId = "warriors" | "traders"

export interface ArchetypeProps {
  id: ArchetypeId
  title: string
  icon: JSXElementConstructor<any>
  traits: Omit<TraitProps, "archetype">[]
}

export class Archetype {
  readonly id: ArchetypeId
  readonly title: string
  readonly icon: JSXElementConstructor<any>
  readonly traits: Trait[]

  constructor({ id, title, icon, traits }: ArchetypeProps) {
    this.id = id
    this.title = title
    this.icon = icon
    this.traits = traits.map((traitProps) => new Trait({ ...traitProps, archetype: this }))
  }
}

export type TraitLevel = 1 | 2 | 3

export const levelLabels: Record<TraitLevel, string> = {
  1: "I",
  2: "II",
  3: "III",
}

export interface TraitProps {
  archetype: Archetype
  level: TraitLevel
  id: string
  title: string
  capabilities: Array<Capability>
}

export class Trait {
  readonly archetype: Archetype
  readonly level: TraitLevel
  readonly id: string
  readonly title: string
  readonly capabilities: Capability[]

  constructor({ archetype, level, id, title, capabilities }: TraitProps) {
    this.archetype = archetype
    this.level = level
    this.id = id
    this.title = title
    this.capabilities = capabilities
  }
}

export const archetypes: Record<ArchetypeId, Archetype> = {
  warriors: new Archetype({
    id: "warriors",
    title: "Guerrers",
    icon: WarriorsIcon,
    traits: [
      {
        level: 1,
        id: "training",
        title: "Entrenament",
        capabilities: [
          new Passive({ id: "repeat-attack-die", effect: <>Permet repetir un dau d'atac en resoldre un combat</> }),
        ],
      },
    ],
  }),
  traders: new Archetype({
    id: "traders",
    title: "Comerciants",
    icon: TradersIcon,
    traits: [
      {
        level: 1,
        id: "creative-economy",
        title: "Economia creativa",
        capabilities: [
          new Action({
            id: "creative-economy",
            title: "Arreglar els comptes",
            cost: { anyDrive: 1, gold: 1 },
            effect: (
              <>
                Guanyar <Resolve />
              </>
            ),
          }),
        ],
      },
    ],
  }),
}
