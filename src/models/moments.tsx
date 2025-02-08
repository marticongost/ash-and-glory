export type MomentId =
  | "constant"
  | "whenChoosingFocus"
  | "productionStage"
  | "constructionStage"
  | "manouverStage"
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
  | "turnStart"
  | "turnEnd"
  | "gameStart"
  | "gameEnd"

export interface MomentProps {
  id: MomentId
  title: string
}

export class Moment {
  readonly id: MomentId
  readonly title: string

  constructor({ id, title }: MomentProps) {
    this.id = id
    this.title = title
  }
}

export const moments: Record<MomentId, Moment> = {
  constant: new Moment({ id: "constant", title: "Efecte constant" }),
  whenChoosingFocus: new Moment({ id: "whenChoosingFocus", title: "En escollir focus" }),
  productionStage: new Moment({ id: "productionStage", title: "Fase de producció" }),
  constructionStage: new Moment({ id: "constructionStage", title: "Fase de construcció" }),
  afterEventRevealed: new Moment({ id: "afterEventRevealed", title: "Després de revelar un esdeveniment" }),
  afterEventResolved: new Moment({ id: "afterEventResolved", title: "Després de resoldre un esdeveniment" }),
  manouverStage: new Moment({ id: "manouverStage", title: "Fase de maniobra" }),
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
  whenBuilt: new Moment({ id: "whenBuilt", title: "Després de ser construit" }),
  whenSupportingPopulation: new Moment({ id: "whenSupportingPopulation", title: "En satisfer la població" }),
  whenVisited: new Moment({ id: "whenVisited", title: "En ser visitat" }),
  turnStart: new Moment({
    id: "turnStart",
    title: "A l'inici del torn",
  }),
  turnEnd: new Moment({
    id: "turnEnd",
    title: "En finalitzar el torn",
  }),
  gameStart: new Moment({ id: "gameStart", title: "En començar la partida" }),
  gameEnd: new Moment({ id: "gameEnd", title: "En finalitzar la partida" }),
}
