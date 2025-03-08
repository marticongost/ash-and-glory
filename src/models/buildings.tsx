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
  Glory,
  Resolve,
  WarDevotion,
  FertilityDevotion,
  JusticeDevotion,
  DarknessDevotion,
  InspirationDevotion,
  GrasslandHex,
  ForestHex,
  MountainHex,
  SeaHex,
  Ship,
  Infantry,
  Archers,
  Explorer,
  Militia,
  Cavalry,
} from "@/components/ItemIcon/ItemIcon"
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
  shortTitle?: string
  icon: JSXElementConstructor<any>
  types: Array<BuildingTypeId | BuildingType>
  capabilities: Capability[]
  cost: ResourceSet | ResourceSetProps
}

export class Building {
  readonly id: string
  readonly title: string
  readonly shortTitle: string
  readonly icon: JSXElementConstructor<any>
  readonly types: BuildingType[]
  readonly cost: ResourceSet
  readonly capabilities: Capability[]

  constructor({ id, title, shortTitle, icon, types, cost, capabilities }: BuildingProps) {
    this.id = id
    this.title = title
    this.shortTitle = shortTitle || title
    this.icon = icon
    this.types = types.map((type) => (type instanceof BuildingType ? type : buildingTypes[type]))
    this.cost = instantiate(cost, ResourceSet)
    this.capabilities = capabilities
  }

