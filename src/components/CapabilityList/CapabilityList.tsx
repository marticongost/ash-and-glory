import { groupBy, recordToList } from "@/modules/utils"
import styles from "./CapabilityList.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { BuildingEnhancement, Capability, Limitation } from "@/models/capabilities"
import { CapabilityDisplay } from "../CapabilityDisplay"
import { moments } from "@/models/moments"

export interface CapabilityListProps extends StandardComponentProps {
  capabilities: Capability[]
}

export const CapabilityList = ({ capabilities, ...baseProps }: CapabilityListProps) => {
  const timelessCapabilities: Capability[] = []
  const timeBoundCapabilities: Capability[] = []
  for (const capability of capabilities) {
    ;(capability instanceof BuildingEnhancement || capability instanceof Limitation
      ? timelessCapabilities
      : timeBoundCapabilities
    ).push(capability)
  }
  const capabilitiesByMoment = groupBy(timeBoundCapabilities, (capability) => capability.moment.id)
  return (
    <div {...getStandardAttributes(baseProps, styles.CapabilityList)}>
      {timelessCapabilities.map((capability) => (
        <CapabilityDisplay capability={capability} />
      ))}
      {recordToList(capabilitiesByMoment, (momentId, momentCapabilities) => {
        const moment = moments[momentId]
        return (
          <div className={styles.moment}>
            <div className={styles.momentTitle}>{moment.title}</div>
            <div className={styles.momentCapabilities}>
              {momentCapabilities.map((capability) => (
                <CapabilityDisplay key={capability.id} capability={capability} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
