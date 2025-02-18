export type MomentId =
  | "constant"
  | "whenChoosingFocus"
  | "actionPhase"
  | "afterEventRevealed"
  | "afterEventResolved"
  | "beforeCombat"
  | "combat"
  | "afterBattle"
  | "afterWinningBattle"
  | "afterLoosingBattle"
  | "recruitingSoldiers"
  | "whenAcquiringTraits"
  | "afterCityConquered"
  | "afterDestroyingBarbarianCamp"
  | "afterActionExecuted"
  | "whenBuilding"
  | "whenBuilt"
  | "whenSupportingPopulation"
  | "whenVisited"
  | "chapterStart"
  | "chapterEnd"
  | "gameStart"
  | "gameEnd"

export interface MomentProps {
  id: MomentId
  title: string
  implicit?: boolean
}

export class Moment {
  readonly id: MomentId
  readonly title: string
  readonly implicit: boolean

  constructor({ id, title, implicit = false }: MomentProps) {
    this.id = id
    this.title = title
    this.implicit = implicit
  }
}

export const moments: Record<MomentId, Moment> = {
  constant: new Moment({ id: "constant", title: "Efecte constant", implicit: true }),
  whenChoosingFocus: new Moment({ id: "whenChoosingFocus", title: "En escollir focus" }),
  actionPhase: new Moment({ id: "actionPhase", title: "Fase d'acció", implicit: true }),
  afterEventRevealed: new Moment({ id: "afterEventRevealed", title: "Després de revelar un esdeveniment" }),
  afterEventResolved: new Moment({ id: "afterEventResolved", title: "Després de resoldre un esdeveniment" }),
  beforeCombat: new Moment({ id: "beforeCombat", title: "Abans del combat" }),
  combat: new Moment({ id: "combat", title: "En combat" }),
  afterBattle: new Moment({ id: "afterBattle", title: "En concloure una batalla" }),
  afterWinningBattle: new Moment({ id: "afterWinningBattle", title: "En guanyar una batalla" }),
  afterLoosingBattle: new Moment({ id: "afterLoosingBattle", title: "En perdre una batalla" }),
  recruitingSoldiers: new Moment({ id: "recruitingSoldiers", title: "En reclutar soldats" }),
  afterCityConquered: new Moment({ id: "afterCityConquered", title: "En conquerir una ciutat" }),
  afterDestroyingBarbarianCamp: new Moment({
    id: "afterDestroyingBarbarianCamp",
    title: "En destruir un campament bàrbar",
  }),
  afterActionExecuted: new Moment({ id: "afterActionExecuted", title: "Després d'executar una acció" }),
  whenAcquiringTraits: new Moment({ id: "whenAcquiringTraits", title: "En adquirir trets" }),
  whenBuilding: new Moment({ id: "whenBuilding", title: "En construir" }),
  whenBuilt: new Moment({ id: "whenBuilt", title: "En ser construit" }),
  whenSupportingPopulation: new Moment({ id: "whenSupportingPopulation", title: "En satisfer la població" }),
  whenVisited: new Moment({ id: "whenVisited", title: "En ser visitat" }),
  chapterStart: new Moment({
    id: "chapterStart",
    title: "Inici del capítol",
  }),
  chapterEnd: new Moment({
    id: "chapterEnd",
    title: "Final del capítol",
  }),
  gameStart: new Moment({ id: "gameStart", title: "Inici de la partida" }),
  gameEnd: new Moment({ id: "gameEnd", title: "Final de la partida" }),
}
