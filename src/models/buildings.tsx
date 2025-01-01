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
  WarDevotion,
  FertilityDevotion,
  JusticeDevotion,
  DarknessDevotion,
  InspirationDevotion,
} from "@/components/ResourceIcon/ResourceIcon"
import { Reference } from "@/components/Reference"

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

export const buildings = {
  cityCenter: new Building({
    id: "cityCenter",
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
            Afegir <Population /> a la ciutat
          </>
        ),
      }),
      new Action({
        id: "create-explorer",
        title: "Emigrar",
        cost: { curiosity: 1, population: 1 },
        limit: Infinity,
        effect: (
          <>
            Retirar un <Population /> de la ciutat i desplegar un explorador a l'edifici
          </>
        ),
      }),
      new Action({
        id: "build",
        title: "Construir edifici",
        moment: "constructionStage",
        cost: { growth: 1, population: "*", anyMaterial: "*" },
        limit: Infinity,
        effect: <>Construir un edifici a la ciutat, pagant el seu cost</>,
      }),
    ],
  }),
  housing: new Building({
    id: "housing",
    title: "Allotjaments",
    icon: HousingIcon,
    types: ["housing"],
    cost: { population: 1, wood: 2 },
    capabilities: [
      new Passive({
        id: "increase-max-population",
        effect: <>Augmentar el límit de població en 2.</>,
      }),
    ],
  }),
  farm: new Building({
    id: "farm",
    title: "Granja",
    icon: FarmIcon,
    types: ["production"],
    cost: { population: 1, wood: 2 },
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
  }),
  sawmill: new Building({
    id: "sawmill",
    title: "Serradora",
    icon: SawmillIcon,
    types: ["production"],
    cost: { population: 1, wood: 1, ore: 1 },
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
  }),
  mine: new Building({
    id: "mine",
    title: "Mina",
    icon: MineIcon,
    types: ["production"],
    cost: { population: 1, wood: 1, ore: 1 },
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
  }),
  harbour: new Building({
    id: "harbour",
    title: "Port",
    icon: HarbourIcon,
    types: ["production"],
    cost: { population: 1, wood: 2, ore: 1 },
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
        moment: "recruitingSoldiers",
        cost: { population: 1, curiosity: 1, wood: 2 },
        effect: (
          <>
            Retirar un <Population /> de la ciutat i desplegar un vaixell a un mar adjacent
          </>
        ),
      }),
    ],
  }),
  workshop: new Building({
    id: "workshop",
    title: "Taller",
    icon: WorkshopIcon,
    types: ["production"],
    cost: { population: 1, wood: 1, ore: 1 },
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
  }),
  storage: new Building({
    id: "storage",
    title: "Magatzem",
    icon: StorageIcon,
    types: ["storage", "economic"],
    cost: { population: 1, wood: 2 },
    capabilities: [
      new Passive({
        id: "store-materials",
        moment: "turnEnd",
        effect: (
          <>
            Permet emmagatzemar un <Wood /> o <Ore /> per cada <Reference item={() => buildings.sawmill} /> o{" "}
            <Reference item={() => buildings.mine} /> adjacents, respectivament
          </>
        ),
      }),
    ],
  }),
  granary: new Building({
    id: "granary",
    title: "Graner",
    icon: GranaryIcon,
    types: ["storage", "economic"],
    cost: { population: 1, wood: 2 },
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
  }),
  market: new Building({
    id: "market",
    title: "Mercat",
    icon: MarketIcon,
    types: ["economic"],
    cost: { population: 1, wood: 2 },
    capabilities: [
      new Action({
        id: "exchange-goods",
        title: "Comerciar",
        cost: { growth: 1, anyMaterial: "1+" },
        effect: (
          <>
            <p>
              Convertir <Food />, <Wood /> i/o <Ore /> en <Gold />, a raó d'un <Gold /> per cada recurs.
            </p>
            <p>
              La quantitat màxima de cada recurs depèn del nombre d'edificis adjacents del tipus indicat:
              <Reference item={() => buildings.farm} /> o
              <Reference item={() => buildings.harbour} /> per <Food />,
              <Reference item={() => buildings.sawmill} /> per <Wood />,
              <Reference item={() => buildings.mine} /> per <Ore />.
            </p>
          </>
        ),
      }),
    ],
  }),
  bank: new Building({
    id: "bank",
    title: "Banc",
    icon: BankIcon,
    types: ["economic"],
    cost: { population: 1, wood: 1, ore: 1, gold: 1 },
    capabilities: [
      unique,
      new Passive({
        id: "vault",
        title: "Estalvi",
        moment: "turnEnd",
        effect: (
          <>
            Permet emmagatzemar un <Gold /> per cada edifici <em>econòmic</em> a la ciutat
          </>
        ),
      }),
      new Passive({
        id: "finance",
        title: "Interessos",
        moment: "turnStart",
        effect: (
          <>
            Si el banc conté 1+ <Gold /> emmagatzemat, guanyar un <Gold /> adicional
          </>
        ),
      }),
    ],
  }),
  castle: new Building({
    id: "castle",
    title: "Castell",
    icon: CastleIcon,
    types: ["government", "military"],
    cost: { population: 2, wood: 2, ore: 4 },
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
  }),
  barracks: new Building({
    id: "barracks",
    title: "Barraques",
    icon: BarracksIcon,
    types: ["military"],
    cost: { population: 1, wood: 2 },
    capabilities: [
      unique,
      new Action({
        id: "recruit",
        title: "Reclutar",
        cost: { strife: 1, ore: 1 },
        moment: "manouverStage",
        effect: (
          <>
            Retirar 1 <Population />, desplegar un soldat a l'edifici
          </>
        ),
      }),
    ],
  }),
  stables: new Building({
    id: "stables",
    title: "Estables",
    icon: StablesIcon,
    types: ["military"],
    cost: { population: 1, wood: 1, food: 1 },
    capabilities: [
      unique,
      new Passive({
        id: "horses",
        effect: <>Els exèrcits i exploradors amics que comencin el torn a la ciutat guanyen un punt de maniobra</>,
      }),
    ],
  }),
  palace: new Building({
    id: "palace",
    title: "Palau",
    icon: PalaceIcon,
    types: ["government"],
    cost: { population: 2, wood: 1, ore: 2, gold: 2 },
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
  }),
  warTemple: new Building({
    id: "warTemple",
    title: "Temple de la guerra",
    icon: WarTempleIcon,
    types: ["religious"],
    cost: { population: 2, wood: 1, ore: 1, gold: 1 },
    capabilities: [
      new Action({
        id: "offer",
        title: "Ofrena",
        cost: { strife: 1 },
        effect: (
          <>
            Guanyar <WarDevotion />
          </>
        ),
      }),
    ],
  }),
  fertilityTemple: new Building({
    id: "fertilityTemple",
    title: "Temple de la fertilitat",
    icon: FertilityTempleIcon,
    types: ["religious"],
    cost: { population: 2, wood: 1, ore: 1, gold: 1 },
    capabilities: [
      new Action({
        id: "offer",
        title: "Ofrena",
        cost: { growth: 1 },
        effect: (
          <>
            Guanyar <FertilityDevotion />
          </>
        ),
      }),
    ],
  }),
  inspirationTemple: new Building({
    id: "inspirationTemple",
    title: "Temple de la inspiració",
    icon: InspirationTempleIcon,
    types: ["religious"],
    cost: { population: 2, wood: 1, ore: 1, gold: 1 },
    capabilities: [
      new Action({
        id: "offer",
        title: "Ofrena",
        cost: { curiosity: 1 },
        effect: (
          <>
            Guanyar <InspirationDevotion />
          </>
        ),
      }),
    ],
  }),
  justiceTemple: new Building({
    id: "justiceTemple",
    title: "Temple de la justícia",
    icon: JusticeTempleIcon,
    types: ["religious"],
    cost: { population: 2, wood: 1, ore: 1, gold: 1 },
    capabilities: [
      new Action({
        id: "offer",
        title: "Ofrena",
        cost: { effort: 1 },
        effect: (
          <>
            Guanyar <JusticeDevotion />
          </>
        ),
      }),
    ],
  }),
  darknessTemple: new Building({
    id: "darknessTemple",
    title: "Temple de la foscor",
    icon: DarknessTempleIcon,
    types: ["religious"],
    cost: { population: 2, wood: 1, ore: 1, gold: 1 },
    capabilities: [
      new Action({
        id: "offer",
        title: "Ofrena",
        cost: { population: 1 },
        effect: (
          <>
            Guanyar <DarknessDevotion />
          </>
        ),
      }),
    ],
  }),
  university: new Building({
    id: "university",
    title: "Universitat",
    icon: UniversityIcon,
    types: ["academic"],
    cost: { population: 2, wood: 1, ore: 2 },
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
  }),
  mageTower: new Building({
    id: "mageTower",
    title: "Torre de màgia",
    icon: MageTowerIcon,
    types: ["academic", "magic"],
    cost: { population: 2, resolve: 1, wood: 1, ore: 2 },
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
  }),
  monument: new Building({
    id: "monument",
    title: "Monument",
    icon: MonumentIcon,
    types: ["monumental"],
    cost: { population: 2, ore: 3 },
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
            Guanyar <Glory /> si no està <em>danyat</em>
          </>
        ),
      }),
    ],
  }),
  portal: new Building({
    id: "portal",
    title: "Portal",
    icon: PortalIcon,
    types: ["magic"],
    cost: { population: 1, resolve: 1, ore: 2, gold: 2 },
    capabilities: [
      unique,
      new Passive({
        id: "transport",
        effect: (
          <>
            Es considera adjacent a la resta de portals (el propietaris dels portals d'origen i destí han de consentir
            el moviment).
          </>
        ),
      }),
    ],
  }),
}
