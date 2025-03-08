import styles from "./PlayerReference.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface PlayerReferenceProps extends StandardComponentProps {
  number: number
}

export const PlayerReference = ({ number, ...baseProps }: PlayerReferenceProps) => (
  <div {...getStandardAttributes(baseProps, styles.PlayerReference)} data-player={number}>
    jugador {number}
  </div>
)
