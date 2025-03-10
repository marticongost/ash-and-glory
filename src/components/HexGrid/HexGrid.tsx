import styles from "./HexGrid.module.scss"
import { getStandardAttributes, mergeClassName, type StandardComponentProps } from "@/modules/react-utils"
import HexSVG from "@/svg/hex.svg"
import { Hex, HexSet } from "@/modules/hex"
import { type ReactNode } from "react"
import { getMinAndMaxValues, sortBy } from "@/modules/utils"

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
  const hexGridRenderer = getHexGridRenderer(hexSet)
  return (
    <div
      {...getStandardAttributes(baseProps, styles.HexGrid)}
      style={{ "--w": hexGridRenderer.width, "--h": hexGridRenderer.height } as any}
    >
      {hexSet.hexes.map((hex) => {
        const decoration = hexDecorator ? hexDecorator(hex) : undefined
        const { children, contourProps, ...hexProps } = decoration ?? {}
        return (
          <div
            key={`${hex.column}-${hex.row}`}
            {...getStandardAttributes(hexProps, styles.hex)}
            style={{ "--col": hexGridRenderer.getColumn(hex), "--row": hexGridRenderer.getRow(hex) } as any}
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

interface HexGridRenderer {
  width: number
  height: number
  getColumn: (hex: Hex) => number
  getRow: (hex: Hex) => number
}

const getHexGridRenderer = (hexSet: HexSet): HexGridRenderer => {
  let rowNormalisation = hexSet.top
  if (hexSet.topRow().every(shouldOffsetColumn)) {
    rowNormalisation += 0.5
  }

  const getRow = (hex: Hex): number => hex.row - rowNormalisation + (shouldOffsetColumn(hex) ? 0.5 : 0)

  const rowCoordinates = getMinAndMaxValues(hexSet.hexes.map((hex) => getRow(hex)))
  const height = 1 + rowCoordinates[1] - rowCoordinates[0]

  return {
    width: hexSet.width,
    height,
    getColumn: (hex) => hex.column - hexSet.left,
    getRow,
  }
}

const shouldOffsetColumn = (hex: Hex): boolean => hex.column % 2 !== 0
