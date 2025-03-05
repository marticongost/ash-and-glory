import { ResourceSet, ResourceSetProps } from "./resources"
import { instantiate, instantiateAll } from "@/modules/utils"

export type FocusLevel = 1 | 2 | 3

export const focusLevelLabels: Record<FocusLevel, String> = {
  1: "I",
  2: "II",
  3: "III",
}

export interface FocusProps {
  level: FocusLevel
  id: string
  title: string
  copies?: number
  resources: ResourceSet | ResourceSetProps | ResourceSet[] | ResourceSetProps[]
}

const initialHandSize = 5

export const focusCardsDraft = {
  initialHandSize,
  finalHandSize: 4,
  firstChapterWithStableComposition: initialHandSize * 2 + 1,
}

export const getFocusCardLevelsForChapter = (chapter: number): Record<FocusLevel, number> => {
  const levels: Record<FocusLevel, number> = { 1: focusCardsDraft.initialHandSize, 2: 0, 3: 0 }
  let lowestLevel: FocusLevel = 1

  for (let i = 1; i < chapter; i++) {
    levels[lowestLevel]--
    levels[(lowestLevel + 1) as FocusLevel]++
    if (levels[lowestLevel] === 0) {
      if (lowestLevel === 2) {
        break
      }
      lowestLevel = (lowestLevel + 1) as FocusLevel
    }
  }

  return levels
}

export class Focus {
  readonly era: FocusLevel
  readonly id: string
  readonly title: string
  readonly copies: number
  readonly resourceSets: ResourceSet[]

  constructor({ id, title, level, resources, copies = 1 }: FocusProps) {
    this.era = level
    this.id = id
    this.title = title
    this.copies = copies
    this.resourceSets =
      resources instanceof Array ? instantiateAll(resources, ResourceSet) : [instantiate(resources, ResourceSet)]
  }
}

export const focuses: Record<string, Focus> = {
  // Era 1
  heroism: new Focus({ level: 1, id: "heroism", title: "Heroïsme", resources: { glory: 2 } }),
  development: new Focus({ level: 1, id: "growth", title: "Desenvolupament", resources: { growth: 1 } }),
  toil: new Focus({ level: 1, id: "toil", title: "Afany", resources: { effort: 1 } }),
  invention: new Focus({ level: 1, id: "invention", title: "Inventiva", resources: { curiosity: 1 } }),
  strength: new Focus({ level: 1, id: "strength", title: "Força", resources: { strife: 1 } }),
  persistence: new Focus({
    level: 1,
    id: "persistence",
    title: "Persistència",
    resources: [{ growth: 1 }, { effort: 1 }],
  }),
  planning: new Focus({
    level: 1,
    id: "planning",
    title: "Planificació",
    resources: [{ growth: 1 }, { curiosity: 1 }],
  }),
  will: new Focus({ level: 1, id: "voluntat", title: "Voluntat", resources: [{ growth: 1 }, { strife: 1 }] }),
  ingenuity: new Focus({ level: 1, id: "ingenuity", title: "Enginy", resources: [{ effort: 1 }, { curiosity: 1 }] }),
  stubbornness: new Focus({
    level: 1,
    id: "stubbornness",
    title: "Tossuderia",
    resources: [{ effort: 1 }, { strife: 1 }],
  }),
  ambition: new Focus({ level: 1, id: "ambition", title: "Ambició", resources: [{ curiosity: 1 }, { strife: 1 }] }),
  spirit: new Focus({ level: 1, id: "spirit", title: "Superació", resources: { resolve: 1 } }),

  // Era 2
  sacrifice: new Focus({ level: 2, id: "sacrifice", title: "Sacrifici", resources: { glory: 1 } }),
  fertility: new Focus({ level: 2, id: "fertility", title: "Fertilitat", resources: { growth: 2 } }),
  dedication: new Focus({ level: 2, id: "dedication", title: "Dedicació", resources: { effort: 2 } }),
  genius: new Focus({ level: 2, id: "genius", title: "Genialitat", resources: { curiosity: 2 } }),
  aggression: new Focus({ level: 2, id: "agression", title: "Agressió", resources: { strife: 2 } }),
  progress: new Focus({ level: 2, id: "progress", title: "Progrés", resources: { growth: 1, effort: 1 } }),
  expansion: new Focus({ level: 2, id: "expansion", title: "Expansió", resources: { growth: 1, curiosity: 1 } }),
  supremacy: new Focus({ level: 2, id: "supremacy", title: "Supremacia", resources: { growth: 1, strife: 1 } }),
  experimentation: new Focus({
    level: 2,
    id: "experimentation",
    title: "Experimentació",
    resources: { effort: 1, curiosity: 1 },
  }),
  momentum: new Focus({
    level: 2,
    id: "momentum",
    title: "Empenta",
    resources: { effort: 1, strife: 1 },
  }),
  conquest: new Focus({ level: 2, id: "conquest", title: "Conquesta", resources: { curiosity: 1, strife: 1 } }),
  prosperity: new Focus({ level: 2, id: "prosperity", title: "Prosperitat", resources: { growth: 1, resolve: 1 } }),
  focus: new Focus({ level: 2, id: "focus", title: "Focus", resources: { effort: 1, resolve: 1 } }),
  research: new Focus({ level: 2, id: "research", title: "Recerca", resources: { curiosity: 1, resolve: 1 } }),
  might: new Focus({ level: 2, id: "might", title: "Poder", resources: { strife: 1, resolve: 1 } }),

  // Era 3
  multiplication: new Focus({ level: 3, id: "multiplication", title: "Multiplicació", resources: { growth: 3 } }),
  efficiency: new Focus({ level: 3, id: "efficiency", title: "Eficiència", resources: { effort: 3 } }),
  discovery: new Focus({ level: 3, id: "discovery", title: "Descobriment", resources: { curiosity: 3 } }),
  militarism: new Focus({ level: 3, id: "militarism", title: "Militarisme", resources: { strife: 3 } }),
  alertness: new Focus({
    level: 3,
    id: "alertness",
    title: "Alerta",
    resources: { effort: 1, curiosity: 1, strife: 1 },
  }),
  colonisation: new Focus({
    level: 3,
    id: "colonisation",
    title: "Colonització",
    resources: { growth: 1, curiosity: 1, strife: 1 },
  }),
  domination: new Focus({
    level: 3,
    id: "domination",
    title: "Dominació",
    resources: { growth: 1, effort: 1, strife: 1 },
  }),
  welfare: new Focus({ level: 3, id: "welfare", title: "Bonança", resources: { growth: 1, effort: 1, curiosity: 1 } }),
  adaptability: new Focus({ level: 3, id: "adaptability", title: "Adaptabilitat", resources: { resolve: 2 } }),
  abundance: new Focus({ level: 3, id: "abundance", title: "Abundància", resources: { growth: 2, resolve: 1 } }),
  industry: new Focus({ level: 3, id: "industry", title: "Focus", resources: { effort: 2, resolve: 1 } }),
  enlightenment: new Focus({
    level: 3,
    id: "enlightenment",
    title: "Recerca",
    resources: { curiosity: 2, resolve: 1 },
  }),
  hegemony: new Focus({ level: 3, id: "hegemony", title: "Hegemonia", resources: { strife: 2, resolve: 1 } }),
}
