import type { JSXElementConstructor } from "react"
import RenownedMilitiaIcon from "@/svg/terrain-features/renowned-militia.svg"
import RenownedArchersIcon from "@/svg/terrain-features/renowned-archers.svg"
import RenownedInfantryIcon from "@/svg/terrain-features/renowned-infantry.svg"
import RenownedCavalryIcon from "@/svg/terrain-features/renowned-cavalry.svg"
import GemstonesIcon from "@/svg/terrain-features/gemstones.svg"
import QuarryIcon from "@/svg/terrain-features/quarry.svg"
import IronIcon from "@/svg/terrain-features/iron.svg"
import ThickForestIcon from "@/svg/terrain-features/thick-forest.svg"
import GrainIcon from "@/svg/terrain-features/grain.svg"
import WineIcon from "@/svg/terrain-features/wine.svg"
import PeltsIcon from "@/svg/terrain-features/pelts.svg"
import FishIcon from "@/svg/terrain-features/fish.svg"
import PiratesIcon from "@/svg/terrain-features/pirates.svg"
import SeaMonsterIcon from "@/svg/terrain-features/sea-monster.svg"
import SunkenTreasureIcon from "@/svg/terrain-features/sunken-treasure.svg"
import DragonIcon from "@/svg/terrain-features/dragon.svg"
import BarbariansIcon from "@/svg/terrain-features/barbarians.svg"
import GoblinsIcon from "@/svg/terrain-features/goblins.svg"
import TrollsIcon from "@/svg/terrain-features/trolls.svg"
import RuinedPalaceIcon from "@/svg/terrain-features/ruined-palace.svg"
import RuinedCastleIcon from "@/svg/terrain-features/ruined-castle.svg"
import RuinedMageTowerIcon from "@/svg/terrain-features/ruined-mage-tower.svg"
import RuinedPortalIcon from "@/svg/terrain-features/ruined-portal.svg"
import RuinedMonumentIcon from "@/svg/terrain-features/ruined-monument.svg"
import { Action, BuildingEnhancement, Capability, Passive } from "./capabilities"
import { Reference } from "@/components/Reference"
import { buildings, type Building } from "./buildings"
import type { ResourceSet, ResourceSetProps } from "./resources"
import { instantiate, toPascalCase } from "@/modules/utils"
import { terrainTypes, type TerrainTypeId } from "./terrain"
import { unitTypes } from "./units"
import { Curiosity, Effort, Food, Gold, Growth, Ore, Strife, Wood } from "@/components/ItemIcon"

export interface AreaProps {
  id: string
  feature?: AreaFeature | AreaFeatureProps
  terrain: Partial<Record<TerrainTypeId, AreaSize | AreaSizeProps>>
  size?: AreaSize | AreaSizeProps
  buildingSlots?: number
}

export class Area {
  readonly id: string
  readonly feature?: AreaFeature
  readonly terrain: Partial<Record<TerrainTypeId, AreaSize>>
  readonly size: AreaSize
  readonly buildingSlots: number

  constructor({ id, feature, terrain, size, buildingSlots }: AreaProps) {
    this.id = id
    this.feature = feature && instantiate(feature, AreaFeature)
    this.terrain = {}
    const terrainTypeIds = Object.keys(terrainTypes) as TerrainTypeId[]
    let autoMinSize = 0
    let autoMaxSize = 0
    for (const terrainTypeId of terrainTypeIds) {
      let terrainType = terrain[terrainTypeId]
      if (terrainType !== undefined) {
        terrainType = instantiate(terrainType, AreaSize)
        this.terrain[terrainTypeId] = terrainType
        autoMinSize += terrainType.min
        autoMaxSize += terrainType.max
      }
    }
    this.size =
      size === undefined
        ? new AreaSize([Math.max(autoMinSize, 1), Math.max(autoMaxSize, 1)])
        : instantiate(size, AreaSize)
    this.buildingSlots = buildingSlots ?? this.size.max
  }
}

export type AreaSizeProps = number | [number, number]

