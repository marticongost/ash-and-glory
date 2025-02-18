import type { JSXElementConstructor } from "react"
import AnyMaterialIcon from "@/svg/resources/any-material.svg"
import GoldIcon from "@/svg/resources/gold.svg"
import WoodIcon from "@/svg/resources/wood.svg"
import OreIcon from "@/svg/resources/ore.svg"
import FoodIcon from "@/svg/resources/food.svg"
import AnyDriveIcon from "@/svg/drives/any-drive.svg"
import EffortIcon from "@/svg/drives/effort.svg"
import GrowthIcon from "@/svg/drives/growth.svg"
import CuriosityIcon from "@/svg/drives/curiosity.svg"
import StrifeIcon from "@/svg/drives/strife.svg"
import ResolveIcon from "@/svg/drives/resolve.svg"
import WarDevotionIcon from "@/svg/deities/war.svg"
import FertilityDevotionIcon from "@/svg/deities/fertility.svg"
import InspirationDevotionIcon from "@/svg/deities/inspiration.svg"
import JusticeDevotionIcon from "@/svg/deities/justice.svg"
import DarknessDevotionIcon from "@/svg/deities/darkness.svg"
import PopulationIcon from "@/svg/population.svg"
import PopulationLossIcon from "@/svg/population-loss.svg"
import GloryIcon from "@/svg/glory.svg"
import { terrainTypes, type TerrainTypeId } from "./terrain"
import { mapRecord, mapRecordValues } from "@/modules/utils"

export type DriveId = "anyDrive" | "effort" | "growth" | "curiosity" | "strife" | "resolve"
export type MaterialId = "anyMaterial" | "gold" | "wood" | "ore" | "food"
export type DevotionId =
  | "warDevotion"
  | "fertilityDevotion"
  | "inspirationDevotion"
  | "justiceDevotion"
  | "darknessDevotion"
export type TerrainHexId = `${TerrainTypeId}Hex`
export type ResourceId = DriveId | MaterialId | DevotionId | TerrainHexId | "population" | "populationLoss" | "glory"

export interface ResourceProps {
  id: ResourceId
  title: string
  icon: JSXElementConstructor<any>
}

export abstract class Resource {
  readonly id: ResourceId
  readonly title: string
  readonly icon: JSXElementConstructor<any>

  constructor({ id, title, icon }: ResourceProps) {
    this.id = id
    this.title = title
    this.icon = icon
  }
}

export interface DriveProps extends ResourceProps {
  id: DriveId
}

export class Drive extends Resource {
  constructor(props: DriveProps) {
    super(props)
  }
}

export interface MaterialProps extends ResourceProps {
  id: MaterialId
}

export class Material extends Resource {
  constructor(props: MaterialProps) {
    super(props)
  }
}

export type PopulationProps = Omit<ResourceProps, "id">

export class Population extends Resource {
  constructor(props: PopulationProps) {
    super({ id: "population", ...props })
  }
}

export type PopulationLossProps = Omit<ResourceProps, "id">

export class PopulationLoss extends Resource {
  constructor(props: PopulationProps) {
    super({ id: "populationLoss", ...props })
  }
}

export type GloryProps = Omit<ResourceProps, "id">

export class Glory extends Resource {
  constructor(props: GloryProps) {
    super({ id: "glory", ...props })
  }
}

export class Devotion extends Resource {}

export class TerrainHex extends Resource {}

export const materials: Record<MaterialId, Material> = {
  anyMaterial: new Material({ id: "anyMaterial", title: "Qualsevol material", icon: AnyMaterialIcon }),
  gold: new Material({ id: "gold", title: "Or", icon: GoldIcon }),
  wood: new Material({ id: "wood", title: "Or", icon: WoodIcon }),
  ore: new Material({ id: "ore", title: "Or", icon: OreIcon }),
  food: new Material({ id: "food", title: "Or", icon: FoodIcon }),
}

export const drives: Record<DriveId, Drive> = {
  anyDrive: new Drive({ id: "anyDrive", title: "Qualsevol impuls", icon: AnyDriveIcon }),
  effort: new Drive({ id: "effort", title: "Esforç", icon: EffortIcon }),
  growth: new Drive({ id: "growth", title: "Esforç", icon: GrowthIcon }),
  curiosity: new Drive({ id: "curiosity", title: "Esforç", icon: CuriosityIcon }),
  strife: new Drive({ id: "strife", title: "Esforç", icon: StrifeIcon }),
  resolve: new Drive({ id: "resolve", title: "Esforç", icon: ResolveIcon }),
}