  getCapability(id: string): Capability {
    const capability = this.capabilities.find((capability) => capability.id === id)
    if (!capability) {
      throw new Error(`Capability ${id} not found in building ${this.id}`)
    }
    return capability
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
        effect: <>Mida màxima 6</>,
      }),
      new Action({
        id: "increase-population",
        title: "Augmentar la població",
        cost: { food: "X" },
        effect: (
          <>
            Afegir X <Population /> a la ciutat
          </>
        ),
      }),
      new Action({
        id: "create-explorer",
        title: "Emigrar",
        cost: { curiosity: 1, populationLoss: "X" },
        effect: (
          <>
            Desplegar X <Explorer />
          </>
        ),
      }),
      new Action({
        id: "recruit-militia",
        title: "Lleva",
        cost: { strife: 1, populationLoss: "X" },
        effect: (
          <>
            Desplegar X <Militia />
          </>
        ),
      }),
      new Action({
        id: "build",
        title: "Construir edifici",
        cost: undefined,
        effect: <>Construir edificis a la ciutat</>,
      }),
    ],
  }),
  housing: new Building({
    id: "housing",
    title: "Allotjaments",
    icon: HousingIcon,
    types: ["housing"],
    cost: { growth: 1, population: 1, wood: 2 },
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
    cost: { growth: 1, population: 1, wood: 2 },
    capabilities: [
      new Limitation({
        id: "location-requirement",
        effect: (
          <>
            Ha d'estar en contacte amb 1+ <GrasslandHex />
          </>
        ),
      }),
      new Action({
        id: "produce-food",
        title: "Produir menjar",
        timing: "instant",
        cost: { growth: 1, population: "X", grasslandHex: "X" },
        effect: (
          <>
            Guanyar X <Food />
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
    cost: { growth: 1, population: 1, wood: 1, ore: 1 },
    capabilities: [
      new Limitation({
        id: "location-requirement",
        effect: (
          <>
            Ha d'estar en contacte amb 1+ <ForestHex />
          </>
        ),
      }),
      new Action({
        id: "produce-wood",
        title: "Produir fusta",
        timing: "instant",
        cost: { effort: 1, population: "X", forestHex: "X" },
        effect: (
          <>
            Guanyar X <Wood />
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
    cost: { growth: 1, population: 1, wood: 1, ore: 1 },
    capabilities: [
      new Limitation({
        id: "location-requirement",
        effect: (
          <>
            Ha d'estar en contacte amb 1+ <MountainHex />
          </>
        ),
      }),
      new Action({
        id: "produce-ore",
        title: "Produir mineral",
        timing: "instant",
        cost: { effort: 1, population: "X", mountainHex: "X" },
        effect: (
          <>
            Guanyar X <Ore />
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
    cost: { growth: 1, population: 1, wood: 2, ore: 1 },
    capabilities: [
      new Limitation({
        id: "location-requirement",
        effect: (
          <>
            Ha d'estar en contacte amb 1+ <SeaHex />
          </>
        ),
      }),
      new Action({
        id: "fish",
        title: "Pescar",
        timing: "instant",
        cost: { effort: 1, population: "X", seaHex: "X" },
        effect: (
          <>
            Guanyar X <Food />
          </>
        ),
      }),
      new Action({
        id: "build-ship",
        title: "Construir vaixell",
        cost: { populationLoss: 1, curiosity: 1, wood: 2 },
        effect: (
          <>
            Desplegar <Ship /> a un mar adjacent
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
    cost: { growth: 1, population: 1, wood: 1, ore: 1 },
    capabilities: [
      new Action({
        id: "fish",
        title: "Manufacturar productes",
        timing: "instant",
        cost: { effort: 1, population: "X", anyMaterial: "X" },
        effect: (
          <>
            Guanyar <Gold amount={2} /> per cada X
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
    cost: { growth: 1, population: 1, wood: 2 },
    capabilities: [
      new Passive({
        id: "store-materials",
        moment: "chapterEnd",
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
    cost: { growth: 1, population: 1, wood: 2 },
    capabilities: [
      new Passive({
        id: "store-materials",
        moment: "chapterEnd",
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
    cost: { growth: 1, population: 1, wood: 2 },
    capabilities: [
      new Action({
        id: "exchange-goods",
        title: "Comerciar",
        timing: "instant",
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
    cost: { growth: 1, population: 1, wood: 1, ore: 1, gold: 1 },
    capabilities: [
      unique,
      new Passive({
        id: "vault",
        title: "Estalvi",
        moment: "chapterEnd",
        effect: (
          <>
            Permet emmagatzemar un <Gold /> per cada edifici <em>econòmic</em> a la ciutat
          </>
        ),
      }),
      new Passive({
        id: "finance",
        title: "Interessos",
        moment: "chapterStart",
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
    cost: { strife: 1, population: 2, wood: 2, ore: 4 },
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
        timing: "instant",
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
    cost: { strife: 1, population: 1, wood: 2 },
    capabilities: [
      unique,
      new Action({
        id: "recruit",
        title: "Reclutar",
        cost: { strife: 1, ore: 1, populationLoss: 1 },
        effect: (
          <>
            Desplegar <Infantry /> o <Archers /> a l'edifici
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
    cost: { strife: 1, population: 1, wood: 1, food: 1 },
    capabilities: [
      unique,
      new Passive({
        id: "horses",
        effect: <>Els exèrcits i exploradors amics que comencin el capítol a la ciutat guanyen un punt de maniobra</>,
      }),
      new Action({
        id: "recruit",
        title: "Reclutar",
        cost: { strife: 1, ore: 2, gold: 1, populationLoss: 1 },
        effect: (
          <>
            Desplegar <Cavalry /> a l'edifici
          </>
        ),
      }),
    ],
  }),
  palace: new Building({
    id: "palace",
    title: "Palau",
    icon: PalaceIcon,
    types: ["government"],
    cost: { growth: 1, population: 2, wood: 1, ore: 2, gold: 2 },
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
        timing: "instant",
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
    title: "Temple: guerra",
    icon: WarTempleIcon,
    types: ["religious"],
    cost: { strife: 1, population: 2, wood: 1, ore: 1, gold: 1 },
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
    title: "Temple: fertilitat",
    icon: FertilityTempleIcon,
    types: ["religious"],
    cost: { growth: 1, population: 2, wood: 1, ore: 1, gold: 1 },
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
    title: "Temple: enginy",
    icon: InspirationTempleIcon,
    types: ["religious"],
    cost: { curiosity: 1, population: 2, wood: 1, ore: 1, gold: 1 },
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
    title: "Temple: justícia",
    icon: JusticeTempleIcon,
    types: ["religious"],
    cost: { effort: 1, population: 2, wood: 1, ore: 1, gold: 1 },
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
    title: "Temple: foscor",
    icon: DarknessTempleIcon,
    types: ["religious"],
    cost: { anyDrive: 1, population: 2, wood: 1, ore: 1, gold: 1 },
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
    cost: { curiosity: 1, population: 2, wood: 1, ore: 2 },
    capabilities: [
      unique,
      new Action({
        id: "teaching",
        title: "Ensenyament",
        timing: "instant",
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
    shortTitle: "T. de màgia",
    icon: MageTowerIcon,
    types: ["academic", "magic"],
    cost: { population: 2, resolve: 1, wood: 1, ore: 2 },
    capabilities: [
      unique,
      new Action({
        id: "arcane-misteries",
        title: "Misteris arcans",
        timing: "instant",
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
    cost: { resolve: 1, population: 2, ore: 3 },
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
