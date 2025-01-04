import type { ReactNode } from "react"
import { ResourceSet, ResourceSetProps } from "./resources"
import { instantiate, instantiateAll } from "@/modules/utils"

export type Era = 1 | 2 | 3

export const eraLabels: Record<Era, String> = {
  1: "I",
  2: "II",
  3: "III",
}

export interface FateProps {
  era: Era
  id: string
  title: string
  copies?: number
}

export class Fate {
  readonly era: Era
  readonly id: string
  readonly title: string
  readonly copies: number

  constructor({ id, title, era, copies = 1 }: FateProps) {
    this.era = era
    this.id = id
    this.title = title
    this.copies = copies
  }
}

export interface EventProps extends FateProps {
  effect: ReactNode
}

export class Event extends Fate {
  readonly effect: ReactNode

  constructor({ effect, ...baseProps }: EventProps) {
    super(baseProps)
    this.effect = effect
  }
}

export interface BoonProps extends FateProps {
  resources: ResourceSet | ResourceSetProps | ResourceSet[] | ResourceSetProps[]
}

export class Boon extends Fate {
  readonly resourceSets: ResourceSet[]

  constructor({ resources, ...baseProps }: BoonProps) {
    super(baseProps)
    this.resourceSets =
      resources instanceof Array ? instantiateAll(resources, ResourceSet) : [instantiate(resources, ResourceSet)]
  }
}

export const events: Record<string, Event> = {}

export const boons: Record<string, Boon> = {
  // Era 1
  heroism: new Boon({ era: 1, id: "heroism", title: "Heroïsme", resources: { glory: 2 } }),
  development: new Boon({ era: 1, id: "growth", title: "Desenvolupament", resources: { growth: 1 } }),
  toil: new Boon({ era: 1, id: "toil", title: "Afany", resources: { effort: 1 } }),
  invention: new Boon({ era: 1, id: "invention", title: "Inventiva", resources: { curiosity: 1 } }),
  strength: new Boon({ era: 1, id: "strength", title: "Força", resources: { strife: 1 } }),
  persistence: new Boon({
    era: 1,
    id: "persistence",
    title: "Persistència",
    resources: [{ growth: 1 }, { effort: 1 }],
  }),
  planning: new Boon({ era: 1, id: "planning", title: "Planificació", resources: [{ growth: 1 }, { curiosity: 1 }] }),
  will: new Boon({ era: 1, id: "voluntat", title: "Voluntat", resources: [{ growth: 1 }, { strife: 1 }] }),
  ingenuity: new Boon({ era: 1, id: "ingenuity", title: "Enginy", resources: [{ effort: 1 }, { curiosity: 1 }] }),
  stubbornness: new Boon({
    era: 1,
    id: "stubbornness",
    title: "Tossuderia",
    resources: [{ effort: 1 }, { strife: 1 }],
  }),
  ambition: new Boon({ era: 1, id: "ambition", title: "Ambició", resources: [{ curiosity: 1 }, { strife: 1 }] }),
  spirit: new Boon({ era: 1, id: "spirit", title: "Superació", resources: { resolve: 1 } }),

  // Era 2
  sacrifice: new Boon({ era: 2, id: "sacrifice", title: "Sacrifici", resources: { glory: 1 } }),
  fertility: new Boon({ era: 2, id: "fertility", title: "Fertilitat", resources: { growth: 2 } }),
  dedication: new Boon({ era: 2, id: "dedication", title: "Dedicació", resources: { effort: 2 } }),
  genius: new Boon({ era: 2, id: "genius", title: "Genialitat", resources: { curiosity: 2 } }),
  aggression: new Boon({ era: 2, id: "agression", title: "Agressió", resources: { strife: 2 } }),
  progress: new Boon({ era: 2, id: "progress", title: "Progrés", resources: { growth: 1, effort: 1 } }),
  expansion: new Boon({ era: 2, id: "expansion", title: "Expansió", resources: { growth: 1, curiosity: 1 } }),
  supremacy: new Boon({ era: 2, id: "supremacy", title: "Supremacia", resources: { growth: 1, strife: 1 } }),
  experimentation: new Boon({
    era: 2,
    id: "experimentation",
    title: "Experimentació",
    resources: { effort: 1, curiosity: 1 },
  }),
  momentum: new Boon({
    era: 2,
    id: "momentum",
    title: "Empenta",
    resources: { effort: 1, strife: 1 },
  }),
  conquest: new Boon({ era: 2, id: "conquest", title: "Conquesta", resources: { curiosity: 1, strife: 1 } }),
  prosperity: new Boon({ era: 2, id: "prosperity", title: "Prosperitat", resources: { growth: 1, resolve: 1 } }),
  focus: new Boon({ era: 2, id: "focus", title: "Focus", resources: { effort: 1, resolve: 1 } }),
  research: new Boon({ era: 2, id: "research", title: "Recerca", resources: { curiosity: 1, resolve: 1 } }),
  might: new Boon({ era: 2, id: "might", title: "Poder", resources: { strife: 1, resolve: 1 } }),

  // Era 3
  multiplication: new Boon({ era: 3, id: "multiplication", title: "Multiplicació", resources: { growth: 3 } }),
  efficiency: new Boon({ era: 3, id: "efficiency", title: "Eficiència", resources: { effort: 3 } }),
  discovery: new Boon({ era: 3, id: "discovery", title: "Descobriment", resources: { curiosity: 3 } }),
  militarism: new Boon({ era: 3, id: "militarism", title: "Militarisme", resources: { strife: 3 } }),
  alertness: new Boon({ era: 3, id: "alertness", title: "Alerta", resources: { effort: 1, curiosity: 1, strife: 1 } }),
  colonisation: new Boon({
    era: 3,
    id: "colonisation",
    title: "Colonització",
    resources: { growth: 1, curiosity: 1, strife: 1 },
  }),
  domination: new Boon({
    era: 3,
    id: "domination",
    title: "Dominació",
    resources: { growth: 1, effort: 1, strife: 1 },
  }),
  welfare: new Boon({ era: 3, id: "welfare", title: "Bonança", resources: { growth: 1, effort: 1, curiosity: 1 } }),
  adaptability: new Boon({ era: 3, id: "adaptability", title: "Adaptabilitat", resources: { resolve: 2 } }),
  abundance: new Boon({ era: 3, id: "abundance", title: "Abundància", resources: { growth: 2, resolve: 1 } }),
  industry: new Boon({ era: 3, id: "industry", title: "Focus", resources: { effort: 2, resolve: 1 } }),
  enlightenment: new Boon({ era: 3, id: "enlightenment", title: "Recerca", resources: { curiosity: 2, resolve: 1 } }),
  hegemony: new Boon({ era: 3, id: "hegemony", title: "Hegemonia", resources: { strife: 2, resolve: 1 } }),
}

export const fates: Record<string, Fate> = { ...events, ...boons }
