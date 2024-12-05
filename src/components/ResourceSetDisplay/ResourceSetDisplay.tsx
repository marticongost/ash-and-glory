import { resources, ResourceSet } from "@/models/resources"
import styles from "./ResourceSetDisplay.module.scss"
import { createElement } from "react"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import NoneIcon from "@/svg/none.svg"
import VariableIcon from "@/svg/variable.svg"

export interface ResourceSetDisplayProps extends StandardComponentProps {
  resourceSet?: ResourceSet
  arrangement?: "row" | "column"
  background?: "day" | "night"
}

export const ResourceSetDisplay = ({
  resourceSet,
  arrangement = "row",
  background = "day",
  ...baseProps
}: ResourceSetDisplayProps) => (
  <div
    {...getStandardAttributes(baseProps, styles.ResourceSetDisplay)}
    data-arrangement={arrangement}
    data-background={background}
  >
    {resourceSet === undefined ? (
      <VariableIcon className={styles.variableIcon} />
    ) : resourceSet.isNone() ? (
      <NoneIcon className={styles.noneIcon} />
    ) : (
      Object.values(resources).map((resource) => {
        const amount = resourceSet[resource.id]
        if (!amount) return null
        return (
          <div className={styles.resource} data-resource={resource.id}>
            {createElement(resource.icon, { className: styles.icon })}
            <div className={styles.amount}>{amount}</div>
          </div>
        )
      })
    )}
  </div>
)
