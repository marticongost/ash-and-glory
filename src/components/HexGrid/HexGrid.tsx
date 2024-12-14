import styles from "./HexGrid.module.scss"
import { getStandardAttributes, mergeClassName, type StandardComponentProps } from "@/modules/react-utils"
import HexSVG from "@/svg/hex.svg"
import { Hex } from "@/modules/hex"
import type { ReactNode } from "react"

export interface HexGridProps extends StandardComponentProps {
  size: number
  showCoordinates?: boolean
  hexDecorator?: (hex: Hex) => HexDecoration | undefined
}

export interface HexDecoration {
  className?: string
  children?: ReactNode
}

export const HexGrid = ({ size, hexDecorator, showCoordinates = false, ...baseProps }: HexGridProps) => {
  const center = new Hex()
  const hexes = center.concentricRings(size)
  return (
    <div
      {...getStandardAttributes(baseProps, styles.HexGrid)}
      style={{ "--w": size * 2 + 1, "--h": size * 2 + 1 } as any}
    >
      {hexes.map((hex) => {
        const decoration = hexDecorator ? hexDecorator(hex) : undefined
        return (
          <div
            key={`${hex.column}-${hex.row}`}
            className={mergeClassName(styles.hex, decoration?.className)}
            style={{ "--column": hex.column, "--row": hex.row, "--offset": hex.column % 2 ? "0.5" : "0" } as any}
          >
            {showCoordinates ? (
              <div className={styles.coordinates}>
                {hex.column}, {hex.row}
              </div>
            ) : null}
            <HexSVG />
            {decoration?.children ?? null}
          </div>
        )
      })}
    </div>
  )
}
