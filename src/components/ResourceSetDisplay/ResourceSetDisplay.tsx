import { resources, ResourceSet } from "@/models/resources"
import styles from "./ResourceSetDisplay.module.scss"
import { createElement } from "react"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { repeat } from "@/modules/utils"

export interface ResourceSetDisplayProps extends StandardComponentProps {
  resourceSet?: ResourceSet
  arrangement?: "row" | "column" | "multi-column" | "inline" | "flat"
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
    {resourceSet === undefined
      ? "Variable"
      : Object.values(resources).map((resource) => {
          const amount = resourceSet[resource.id]
          if (!amount) return null
          return (
            <div className={styles.resource} data-type={resource.id} key={resource.id}>
              {typeof amount === "number" && arrangement !== "multi-column" ? (
                repeat(amount, (i) => createElement(resource.icon, { key: i, className: styles.icon }))
              ) : (
                <>
                  {createElement(resource.icon, { className: styles.icon })}
                  <div className={styles.amount}>{amount}</div>
                </>
              )}
            </div>
          )
        })}
  </div>
)
