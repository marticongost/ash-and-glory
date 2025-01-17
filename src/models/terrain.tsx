import GrasslandIcon from "@/svg/terrain/grassland.svg"
import ForestIcon from "@/svg/terrain/forest.svg"
import MountainIcon from "@/svg/terrain/mountain.svg"
import SeaIcon from "@/svg/terrain/sea.svg"
import GrasslandResourceIcon from "@/svg/terrain/grassland-hex.svg"
import ForestResourceIcon from "@/svg/terrain/forest-hex.svg"
import MountainResourceIcon from "@/svg/terrain/mountain-hex.svg"
import SeaResourceIcon from "@/svg/terrain/sea-hex.svg"
import type { JSXElementConstructor } from "react"

export type TerrainTypeId = "grassland" | "forest" | "mountain" | "sea"

export interface TerrainTypeProps {
  id: TerrainTypeId
  title: string
  icon: JSXElementConstructor<any>
  resourceIcon: JSXElementConstructor<any>
}

export class TerrainType {
  readonly id: TerrainTypeId
  readonly title: string
  readonly icon: JSXElementConstructor<any>
  readonly resourceIcon: JSXElementConstructor<any>

  constructor({ id, title, icon, resourceIcon }: TerrainTypeProps) {
    this.id = id
    this.title = title
    this.icon = icon
    this.resourceIcon = resourceIcon
  }
}

export const terrainTypes: Record<TerrainTypeId, TerrainType> = {
  grassland: new TerrainType({
    id: "grassland",
    title: "Prats",
    icon: GrasslandIcon,
    resourceIcon: GrasslandResourceIcon,
  }),
  forest: new TerrainType({ id: "forest", title: "Bosc", icon: ForestIcon, resourceIcon: ForestResourceIcon }),
  mountain: new TerrainType({
    id: "mountain",
    title: "Muntanya",
    icon: MountainIcon,
    resourceIcon: MountainResourceIcon,
  }),
  sea: new TerrainType({ id: "sea", title: "Mar", icon: SeaIcon, resourceIcon: SeaResourceIcon }),
}
