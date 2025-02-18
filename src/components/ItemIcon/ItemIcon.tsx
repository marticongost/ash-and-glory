import styles from "./ItemIcon.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { createElement, type JSXElementConstructor } from "react"
import { repeat } from "@/modules/utils"
import { resources } from "@/models/resources"
import { unitTypes } from "@/models/units"

interface Item {
  id: string
  icon: JSXElementConstructor<any>
}

export interface ResourceIconProps extends StandardComponentProps {
  item: Item
  amount?: number
}

export const ItemIcon = ({ item, amount = 1, ...baseProps }: ResourceIconProps) =>
  repeat(amount, (n) =>
    createElement(item.icon, {
      ...getStandardAttributes(baseProps, styles.ItemIcon),
      key: n,
      "data-type": item.id,
    }),
  )

type ResourceIconWrapperProps = Omit<ResourceIconProps, "item">

export const AnyMaterial = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.anyMaterial} />
export const Gold = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.gold} />
export const Wood = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.wood} />
export const Ore = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.ore} />
export const Food = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.food} />
export const AnyDrive = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.anyDrive} />
export const Strife = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.strife} />
export const Effort = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.effort} />
export const Growth = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.growth} />
export const Curiosity = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.curiosity} />
export const Resolve = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.resolve} />
export const Population = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.population} />
export const PopulationLoss = (props: ResourceIconWrapperProps) => (
  <ItemIcon {...props} item={resources.populationLoss} />
)
export const Glory = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.glory} />
export const WarDevotion = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.warDevotion} />
export const FertilityDevotion = (props: ResourceIconWrapperProps) => (
  <ItemIcon {...props} item={resources.fertilityDevotion} />
)
export const InspirationDevotion = (props: ResourceIconWrapperProps) => (
  <ItemIcon {...props} item={resources.inspirationDevotion} />
)
export const JusticeDevotion = (props: ResourceIconWrapperProps) => (
  <ItemIcon {...props} item={resources.justiceDevotion} />
)
export const DarknessDevotion = (props: ResourceIconWrapperProps) => (
  <ItemIcon {...props} item={resources.darknessDevotion} />
)
export const GrasslandHex = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.grasslandHex} />
export const ForestHex = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.forestHex} />
export const MountainHex = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.mountainHex} />
export const SeaHex = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.seaHex} />
export const WastelandHex = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={resources.wastelandHex} />
export const Militia = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={unitTypes.militia} />
export const Explorer = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={unitTypes.explorer} />
export const Archers = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={unitTypes.archers} />
export const Infantry = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={unitTypes.infantry} />
export const Cavalry = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={unitTypes.cavalry} />
export const Ship = (props: ResourceIconWrapperProps) => <ItemIcon {...props} item={unitTypes.ship} />
