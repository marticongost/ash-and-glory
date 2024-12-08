export type MomentId =
  | "constant"
  | "productionStage"
  | "constructionStage"
  | "manouverStage"
  | "combat"
  | "recruitingSoldiers"
  | "whenAcquiringTraits"
  | "afterCityConquered"
  | "whenBuilding"
  | "whenBuilt"
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
  whenAcquiringTraits: new Moment({ id: "whenAcquiringTraits", title: "En adquirir trets" }),
  whenBuilding: new Moment({ id: "whenBuilding", title: "En construir" }),
  whenBuilt: new Moment({ id: "whenBuilt", title: "Després de ser construit" }),
  turnEnd: new Moment({
    id: "turnEnd",
    title: "En finalitzar el torn",
  }),
  gameEnd: new Moment({ id: "gameEnd", title: "En finalitzar la partida" }),
}
