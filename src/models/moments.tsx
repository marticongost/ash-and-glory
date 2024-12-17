export type MomentId =
  | "constant"
  | "productionStage"
  | "constructionStage"
  | "manouverStage"
  | "afterEventRevealed"
  | "afterEventResolved"
  | "beforeCombat"
  | "combat"
  | "afterWinningBattle"
  | "recruitingSoldiers"
  | "whenAcquiringTraits"
  | "afterCityConquered"
  | "afterDestroyingBarbarianCamp"
  | "afterActionExecuted"
  | "whenBuilding"
  | "whenBuilt"
  | "whenSupportingPopulation"
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
  productionStage: new Moment({ id: "productionStage", title: "Fase de producció" }),
  constructionStage: new Moment({ id: "constructionStage", title: "Fase de construcció" }),
  afterEventRevealed: new Moment({ id: "afterEventRevealed", title: "Després de revelar un esdeveniment" }),
  afterEventResolved: new Moment({ id: "afterEventResolved", title: "Després de resoldre un esdeveniment" }),
  manouverStage: new Moment({ id: "manouverStage", title: "Fase de maniobra" }),
  beforeCombat: new Moment({ id: "beforeCombat", title: "Abans del combat" }),
  combat: new Moment({ id: "combat", title: "En combat" }),
  afterWinningBattle: new Moment({ id: "afterWinningBattle", title: "En guanyar una batalla" }),
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
