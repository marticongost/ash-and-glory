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
import EldritchLandsIcon from "@/svg/terrain-features/eldritch-lands.svg"
import { Action, BuildingEnhancement, Capability, Limitation, Passive } from "./capabilities"
import { Reference } from "@/components/Reference"
import { buildings, buildingTypes, type Building } from "./buildings"
import type { ResourceSet, ResourceSetProps } from "./resources"
import { instantiate, toPascalCase } from "@/modules/utils"
import { TerrainType, terrainTypes, type TerrainTypeId } from "./terrain"
import { unitTypes } from "./units"
import { Curiosity, Effort, Food, Gold, Growth, Ore, Resolve, SeaHex, Strife, Wood } from "@/components/ItemIcon"
import { HexSet } from "@/modules/hex"

export const areaShapes: HexSet[] = [
  HexSet.builder()
    .push((c) => c.southEast())
    .build(),
  HexSet.builder()
    .push((c) => c.southEast())
    .push((c) => c.southWest())
    .build(),
  HexSet.builder()
    .push((c) => c.northEast())
    .push((c) => c.southEast())
    .build(),
  HexSet.builder()
    .push((c) => c.southEast())
    .push((c) => c.south())
    .push((c) => c.northWest())
    .build(),
  HexSet.builder()
    .push((c) => c.northEast())
    .push((c) => c.south())
    .push((c) => c.south())
    .push((c) => c.northEast())
    .build(),
  HexSet.builder()
    .push((c) => c.northEast())
    .push((c) => c.south())
    .push((c) => c.south())
    .push((c) => c.northWest())
    .build(),
  HexSet.builder()
    .add((c) => c.north())
    .add((c) => c.southWest())
    .add((c) => c.southEast())
    .build(),
]

export interface AreaTerrainChoicesProps {
  primary: TerrainChoice
  secondary?: TerrainChoice
}

export class AreaTerrainChoices {
  readonly primary: TerrainType[]
  readonly secondary: TerrainType[]

  constructor({ primary, secondary }: AreaTerrainChoicesProps) {
    const toTerrainTypes = (choice: TerrainChoice): TerrainType[] => {
      if (choice === undefined) {
        return []
      } else if (typeof choice === "object" && choice instanceof Array) {
        return choice.flatMap(toTerrainTypes)
      } else {
        return typeof choice === "string" ? [terrainTypes[choice]] : [choice]
      }
    }
    this.primary = toTerrainTypes(primary)
    this.secondary = toTerrainTypes(secondary)
  }
}

export type TerrainChoice = TerrainTypeId | TerrainTypeId[] | TerrainType | TerrainType[] | undefined

export interface AreaContentProps {
  id: string
  title: string
  types: Array<AreaType | AreaFeatureTypeId>
  feature?: AreaFeature | AreaFeatureProps
  terrain: AreaTerrainChoices | AreaTerrainChoicesProps
}

export class Area {
  readonly id: string
  readonly title: string
  readonly types: AreaType[]
  readonly feature?: AreaFeature
  readonly terrain: AreaTerrainChoices

  constructor({ id, title, types, feature, terrain }: AreaContentProps) {
    this.id = id
    this.title = title
    this.types = types.map((type) => (typeof type === "string" ? areaTypes[type] : type))
    this.feature = feature && instantiate(feature, AreaFeature)
    this.terrain = instantiate(terrain, AreaTerrainChoices)
  }
}

export type AreaFeatureTypeId = "threat" | "production" | "riches" | "ruinedBuilding" | "specialUnit"

export interface AreaFeatureTypeProps {
  id: AreaFeatureTypeId
  title: string
}

export class AreaType {
  readonly id: AreaFeatureTypeId
  readonly title: string

  constructor({ id, title }: AreaFeatureTypeProps) {
    this.id = id
    this.title = title
  }
}

export const areaTypes: Record<AreaFeatureTypeId, AreaType> = {
  threat: new AreaType({ id: "threat", title: "Amenaça" }),
  production: new AreaType({ id: "production", title: "Producció" }),
  riches: new AreaType({ id: "riches", title: "Riqueses" }),
  ruinedBuilding: new AreaType({ id: "ruinedBuilding", title: "Edifici abandonat" }),
  specialUnit: new AreaType({ id: "specialUnit", title: "Unitat especial" }),
}

export interface AreaFeatureProps {
  icon: JSXElementConstructor<any>
  capabilities: Capability[]
}

export class AreaFeature {
  readonly icon: JSXElementConstructor<any>
  readonly capabilities: Capability[]

