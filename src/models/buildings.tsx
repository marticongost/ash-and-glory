import type { JSXElementConstructor, ReactNode } from "react"
import { ResourceSet, type ResourceSetProps } from "./resources"
import { instantiate } from "@/modules/utils"
import { Action, Capability, Limitation, Passive, unique } from "./capabilities"
import CityCenterIcon from "@/svg/buildings/city.svg"
import HousingIcon from "@/svg/buildings/housing.svg"
import FarmIcon from "@/svg/buildings/farm.svg"
import SawmillIcon from "@/svg/buildings/sawmill.svg"
import MineIcon from "@/svg/buildings/mine.svg"
import HarbourIcon from "@/svg/buildings/port.svg"
import WorkshopIcon from "@/svg/buildings/workshop.svg"
import StorageIcon from "@/svg/buildings/storage.svg"
import GranaryIcon from "@/svg/buildings/granary.svg"
import MarketIcon from "@/svg/buildings/market.svg"
import BankIcon from "@/svg/buildings/bank.svg"
import CastleIcon from "@/svg/buildings/castle.svg"
import BarracksIcon from "@/svg/buildings/barracks.svg"
import StablesIcon from "@/svg/buildings/stables.svg"
import PalaceIcon from "@/svg/buildings/palace.svg"
import FertilityTempleIcon from "@/svg/buildings/temple-fertility.svg"
import WarTempleIcon from "@/svg/buildings/temple-war.svg"
import InspirationTempleIcon from "@/svg/buildings/temple-inspiration.svg"
import JusticeTempleIcon from "@/svg/buildings/temple-justice.svg"
import DarknessTempleIcon from "@/svg/buildings/temple-darkness.svg"
import UniversityIcon from "@/svg/buildings/university.svg"
import MageTowerIcon from "@/svg/buildings/mage-tower.svg"
import MonumentIcon from "@/svg/buildings/monument.svg"
import PortalIcon from "@/svg/buildings/portal.svg"
import {
  Food,
  Gold,
  Ore,
  Population,
  Wood,
  AnyMaterial,
  Glory,
  Growth,
  Resolve,
} from "@/components/ResourceIcon/ResourceIcon"

export type BuildingTypeId =
  | "government"
  | "housing"
  | "production"
  | "storage"
  | "economic"
  | "military"
  | "religious"
  | "academic"
  | "magic"
  | "monumental"

export interface BuildingTypeProps {
  id: string
  title: string
}

export class BuildingType {
  readonly id: string
  readonly title: string

  constructor({ id, title }: BuildingTypeProps) {
    this.id = id
    this.title = title
  }
}

export const buildingTypes: Record<BuildingTypeId, BuildingType> = {
  government: new BuildingType({ id: "government", title: "Govern" }),
  housing: new BuildingType({ id: "housing", title: "Allotjament" }),
  production: new BuildingType({ id: "production", title: "Producció" }),
  storage: new BuildingType({ id: "storage", title: "Emmagatzematge" }),
  economic: new BuildingType({ id: "economic", title: "Econòmic" }),
  military: new BuildingType({ id: "military", title: "Militar" }),
  religious: new BuildingType({ id: "religious", title: "Religiós" }),
  academic: new BuildingType({ id: "academic", title: "Acadèmic" }),
  magic: new BuildingType({ id: "magic", title: "Màgic" }),
  monumental: new BuildingType({ id: "monumental", title: "Monumental" }),
}

export interface BuildingProps {
  id: string
  title: string
  icon: JSXElementConstructor<any>
  types: Array<BuildingTypeId | BuildingType>
  capabilities: Capability[]
  cost: ResourceSet | ResourceSetProps
}

export class Building {
  readonly id: string
  readonly title: string
  readonly icon: JSXElementConstructor<any>
  readonly types: BuildingType[]
  readonly cost: ResourceSet
  readonly capabilities: Capability[]

  constructor({ id, title, icon, types, cost, capabilities }: BuildingProps) {
    this.id = id
    this.title = title
    this.icon = icon
    this.types = types.map((type) => (type instanceof BuildingType ? type : buildingTypes[type]))
    this.cost = instantiate(cost, ResourceSet)
    this.capabilities = capabilities
  }
}