export class AreaSize {
  readonly min: number
  readonly max: number

  constructor(size: number | [number, number]) {
    if (typeof size === "number") {
      this.min = size
      this.max = size
    } else {
      this.min = size[0]
      this.max = size[1]
    }
  }

  toString(): string {
    if (this.min === this.max) {
      return this.min.toString()
    }
    return `${this.min}-${this.max}`
  }
}

export type AreaFeatureTypeId = "threat" | "production" | "riches" | "ruinedBuilding" | "specialUnit"

export interface AreaFeatureTypeProps {
  id: AreaFeatureTypeId
  title: string
}

export class AreaFeatureType {
  readonly id: AreaFeatureTypeId
  readonly title: string

  constructor({ id, title }: AreaFeatureTypeProps) {
    this.id = id
    this.title = title
  }
}

export const areaTypes: Record<AreaFeatureTypeId, AreaFeatureType> = {
  threat: new AreaFeatureType({ id: "threat", title: "Amenaça" }),
  production: new AreaFeatureType({ id: "production", title: "Producció" }),
  riches: new AreaFeatureType({ id: "riches", title: "Riqueses" }),
  ruinedBuilding: new AreaFeatureType({ id: "ruinedBuilding", title: "Edifici abandonat" }),
  specialUnit: new AreaFeatureType({ id: "specialUnit", title: "Unitat especial" }),
}

export interface AreaFeatureProps {
  title: string
  icon: JSXElementConstructor<any>
  types: Array<AreaFeatureType | AreaFeatureTypeId>
  capabilities: Capability[]
}

export class AreaFeature {
  readonly title: string
  readonly icon: JSXElementConstructor<any>
  readonly types: AreaFeatureType[]
  readonly capabilities: Capability[]

  constructor({ title, icon, types, capabilities }: AreaFeatureProps) {
    this.title = title
    this.icon = icon
    this.types = types.map((type) => (typeof type === "string" ? areaTypes[type] : type))
    this.capabilities = capabilities
  }
}

const makeRuinedBuildingFeature = (
  building: Building,
  icon: JSXElementConstructor<any>,
  cost: ResourceSet | ResourceSetProps,
): Area =>
  new Area({
    id: `ruined${toPascalCase(building.id)}`,
    terrain: {
      grassland: [0, 1],
      forest: [0, 1],
      mountain: [0, 1],
    },
    size: 1,
    feature: {
      title: `${building.title} en ruïnes`,
      icon,
      types: ["ruinedBuilding"],
      capabilities: [
        new Action({
          id: "feature",
          moment: "constructionStage",
          cost,
          effect: (
            <>
              <p>
                Substituir la característica per un edifici <Reference item={building} />.
              </p>
              <p>Cal tenir una ciutat adjacent. S'apliquen tots els efectes i regles per construir edificis.</p>
            </>
          ),
        }),
      ],
    },
  })

