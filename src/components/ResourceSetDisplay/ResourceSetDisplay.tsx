import { resources, ResourceSet } from "@/models/resources"
import styles from "./ResourceSetDisplay.module.scss"
import { createElement } from "react"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface ResourceSetDisplayProps extends StandardComponentProps {
  resourceSet: ResourceSet
  arrangement?: "vertical" | "horizontal"
}

export const ResourceSetDisplay = ({
  resourceSet,
  arrangement = "horizontal",
  ...baseProps
}: ResourceSetDisplayProps) => (
  <div {...getStandardAttributes(baseProps, styles.ResourceSetDisplay)} data-arrangement={arrangement}>
    {Object.values(resources).map((resource) => {
      const amount = resourceSet[resource.id]
      if (!amount) return null
      return (
        <div className={styles.resource} data-resource={resource.id}>
          {createElement(resource.icon, { className: styles.icon })}
          <div className={styles.amount}>{amount}</div>
        </div>
      )
    })}
  </div>
)
