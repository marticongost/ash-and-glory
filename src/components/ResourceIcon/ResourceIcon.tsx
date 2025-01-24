import { resources, type ResourceId } from "@/models/resources"
import styles from "./ResourceIcon.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { createElement } from "react"
import { repeat } from "@/modules/utils"

export interface ResourceIconProps extends StandardComponentProps {
  type: ResourceId
  amount?: number
}

export const ResourceIcon = ({ type, amount = 1, ...baseProps }: ResourceIconProps) =>
  repeat(amount, (n) =>
    createElement(resources[type].icon, {
      ...getStandardAttributes(baseProps, styles.ResourceIcon),
      key: n,
      "data-resource": type,
    }),
  )

type ResourceIconWrapperProps = Omit<ResourceIconProps, "type">

export const AnyMaterial = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="anyMaterial" />
export const Gold = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="gold" />
export const Wood = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="wood" />
export const Ore = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="ore" />
export const Food = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="food" />
export const AnyDrive = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="anyDrive" />
export const Strife = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="strife" />
export const Effort = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="effort" />
export const Growth = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="growth" />
export const Curiosity = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="curiosity" />
export const Resolve = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="resolve" />
export const Population = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="population" />
export const PopulationLoss = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="populationLoss" />
export const Glory = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="glory" />
export const WarDevotion = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="warDevotion" />
export const FertilityDevotion = (props: ResourceIconWrapperProps) => (
  <ResourceIcon {...props} type="fertilityDevotion" />
)
export const InspirationDevotion = (props: ResourceIconWrapperProps) => (
  <ResourceIcon {...props} type="inspirationDevotion" />
)
export const JusticeDevotion = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="justiceDevotion" />
export const DarknessDevotion = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="darknessDevotion" />
export const GrasslandHex = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="grasslandHex" />
export const ForestHex = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="forestHex" />
export const MountainHex = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="mountainHex" />
export const SeaHex = (props: ResourceIconWrapperProps) => <ResourceIcon {...props} type="seaHex" />