export const areas: Record<string, Area> = {
  renownedMilitia: new Area({
    id: "renownedMilitia",
    terrain: {
      forest: [0, 1],
      mountain: [0, 1],
    },
    feature: {
      title: "Vilatans indòmits",
      icon: RenownedMilitiaIcon,
      types: ["specialUnit"],
      capabilities: [
        new Passive({
          id: "feature",
          moment: "recruitingSoldiers",
          effect: (
            <>
              Permet reclutar <Reference item={unitTypes.militia} /> d'elit
            </>
          ),
        }),
      ],
    },
  }),
  renownedArchers: new Area({
    id: "renownedArchers",
    terrain: {
      forest: [0, 1],
      mountain: [0, 1],
    },
    feature: {
      title: "Arquers reputats",
      icon: RenownedArchersIcon,
      types: ["specialUnit"],
      capabilities: [
        new Passive({
          id: "feature",
          moment: "recruitingSoldiers",
          effect: (
            <>
              Permet reclutar <Reference item={unitTypes.archers} /> d'elit
            </>
          ),
        }),
      ],
    },
  }),
  renownedInfantry: new Area({
    id: "renownedInfantry",
    terrain: {
      grassland: [0, 1],
      forest: [0, 1],
    },
    feature: {
      title: "Infanteria reputada",
      icon: RenownedInfantryIcon,
      types: ["specialUnit"],
      capabilities: [
        new Passive({
          id: "feature",
          moment: "recruitingSoldiers",
          effect: (
            <>
              Permet reclutar <Reference item={unitTypes.infantry} /> d'elit
            </>
          ),
        }),
      ],
    },
  }),
  renownedCavalry: new Area({
    id: "renownedCavalry",
    terrain: {
      grassland: [1, 2],
    },
    feature: {
      title: "Cavallers reputats",
      icon: RenownedCavalryIcon,
      types: ["specialUnit"],
      capabilities: [
        new Passive({
          id: "feature",
          moment: "recruitingSoldiers",
          effect: (
            <>
              Permet reclutar <Reference item={unitTypes.cavalry} /> d'elit
            </>
          ),
        }),
      ],
    },
  }),
  gemstones: new Area({
    id: "gemstones",
    terrain: {
      mountain: [1, 2],
    },
    feature: {
      title: "Gemmes",
      icon: GemstonesIcon,
      types: ["production"],
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildings.mine,
          targetAdjacency: "sameHex",
          capabilities: [
            new Passive({
              id: "abundance",
              effect: (
                <>
                  En recol·lectar <Ore />, convertir un dels <Ore /> obtinguts en <Gold />
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
  quarry: new Area({
    id: "quarry",
    terrain: {
      mountain: [1, 2],
    },
    feature: {
      title: "Cantera",
      icon: QuarryIcon,
      types: ["production"],
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildings.mine,
          targetAdjacency: "sameHex",
          capabilities: [
            new Passive({
              id: "abundance",
              moment: "whenBuilding",
              effect: (
                <>
                  Reduir el cost d'un edifici en un <Ore /> en construir a la ciutat (màxim 1 cop per torn).
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
  iron: new Area({
    id: "iron",
    terrain: {
      mountain: [1, 2],
    },
    feature: {
      title: "Veta de ferro",
      icon: IronIcon,
      types: ["production"],
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildings.mine,
          targetAdjacency: "sameHex",
          capabilities: [
            new Passive({
              id: "abundance",
              moment: "recruitingSoldiers",
              effect: (
                <>
                  Reduir el cost en un <Ore /> en reclutar soldats a la ciutat (màxim 1 cop per torn).
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
  thickForest: new Area({
    id: "thickForest",
    terrain: {
      forest: [1, 2],
    },
    feature: {
      title: "Bosc dens",
      icon: ThickForestIcon,
      types: ["production"],
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildings.sawmill,
          targetAdjacency: "sameHex",
          capabilities: [
            new Passive({
              id: "abundance",
              moment: "whenBuilding",
              effect: (
                <>
                  Reduir el cost d'un edifici en un <Wood /> en construir a la ciutat (màxim 1 cop per torn).
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
  grain: new Area({
    id: "grain",
    terrain: {
      grassland: [1, 2],
    },
    feature: {
      title: "Gra",
      icon: GrainIcon,
      types: ["production"],
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildings.farm,
          targetAdjacency: "sameHex",
          capabilities: [
            new Passive({
              id: "abundance",
              effect: (
                <>
                  En recol·lectar <Food /> amb aquesta granja, guanyar un <Food /> més de l'habitual.
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
  wine: new Area({
    id: "wine",
    terrain: {
      grassland: [1, 2],
    },
    feature: {
      title: "Vi",
      icon: WineIcon,
      types: ["production"],
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildings.farm,
          targetAdjacency: "sameHex",
          capabilities: [
            new Passive({
              id: "abundance",
              effect: (
                <>
                  En recol·lectar <Food />, convertir un dels <Food /> obtinguts en <Gold />.
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
  pelts: new Area({
    id: "pelts",
    terrain: {
      forest: [1, 2],
    },
    feature: {
      title: "Pells",
      icon: PeltsIcon,
      types: ["production"],
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildings.farm,
          targetAdjacency: "sameHex",
          capabilities: [
            new Passive({
              id: "abundance",
              effect: (
                <>
                  Opcionalment, es pot gastar <Strife /> en comptes de
                  <Growth /> per pagar la recol·lecció.
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
  fish: new Area({
    id: "fish",
    terrain: {
      sea: [1, 2],
    },
    feature: {
      title: "Peix",
      icon: FishIcon,
      types: ["production"],
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildings.harbour,
          targetAdjacency: "sameHex",
          capabilities: [
            new Passive({
              id: "abundance",
              effect: (
                <>
                  Opcionalment, es pot gastar <Curiosity /> en comptes d'
                  <Effort /> per pagar la recol·lecció.
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
  pirates: new Area({
    id: "pirates",
    terrain: {
      sea: [1, 2],
    },
    feature: {
      title: "Pirates",
      icon: PiratesIcon,
      types: ["threat"],
      capabilities: [
        new Passive({
          id: "feature",
          effect: <></>,
        }),
      ],
    },
  }),
  seaMonster: new Area({
    id: "seaMonster",
    terrain: {
      sea: [1, 2],
    },
    feature: {
      title: "Monstre marí",
      icon: SeaMonsterIcon,
      types: ["threat"],
      capabilities: [
        new Passive({
          id: "feature",
          effect: <></>,
        }),
      ],
    },
  }),
  sunkenTreasure: new Area({
    id: "sunkenTreasure",
    terrain: {
      sea: [1, 2],
    },
    feature: {
      title: "Tresor enfonsat",
      icon: SunkenTreasureIcon,
      types: ["riches"],
      capabilities: [
        new Action({
          id: "feature",
          moment: "whenVisited",
          cost: { curiosity: 1 },
          effect: (
            <>
              Guanyar <Gold amount={3} /> i retirar la característica.
            </>
          ),
        }),
      ],
    },
  }),
  dragon: new Area({
    id: "dragon",
    terrain: {
      mountain: [1, 2],
    },
    feature: {
      title: "Cova de drac",
      icon: DragonIcon,
      types: ["threat"],
      capabilities: [
        new Passive({
          id: "feature",
          effect: <></>,
        }),
      ],
    },
  }),
  barbarians: new Area({
    id: "barbarians",
    terrain: {
      forest: [1, 2],
    },
    feature: {
      title: "Bàrbars",
      icon: BarbariansIcon,
      types: ["threat"],
      capabilities: [
        new Passive({
          id: "feature",
          effect: <></>,
        }),
      ],
    },
  }),
  goblins: new Area({
    id: "goblins",
    terrain: {
      forest: [1, 2],
    },
    feature: {
      title: "Gòblins",
      icon: GoblinsIcon,
      types: ["threat"],
      capabilities: [
        new Passive({
          id: "feature",
          effect: <></>,
        }),
      ],
    },
  }),
  trolls: new Area({
    id: "trolls",
    terrain: {
      forest: [0, 2],
      mountain: [0, 2],
    },
    size: [1, 2],
    feature: {
      title: "Trolls",
      icon: TrollsIcon,
      types: ["threat"],
      capabilities: [
        new Passive({
          id: "feature",
          effect: <></>,
        }),
      ],
    },
  }),
  ruinedCastle: makeRuinedBuildingFeature(buildings.castle, RuinedCastleIcon, { population: 1, ore: 1 }),
  ruinedPalace: makeRuinedBuildingFeature(buildings.palace, RuinedPalaceIcon, { population: 1, gold: 1 }),
  ruinedMageTower: makeRuinedBuildingFeature(buildings.mageTower, RuinedMageTowerIcon, { population: 1, curiosity: 1 }),
  ruinedPortal: makeRuinedBuildingFeature(buildings.portal, RuinedPortalIcon, { population: 1, curiosity: 1 }),
  ruinedMonument: makeRuinedBuildingFeature(buildings.monument, RuinedMonumentIcon, { population: 1, ore: 1 }),
}