export const buildings: Record<string, Building> = {}

const declareBuilding = (props: BuildingProps): Building => {
  const building = new Building(props)
  buildings[props.id] = building
  return building
}

declareBuilding({
  id: "city-center",
  title: "Centre de ciutat",
  icon: CityCenterIcon,
  types: ["government"],
  cost: {},
  capabilities: [
    new Passive({
      id: "population-limit",
      effect: <>Límit de població 3</>,
    }),
    new Passive({
      id: "city-size-limit",
      effect: <>Mida màxima 6.</>,
    }),
    new Action({
      id: "increase-population",
      title: "Augmentar la població",
      cost: { food: 1 },
      limit: Infinity,
      effect: (
        <>
          Afegeix <Population /> a la ciutat
        </>
      ),
    }),
    new Action({
      id: "create-colonizer",
      title: "Emigrar",
      cost: { curiosity: 1, population: 1 },
      limit: Infinity,
      effect: (
        <>
          Retira un <Population /> de la ciutat i desplega un colon a l'edifici
        </>
      ),
    }),
    new Action({
      id: "build",
      title: "Construir edifici",
      moment: "constructionStage",
      cost: { growth: 1, population: 1 },
      limit: Infinity,
      effect: <>Construeix un edifici a la ciutat, pagant el seu cost</>,
    }),
  ],
})

declareBuilding({
  id: "housing",
  title: "Allotjaments",
  icon: HousingIcon,
  types: ["housing"],
  cost: { wood: 2 },
  capabilities: [
    new Passive({
      id: "increase-max-population",
      effect: <>Augmentar el límit de població en 2.</>,
    }),
  ],
})

