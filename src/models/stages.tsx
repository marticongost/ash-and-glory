import type { JSXElementConstructor } from "react"
import ProductionIcon from "@/svg/stages/production.svg"
import ConstructionIcon from "@/svg/stages/construction.svg"
import ManouverIcon from "@/svg/stages/manouver.svg"

export type StageId = "production" | "construction" | "manouver"

export interface StageProps {
  id: StageId
  title: string
  icon: JSXElementConstructor<any>
}

export class Stage {
  readonly id: StageId
  readonly title: string
  readonly icon: JSXElementConstructor<any>

  constructor({ id, title, icon }: StageProps) {
    this.id = id
    this.title = title
    this.icon = icon
  }
}

export const stages: Record<StageId, Stage> = {
  production: new Stage({ id: "production", title: "Producció", icon: ProductionIcon }),
  construction: new Stage({ id: "construction", title: "Construcció", icon: ConstructionIcon }),
  manouver: new Stage({ id: "manouver", title: "Maniobra", icon: ManouverIcon }),
}
