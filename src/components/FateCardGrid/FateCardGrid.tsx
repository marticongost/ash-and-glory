import { Boon, boons, type Fate } from "@/models/fate"
import styles from "./FateCardGrid.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { BoonCard } from "../BoonCard"

export interface FateCardGridProps extends StandardComponentProps {
  fates: Fate[]
}

export const FateCardGrid = ({ fates, ...baseProps }: FateCardGridProps) => (
  <div {...getStandardAttributes(baseProps, styles.FateCardGrid)}>
    {fates.map((fate) => {
      if (fate instanceof Boon) {
        return <BoonCard key={fate.id} boon={fate} />
      }
      return null
    })}
  </div>
)
