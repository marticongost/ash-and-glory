import { type Focus } from "@/models/focus"
import styles from "./FocusCardGrid.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { FocusCard } from "../FocusCard"

export interface FocusCardGridProps extends StandardComponentProps {
  focuses: Focus[]
}

export const FocusCardGrid = ({ focuses, ...baseProps }: FocusCardGridProps) => (
  <div {...getStandardAttributes(baseProps, styles.FocusCardGrid)}>
    {focuses.map((focus) => (
      <FocusCard key={focus.id} focus={focus} />
    ))}
  </div>
)
