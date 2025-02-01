import type { JSXElementConstructor } from "react"
import ExplorerIcon from "@/svg/units/explorer.svg"
import MilitiaIcon from "@/svg/units/militia.svg"
import ArchersIcon from "@/svg/units/archers.svg"
import InfantryIcon from "@/svg/units/infantry.svg"
import CavalryIcon from "@/svg/units/cavalry.svg"
import ShipIcon from "@/svg/units/ship.svg"

export type UnitTypeId = "explorer" | "militia" | "archers" | "infantry" | "cavalry" | "ship"

export interface UnitTypeProps {
  id: UnitTypeId
  title: string
  icon: JSXElementConstructor<any>
}

export class UnitType {
  id: UnitTypeId
  title: string
  icon: JSXElementConstructor<any>

  constructor({ id, title, icon }: UnitTypeProps) {
    this.id = id
    this.title = title
    this.icon = icon
  }
}

export const unitTypes: Record<UnitTypeId, UnitType> = {
  explorer: new UnitType({ id: "explorer", title: "Explorador", icon: ExplorerIcon }),
  militia: new UnitType({ id: "militia", title: "Milícia", icon: MilitiaIcon }),
  archers: new UnitType({ id: "archers", title: "Arquers", icon: ArchersIcon }),
  infantry: new UnitType({ id: "infantry", title: "Infanteria", icon: InfantryIcon }),
  cavalry: new UnitType({ id: "cavalry", title: "Cavalleria", icon: CavalryIcon }),
  ship: new UnitType({ id: "ship", title: "Vaixell", icon: ShipIcon }),
}