export const devotion: Record<DevotionId, Devotion> = {
  warDevotion: new Devotion({ id: "warDevotion", title: "Devoció al déu de la guerra", icon: WarDevotionIcon }),
  fertilityDevotion: new Devotion({
    id: "fertilityDevotion",
    title: "Devoció al déu de la fertilitat",
    icon: FertilityDevotionIcon,
  }),
  inspirationDevotion: new Devotion({
    id: "inspirationDevotion",
    title: "Devoció al déu de la inspiració",
    icon: InspirationDevotionIcon,
  }),
  justiceDevotion: new Devotion({
    id: "justiceDevotion",
    title: "Devoció al déu de la justícia",
    icon: JusticeDevotionIcon,
  }),
  darknessDevotion: new Devotion({
    id: "darknessDevotion",
    title: "Devoció al déu de la foscor",
    icon: DarknessDevotionIcon,
  }),
}

export const terrainHex = mapRecord(terrainTypes, (_, terrainType) => {
  const id = `${terrainType.id}Hex` as TerrainHexId
  return [
    id,
    new TerrainHex({
      id,
      title: terrainType.title,
      icon: terrainType.resourceIcon,
    }),
  ]
}) as unknown as Record<TerrainHexId, TerrainHex>

export const population = new Population({ title: "Mobilitzar treballadors", icon: PopulationIcon })
export const populationLoss = new PopulationLoss({ title: "Reduïr població", icon: PopulationLossIcon })
export const glory = new Glory({ title: "Glòria", icon: GloryIcon })
export const resources: Record<ResourceId, Resource> = Object.assign(
  {},
  drives,
  { population, populationLoss },
  terrainHex,
  materials,
  { glory },
  devotion,
)

export type ResourceAmount = number | `${number}+` | "*" | "X" | `${number}X`

export type ResourceSetProps = Partial<Record<ResourceId, ResourceAmount>>

export class ResourceSet implements ResourceSetProps {
  readonly anyMaterial: ResourceAmount
  readonly gold: ResourceAmount
  readonly wood: ResourceAmount
  readonly ore: ResourceAmount
  readonly food: ResourceAmount
  readonly anyDrive: ResourceAmount
  readonly effort: ResourceAmount
  readonly growth: ResourceAmount
  readonly curiosity: ResourceAmount
  readonly strife: ResourceAmount
  readonly resolve: ResourceAmount
  readonly population: ResourceAmount
  readonly populationLoss: ResourceAmount
  readonly glory: ResourceAmount
  readonly warDevotion: ResourceAmount
  readonly fertilityDevotion: ResourceAmount
  readonly inspirationDevotion: ResourceAmount
  readonly justiceDevotion: ResourceAmount
  readonly darknessDevotion: ResourceAmount
  readonly grasslandHex: ResourceAmount
  readonly mountainHex: ResourceAmount
  readonly forestHex: ResourceAmount
  readonly seaHex: ResourceAmount
  readonly wastelandHex: ResourceAmount

  constructor(cost: ResourceSetProps) {
    this.anyMaterial = cost.anyMaterial ?? 0
    this.gold = cost.gold ?? 0
    this.wood = cost.wood ?? 0
    this.ore = cost.ore ?? 0
    this.food = cost.food ?? 0
    this.anyDrive = cost.anyDrive ?? 0
    this.effort = cost.effort ?? 0
    this.growth = cost.growth ?? 0
    this.curiosity = cost.curiosity ?? 0
    this.strife = cost.strife ?? 0
    this.resolve = cost.resolve ?? 0
    this.population = cost.population ?? 0
    this.populationLoss = cost.populationLoss ?? 0
    this.glory = cost.glory ?? 0
    this.warDevotion = cost.warDevotion ?? 0
    this.fertilityDevotion = cost.fertilityDevotion ?? 0
    this.inspirationDevotion = cost.inspirationDevotion ?? 0
    this.justiceDevotion = cost.justiceDevotion ?? 0
    this.darknessDevotion = cost.darknessDevotion ?? 0
    this.grasslandHex = cost.grasslandHex ?? 0
    this.mountainHex = cost.mountainHex ?? 0
    this.forestHex = cost.forestHex ?? 0
    this.seaHex = cost.seaHex ?? 0
    this.wastelandHex = cost.wastelandHex ?? 0
  }

  isNone(): boolean {
    return (
      !this.anyMaterial &&
      !this.gold &&
      !this.wood &&
      !this.ore &&
      !this.food &&
      !this.anyDrive &&
      !this.effort &&
      !this.growth &&
      !this.curiosity &&
      !this.strife &&
      !this.resolve &&
      !this.population &&
      !this.populationLoss &&
      !this.glory &&
      !this.warDevotion &&
      !this.fertilityDevotion &&
      !this.inspirationDevotion &&
      !this.justiceDevotion &&
      !this.darknessDevotion &&
      !this.grasslandHex &&
      !this.mountainHex &&
      !this.forestHex &&
      !this.seaHex &&
      !this.wastelandHex
    )
  }
}