declareBuilding({
  id: "farm",
  title: "Granja",
  icon: FarmIcon,
  types: ["production"],
  cost: { wood: 2 },
  capabilities: [
    new Limitation({
      id: "must-be-adjacent-to-sea",
      effect: <>S'ha de construir a una casella en contacte amb un o més camps</>,
    }),
    new Action({
      id: "produce-food",
      title: "Produir menjar",
      cost: { growth: 1, population: "1+" },
      effect: (
        <>
          Guanyar <Food /> per cada <Population />, fins a un màxim igual al número de camps adjacents a la granja
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "sawmill",
  title: "Serradora",
  icon: SawmillIcon,
  types: ["production"],
  cost: { wood: 1, ore: 1 },
  capabilities: [
    new Limitation({
      id: "must-be-adjacent-to-sea",
      effect: <>S'ha de construir a una casella en contacte amb un o més boscos</>,
    }),
    new Action({
      id: "produce-wood",
      title: "Produir fusta",
      cost: { effort: 1, population: "1+" },
      effect: (
        <>
          Guanyar <Wood /> per cada <Population />, fins a un màxim igual al número de boscos adjacents a la serradora
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "mine",
  title: "Mina",
  icon: MineIcon,
  types: ["production"],
  cost: { wood: 1, ore: 1 },
  capabilities: [
    new Limitation({
      id: "must-be-adjacent-to-sea",
      effect: <>S'ha de construir a una casella en contacte amb una o més muntanyes</>,
    }),
    new Action({
      id: "produce-ore",
      title: "Produir mineral",
      cost: { effort: 1, population: "1+" },
      effect: (
        <>
          Guanyar <Ore /> per cada <Population />, fins a un màxim igual al número de muntanyes adjacents a la mina
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "harbour",
  title: "Port",
  icon: HarbourIcon,
  types: ["production"],
  cost: { wood: 2, ore: 1 },
  capabilities: [
    new Limitation({
      id: "must-be-adjacent-to-sea",
      effect: <>S'ha de construir a una casella adjacent a un o més mars</>,
    }),
    new Action({
      id: "fish",
      title: "Pescar",
      cost: { effort: 1, population: "1+" },
      effect: (
        <>
          Guanyar <Food /> per cada <Population />, fins a un màxim igual al número de mars adjacents al port
        </>
      ),
    }),
    new Action({
      id: "build-ship",
      title: "Construir vaixell",
      moment: "manouverStage",
      cost: { curiosity: 1, wood: 2 },
      effect: (
        <>
          Retira un <Population /> de la ciutat i desplega un vaixell a un mar adjacent
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "workshop",
  title: "Taller",
  icon: WorkshopIcon,
  types: ["production"],
  cost: { wood: 1, ore: 1 },
  capabilities: [
    new Action({
      id: "fish",
      title: "Manufacturar productes",
      cost: { effort: 1, population: "1+", anyMaterial: "1+" },
      effect: (
        <>
          Guanyar <Gold amount={2} /> per cada parella de <Population /> i <AnyMaterial /> invertida
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "storage",
  title: "Magatzem",
  icon: StorageIcon,
  types: ["storage", "economic"],
  cost: { wood: 2 },
  capabilities: [
    new Passive({
      id: "store-materials",
      moment: "turnEnd",
      effect: (
        <>
          Permet emmagatzemar un <AnyMaterial />
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "granary",
  title: "Graner",
  icon: GranaryIcon,
  types: ["storage", "economic"],
  cost: { wood: 2 },
  capabilities: [
    new Passive({
      id: "store-materials",
      moment: "turnEnd",
      effect: (
        <>
          Permet emmagatzemar un <Food /> per cada <em>Granja</em> adjacent
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "market",
  title: "Mercat",
  icon: MarketIcon,
  types: ["economic"],
  cost: { wood: 2 },
  capabilities: [
    new Action({
      id: "exchange-goods",
      title: "Comerciar",
      cost: { growth: "1+" },
      effect: (
        <>
          Guanyar <Gold /> per cada <Growth /> invertit, fins a un màxim d'1 per edifici <em>productiu</em> adjacent
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "bank",
  title: "Banc",
  icon: BankIcon,
  types: ["economic"],
  cost: { wood: 1, ore: 1, gold: 1 },
  capabilities: [
    unique,
    new Action({
      id: "finance",
      title: "Finançament",
      cost: { growth: 1 },
      effect: (
        <>
          Guanyar 1 <Gold /> per cada edifici <em>econòmic</em> a la ciutat
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "castle",
  title: "Castell",
  icon: CastleIcon,
  types: ["government", "military"],
  cost: { wood: 2, ore: 4 },
  capabilities: [
    unique,
    new Passive({
      id: "glory-gain-whenBuilt",
      moment: "whenBuilt",
      effect: (
        <>
          Guanyar <Glory />
        </>
      ),
    }),
    new Passive({
      id: "defense",
      effect: <>Augmenta la defensa dels exèrcits defensors a la ciutat en 2.</>,
    }),
    new Action({
      id: "rule",
      title: "Regnar",
      cost: { strife: 1 },
      effect: (
        <>
          Guanyar <Resolve />
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "barracks",
  title: "Barraques",
  icon: BarracksIcon,
  types: ["military"],
  cost: { wood: 2 },
  capabilities: [
    unique,
    new Action({
      id: "recruit",
      title: "Reclutar",
      cost: { strife: 1, ore: 1 },
      moment: "manouverStage",
      effect: (
        <>
          Retira 1 <Population />, desplega un soldat a l'edifici
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "stables",
  title: "Estables",
  icon: StablesIcon,
  types: ["military"],
  cost: { wood: 1, food: 1 },
  capabilities: [
    unique,
    new Passive({
      id: "horses",
      effect: <>Els exèrcits i colons amics que comencin el torn a la ciutat guanyen un punt de maniobra</>,
    }),
  ],
})

declareBuilding({
  id: "palace",
  title: "Palau",
  icon: PalaceIcon,
  types: ["government"],
  cost: { wood: 1, ore: 2, gold: 2 },
  capabilities: [
    unique,
    new Passive({
      id: "glory-gain-whenBuilt",
      moment: "whenBuilt",
      effect: (
        <>
          Guanyar <Glory />
        </>
      ),
    }),
    new Action({
      id: "oppulence",
      title: "Opulència",
      cost: { gold: 1 },
      effect: (
        <>
          Guanyar <Resolve />
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "warTemple",
  title: "Temple de la guerra",
  icon: WarTempleIcon,
  types: ["religious"],
  cost: { wood: 1, ore: 1, gold: 1 },
  capabilities: [
    new Action({
      id: "offer",
      title: "Ofrena",
      cost: undefined,
      effect: <>Incrementar la devoció al déu de la guerra.</>,
    }),
  ],
})

declareBuilding({
  id: "fertilityTemple",
  title: "Temple de la fertilitat",
  icon: FertilityTempleIcon,
  types: ["religious"],
  cost: { wood: 1, ore: 1, gold: 1 },
  capabilities: [
    new Action({
      id: "offer",
      title: "Ofrena",
      cost: undefined,
      effect: <>Incrementar la devoció al déu de la fertilitat.</>,
    }),
  ],
})

declareBuilding({
  id: "inspirationTemple",
  title: "Temple de la inspiració",
  icon: InspirationTempleIcon,
  types: ["religious"],
  cost: { wood: 1, ore: 1, gold: 1 },
  capabilities: [
    new Action({
      id: "offer",
      title: "Ofrena",
      cost: undefined,
      effect: <>Incrementar la devoció al déu de la inspiració.</>,
    }),
  ],
})

declareBuilding({
  id: "justiceTemple",
  title: "Temple de la justícia",
  icon: JusticeTempleIcon,
  types: ["religious"],
  cost: { wood: 1, ore: 1, gold: 1 },
  capabilities: [
    new Action({
      id: "offer",
      title: "Ofrena",
      cost: undefined,
      effect: <>Incrementar la devoció al déu de la justícia.</>,
    }),
  ],
})

declareBuilding({
  id: "darknessTemple",
  title: "Temple de la foscor",
  icon: DarknessTempleIcon,
  types: ["religious"],
  cost: { wood: 1, ore: 1, gold: 1 },
  capabilities: [
    new Action({
      id: "offer",
      title: "Ofrena",
      cost: undefined,
      effect: <>Incrementar la devoció al déu de la foscor.</>,
    }),
  ],
})

declareBuilding({
  id: "university",
  title: "Universitat",
  icon: UniversityIcon,
  types: ["academic"],
  cost: { wood: 1, ore: 2 },
  capabilities: [
    unique,
    new Action({
      id: "teaching",
      title: "Ensenyament",
      cost: { curiosity: 1 },
      effect: (
        <>
          Guanyar <Resolve />
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "mage-tower",
  title: "Torre de màgia",
  icon: MageTowerIcon,
  types: ["academic", "magic"],
  cost: { resolve: 1, wood: 1, ore: 2 },
  capabilities: [
    unique,
    new Action({
      id: "arcane-misteries",
      title: "Misteris arcans",
      cost: { anyDrive: 1 },
      effect: (
        <>
          Guanyar <Resolve />
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "monument",
  title: "Monument",
  icon: MonumentIcon,
  types: ["monumental"],
  cost: { ore: 3 },
  capabilities: [
    new Passive({
      id: "glory-gain-whenBuilt",
      moment: "whenBuilt",
      effect: (
        <>
          Guanyar <Glory />
        </>
      ),
    }),
    new Passive({
      id: "glory-gain-gameEnd",
      moment: "gameEnd",
      effect: (
        <>
          Guanyar <Glory /> si l'estàtua no està <em>danyada</em>
        </>
      ),
    }),
  ],
})

declareBuilding({
  id: "portal",
  title: "Portal",
  icon: PortalIcon,
  types: ["magic"],
  cost: { resolve: 1, ore: 2, gold: 2 },
  capabilities: [
    unique,
    new Passive({
      id: "transport",
      effect: (
        <>
          Es considera adjacent a la resta de portals (el propietaris dels portals d'origen i destí han de consentir el
          moviment).
        </>
      ),
    }),
  ],
})
