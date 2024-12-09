export type MomentId =
  | "constant"
  | "productionStage"
  | "constructionStage"
  | "manouverStage"
  | "combat"
  | "recruitingSoldiers"
  | "whenAcquiringTraits"
  | "afterCityConquered"
  | "afterDestroyingBarbarianCamp"
  | "afterActionExecuted"
  | "whenBuilding"
  | "whenBuilt"
  | "turnStart"
  | "turnEnd"
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
  manouverStage: new Moment({ id: "manouverStage", title: "Fase de maniobra" }),
  combat: new Moment({ id: "combat", title: "En combatre" }),
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
  turnStart: new Moment({
    id: "turnStart",
    title: "A l'inici del torn",
  }),
  turnEnd: new Moment({
    id: "turnEnd",
    title: "En finalitzar el torn",
  }),
  gameEnd: new Moment({ id: "gameEnd", title: "En finalitzar la partida" }),
}