  constructor({ icon, capabilities }: AreaFeatureProps) {
    this.icon = icon
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
    title: `Ruina: ${building.shortTitle}`,
    types: ["ruinedBuilding"],
    terrain: {
      primary: ["grassland", "forest", "mountain"],
      secondary: ["grassland", "forest", "mountain", "sea"],
    },
    feature: {
      icon,
      capabilities: [
        new Action({
          id: "feature",
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
    title: "Vilatans indòmits",
    types: ["specialUnit"],
    terrain: {
      primary: ["forest", "mountain"],
      secondary: ["forest", "mountain"],
    },
    feature: {
      icon: RenownedMilitiaIcon,
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
    title: "Arquers reputats",
    types: ["specialUnit"],
    terrain: {
      primary: ["forest", "mountain"],
      secondary: ["forest", "mountain"],
    },
    feature: {
      icon: RenownedArchersIcon,
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
    title: "Infanteria reputada",
    types: ["specialUnit"],
    terrain: {
      primary: ["grassland", "forest"],
      secondary: ["grassland", "forest"],
    },
    feature: {
      icon: RenownedInfantryIcon,
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
    title: "Cavallers reputats",
    types: ["specialUnit"],
    terrain: {
      primary: "grassland",
    },
    feature: {
      icon: RenownedCavalryIcon,
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
    title: "Gemmes",
    types: ["production"],
    terrain: {
      primary: "mountain",
      secondary: ["grassland", "forest", "sea"],
    },
    feature: {
      icon: GemstonesIcon,
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
    title: "Cantera",
    types: ["production"],
    terrain: {
      primary: "mountain",
      secondary: ["grassland", "forest", "sea"],
    },
    feature: {
      icon: QuarryIcon,
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
                  Reduir el cost d'un edifici en un <Ore /> en construir a la ciutat (màxim 1 cop per capítol).
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
    title: "Veta de ferro",
    types: ["production"],
    terrain: {
      primary: "mountain",
      secondary: ["grassland", "forest", "sea"],
    },
    feature: {
      icon: IronIcon,
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
                  Reduir el cost en un <Ore /> en reclutar soldats a la ciutat (màxim 1 cop per capítol).
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
    title: "Bosc dens",
    types: ["production"],
    terrain: {
      primary: "forest",
    },
    feature: {
      icon: ThickForestIcon,
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
                  Reduir el cost d'un edifici en un <Wood /> en construir a la ciutat (màxim 1 cop per capítol).
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
    title: "Gra",
    types: ["production"],
    terrain: {
      primary: "grassland",
      secondary: ["forest", "sea"],
    },
    feature: {
      icon: GrainIcon,
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
    title: "Vi",
    types: ["production"],
    terrain: {
      primary: "grassland",
      secondary: ["sea"],
    },
    feature: {
      icon: WineIcon,
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
    title: "Pells",
    types: ["production"],
    terrain: {
      primary: "forest",
      secondary: ["mountain", "grassland"],
    },
    feature: {
      icon: PeltsIcon,
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
    title: "Peix",
    types: ["production"],
    terrain: {
      primary: "sea",
      secondary: ["grassland", "forest", "mountain"],
    },
    feature: {
      icon: FishIcon,
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
    title: "Pirates",
    types: ["threat"],
    terrain: {
      primary: "sea",
      secondary: "mountain",
    },
    feature: {
      icon: PiratesIcon,
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
    title: "Monstre marí",
    types: ["threat"],
    terrain: {
      primary: "sea",
      secondary: "mountain",
    },
    feature: {
      icon: SeaMonsterIcon,
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
    title: "Tresor enfonsat",
    types: ["riches"],
    terrain: {
      primary: "sea",
      secondary: "mountain",
    },
    feature: {
      icon: SunkenTreasureIcon,
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
    title: "Cova de drac",
    types: ["threat"],
    terrain: {
      primary: "mountain",
      secondary: ["grassland", "forest", "sea"],
    },
    feature: {
      icon: DragonIcon,
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
    title: "Bàrbars",
    types: ["threat"],
    terrain: {
      primary: ["forest", "mountain"],
      secondary: ["grassland", "forest", "sea"],
    },
    feature: {
      icon: BarbariansIcon,
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
    title: "Gòblins",
    types: ["threat"],
    terrain: {
      primary: "forest",
      secondary: ["grassland", "mountain", "sea"],
    },
    feature: {
      icon: GoblinsIcon,
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
    title: "Trolls",
    types: ["threat"],
    terrain: {
      primary: "forest",
      secondary: ["grassland", "mountain", "sea"],
    },
    feature: {
      icon: TrollsIcon,
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
  eldritchLands: new Area({
    id: "eldritchLands",
    title: "Terres sinistres",
    types: ["production"],
    terrain: {
      primary: "wasteland",
    },
    feature: {
      icon: EldritchLandsIcon,
      capabilities: [
        new BuildingEnhancement({
          id: "feature",
          target: buildingTypes.magic,
          targetAdjacency: "inContact",
          capabilities: [
            new Action({
              id: "rawPower",
              cost: { curiosity: 1 },
              effect: (
                <>
                  Guanyar <Resolve amount={2} />
                </>
              ),
            }),
          ],
        }),
      ],
    },
  }),
}
