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
import PopulationIcon from "@/svg/population.svg"
import GloryIcon from "@/svg/glory.svg"

export type DriveId = "anyDrive" | "effort" | "growth" | "curiosity" | "strife" | "resolve"
export type MaterialId = "anyMaterial" | "gold" | "wood" | "ore" | "food"
export type ResourceId = DriveId | MaterialId | "population" | "glory"

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

export type GloryProps = Omit<ResourceProps, "id">

export class Glory extends Resource {
  constructor(props: GloryProps) {
    super({ id: "glory", ...props })
  }
}

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

export const population = new Population({ title: "Població", icon: PopulationIcon })
export const glory = new Glory({ title: "Glòria", icon: GloryIcon })
export const resources: Record<ResourceId, Resource> = Object.assign({ population, glory }, materials, drives)

export type ResourceAmount = number | `${number}+` | "*"

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
  readonly glory: ResourceAmount

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
    this.glory = cost.glory ?? 0
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
      !this.glory
    )
  }
}
