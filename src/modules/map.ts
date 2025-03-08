import { terrainTypes, type TerrainType, type TerrainTypeId } from "@/models/terrain"
import { Hex, HexSetBuilder, type HexExtraProps, type HexInitializer, type HexProps } from "./hex"
import { type Building, buildings as allBuildings } from "@/models/buildings"

// Define TerritoryProps interface
interface TerritoryProps extends HexProps {
  type: TerrainTypeId | TerrainType
  buildings?: Array<Building | keyof typeof allBuildings>
  owner?: number
}

export class Territory extends Hex {
  readonly type: TerrainType
  readonly buildings: Building[]
  readonly owner?: number

  constructor({ type, buildings, owner, ...baseProps }: TerritoryProps) {
    super(baseProps)
    this.type = typeof type === "string" ? terrainTypes[type] : type
    this.buildings = buildings
      ? buildings.map((building) => (typeof building === "string" ? allBuildings[building] : building))
      : []
    this.owner = owner
  }

  static beginSet(centerProps: HexExtraProps<TerritoryProps>): HexSetBuilder<Territory> {
    return new HexSetBuilder(new Territory(centerProps))
  }
}
