import { groupBy, recordToList, sortBy } from "@/modules/utils"
import styles from "./CapabilityList.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { BuildingEnhancement, Capability, Limitation } from "@/models/capabilities"
import { CapabilityDisplay } from "../CapabilityDisplay"
import { moments } from "@/models/moments"

export interface CapabilityListProps extends StandardComponentProps {
  capabilities: Capability[]
}

export const CapabilityList = ({ capabilities, ...baseProps }: CapabilityListProps) => {
  return (
    <div {...getStandardAttributes(baseProps, styles.CapabilityList)}>
      {capabilities.map((capability) => (
        <CapabilityDisplay key={capability.id} className={styles.capability} capability={capability} />
      ))}
    </div>
  )
}
