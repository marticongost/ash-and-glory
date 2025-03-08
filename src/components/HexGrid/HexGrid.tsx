import styles from "./HexGrid.module.scss"
import { getStandardAttributes, mergeClassName, type StandardComponentProps } from "@/modules/react-utils"
import HexSVG from "@/svg/hex.svg"
import { Hex, HexSet } from "@/modules/hex"
import { createElement, type ReactNode } from "react"
import { terrainTypes, type TerrainTypeId } from "@/models/terrain"

export interface HexGridProps<H extends Hex = Hex> extends StandardComponentProps {
  hexSet: HexSet<H>
  showCoordinates?: boolean
  hexDecorator?: (hex: H) => HexDecoration | undefined
}

export interface HexDecoration extends StandardComponentProps {
  contourProps?: StandardComponentProps
  children?: ReactNode
}

export const HexGrid = <H extends Hex = Hex>({
  hexSet,
  hexDecorator,
  showCoordinates = false,
  ...baseProps
}: HexGridProps<H>) => {
  return (
    <div
      {...getStandardAttributes(baseProps, styles.HexGrid)}
      style={{ "--w": hexSet.width, "--h": hexSet.height } as any}
    >
      {hexSet.hexes.map((hex) => {
        const decoration = hexDecorator ? hexDecorator(hex) : undefined
        const { children, contourProps, ...hexProps } = decoration ?? {}
        return (
          <div
            key={`${hex.column}-${hex.row}`}
            {...getStandardAttributes(hexProps, styles.hex)}
            style={{ "--column": hex.column, "--row": hex.row, "--offset": hex.column % 2 ? "0.5" : "0" } as any}
          >
            {showCoordinates ? (
              <div className={styles.coordinates}>
                {hex.column}, {hex.row}
              </div>
            ) : null}
            <HexSVG {...getStandardAttributes(contourProps ?? {}, styles.contour)} />
            {children}
          </div>
        )
      })}
    </div>
  )
}
