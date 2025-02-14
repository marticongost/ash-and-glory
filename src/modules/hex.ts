import { repeat } from "./utils"

interface OffsetCoordinates {
  column: number
  row: number
}

interface CubeCoordinates {
  q: number
  r: number
  s: number
}

export interface HexProps extends Partial<OffsetCoordinates> {}

export class Hex {
  readonly column: number
  readonly row: number

  constructor({ column = 0, row = 0 }: HexProps = {}) {
    this.column = column
    this.row = row
  }

  static at(column: number, row: number) {
    return new this({ column, row })
  }

  toString(): string {
    return `Hex({column: ${this.column}, row: ${this.row}})`
  }

  is(position: OffsetCoordinates): boolean {
    return this.column === position.column && this.row === position.row
  }

  distanceTo(target: OffsetCoordinates): number {
    const vector = subtractCubeCoordinates(getCubeCoordinates(this), getCubeCoordinates(target))
    return Math.max(Math.abs(vector.q), Math.abs(vector.r), Math.abs(vector.s))
  }

  north(n: number = 1): Hex {
    return new Hex({ column: this.column, row: this.row - n })
  }

  south(n: number = 1): Hex {
    return new Hex({ column: this.column, row: this.row + n })
  }

  northWest(n: number = 1): Hex {
    let { column, row } = this
    for (let i = 0; i < n; i++) {
      column -= 1
      row += column % 2 ? -1 : 0
    }
    return new Hex({ column, row })
  }

  southWest(n: number = 1): Hex {
    let { column, row } = this
    for (let i = 0; i < n; i++) {
      column -= 1
      row += column % 2 ? 0 : 1
    }
    return new Hex({ column, row })
  }

  northEast(n: number = 1): Hex {
    let { column, row } = this
    for (let i = 0; i < n; i++) {
      column += 1
      row += column % 2 ? -1 : 0
    }
    return new Hex({ column, row })
  }

  southEast(n: number = 1): Hex {
    let { column, row } = this
    for (let i = 0; i < n; i++) {
      column += 1
      row += column % 2 ? 0 : 1
    }
    return new Hex({ column, row })
  }

  outwardRing(distance: number): Hex[] {
    if (distance < 0) {
      throw new Error(`Invalid circle size ${distance}; expected a number >= than 0`)
    }
    if (distance === 0) {
      return [this]
    }
    const circle: Hex[] = []
    let cursor = this.north(distance)
    circle.push(...repeat(distance, () => (cursor = cursor.southEast())))
    circle.push(...repeat(distance, () => (cursor = cursor.south())))
    circle.push(...repeat(distance, () => (cursor = cursor.southWest())))
    circle.push(...repeat(distance, () => (cursor = cursor.northWest())))
    circle.push(...repeat(distance, () => (cursor = cursor.north())))
    circle.push(...repeat(distance, () => (cursor = cursor.northEast())))
    return circle
  }

  concentricRings(distance: number): Hex[] {
    if (distance < 0) {
      throw new Error(`Invalid area size ${distance}; expected a number >= than 0`)
    }
    const area: Hex[] = [this]
    for (let i = 1; i <= distance; i++) {
      area.push(...this.outwardRing(i))
    }
    return area
  }
}

export const getCubeCoordinates = (coordinates: OffsetCoordinates): CubeCoordinates => {
  const q = coordinates.column
  const r = coordinates.row - (coordinates.column - (coordinates.column & 1)) / 2
  const s = -q - r
  return { q, r, s }
}

const subtractCubeCoordinates = (a: CubeCoordinates, b: CubeCoordinates): CubeCoordinates => ({
  q: a.q - b.q,
  r: a.r - b.r,
  s: a.s - b.s,
})

export class HexSetBuilder {
  private _hexes: Hex[]
  private _cursor: Hex

  constructor() {
    this._hexes = []
    this._cursor = new Hex()
  }

  push(hexMovement: (cursor: Hex) => Hex): HexSetBuilder {
    this._cursor = hexMovement(this._cursor)
    this._hexes.push(this._cursor)
    return this
  }

  add(hexMovement: (cursor: Hex) => Hex): HexSetBuilder {
    this._hexes.push(hexMovement(this._cursor))
    return this
  }

  skip(hexMovement: (cursor: Hex) => Hex): HexSetBuilder {
    this._cursor = hexMovement(this._cursor)
    return this
  }

  build(): HexSet {
    return new HexSet(this._hexes)
  }
}

export class HexSet {
  readonly hexes: Hex[]
  readonly top: number
  readonly bottom: number
  readonly left: number
  readonly right: number

  static builder(): HexSetBuilder {
    return new HexSetBuilder().push((center) => center)
  }

  constructor(hexes: Hex[]) {
    this.hexes = []

    this.top = 0
    this.bottom = 0
    this.left = 0
    this.right = 0

    for (const hex of hexes) {
      this.hexes.push(hex)
      this.top = Math.min(this.top, hex.row)
      this.bottom = Math.max(this.bottom, hex.row)
      this.left = Math.min(this.left, hex.column)
      this.right = Math.max(this.right, hex.column)
    }
  }

  get width(): number {
    return this.right - this.left + 1
  }

  get height(): number {
    return this.bottom - this.top + 1
  }
}
