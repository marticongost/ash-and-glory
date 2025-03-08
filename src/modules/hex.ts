import { createSibling, repeat } from "./utils"

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

export type HexExtraProps<P extends HexProps> = Omit<P, "column" | "row">
export type HexInitializer<P extends HexProps> =
  | HexExtraProps<P>
  | ((coordinates: OffsetCoordinates) => HexExtraProps<P>)

export class Hex<P extends HexProps = HexProps> {
  readonly column: number
  readonly row: number

  constructor({ column = 0, row = 0 }: HexProps = {}) {
    this.column = column
    this.row = row
  }

  static at(column: number, row: number) {
    return new this({ column, row })
  }

  private createHex(coordinates: OffsetCoordinates, initializer: HexInitializer<P>): this {
    return createSibling(this, {
      column: coordinates.column,
      row: coordinates.row,
      ...(initializer instanceof Function ? initializer(coordinates) : initializer),
    })
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

  north(initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    return this.northTimes(1, initializer)
  }

  northTimes(n: number = 1, initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    return this.createHex({ column: this.column, row: this.row - n }, initializer)
  }

  south(initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    return this.southTimes(1, initializer)
  }

  southTimes(n: number = 1, initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    return this.createHex({ column: this.column, row: this.row + n }, initializer)
  }

  northWest(initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    return this.northWestTimes(1, initializer)
  }

  northWestTimes(n: number = 1, initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    let { column, row } = this
    for (let i = 0; i < n; i++) {
      column -= 1
      row += column % 2 ? -1 : 0
    }
    return this.createHex({ column, row }, initializer)
  }

  southWest(initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    return this.southWestTimes(1, initializer)
  }

  southWestTimes(n: number = 1, initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    let { column, row } = this
    for (let i = 0; i < n; i++) {
      column -= 1
      row += column % 2 ? 0 : 1
    }
    return this.createHex({ column, row }, initializer)
  }

  northEast(initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    return this.northEastTimes(1, initializer)
  }

  northEastTimes(n: number = 1, initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    let { column, row } = this
    for (let i = 0; i < n; i++) {
      column += 1
      row += column % 2 ? -1 : 0
    }
    return this.createHex({ column, row }, initializer)
  }

  southEast(initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    return this.southEastTimes(1, initializer)
  }

  southEastTimes(n: number = 1, initializer: HexInitializer<P> = {} as HexInitializer<P>): this {
    let { column, row } = this
    for (let i = 0; i < n; i++) {
      column += 1
      row += column % 2 ? 0 : 1
    }
    return this.createHex({ column, row }, initializer)
  }

  outwardRing(distance: number, initializer: HexInitializer<P> = {} as HexInitializer<P>): this[] {
    if (distance < 0) {
      throw new Error(`Invalid circle size ${distance}; expected a number >= than 0`)
    }
    if (distance === 0) {
      return [this]
    }
    const circle: this[] = []
    let cursor = this.northTimes(distance, initializer)
    circle.push(...repeat(distance, () => (cursor = cursor.southEast(initializer))))
    circle.push(...repeat(distance, () => (cursor = cursor.south(initializer))))
    circle.push(...repeat(distance, () => (cursor = cursor.southWest(initializer))))
    circle.push(...repeat(distance, () => (cursor = cursor.northWest(initializer))))
    circle.push(...repeat(distance, () => (cursor = cursor.north(initializer))))
    circle.push(...repeat(distance, () => (cursor = cursor.northEast(initializer))))
    return circle
  }

  concentricRings(distance: number, initializer: HexInitializer<P> = {} as HexInitializer<P>): this[] {
    if (distance < 0) {
      throw new Error(`Invalid area size ${distance}; expected a number >= than 0`)
    }
    const area: this[] = [this]
    for (let i = 1; i <= distance; i++) {
      area.push(...this.outwardRing(i, initializer))
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

export class HexSetBuilder<H extends Hex = Hex> {
  private _hexes: H[]
  private _cursor: H

  constructor(center: H) {
    this._hexes = [center]
    this._cursor = center
  }

  push(hexMovement: (cursor: H) => H): this {
    this._cursor = hexMovement(this._cursor)
    this._hexes.push(this._cursor)
    return this
  }

  add(hexMovement: (cursor: H) => H): this {
    this._hexes.push(hexMovement(this._cursor))
    return this
  }

  skip(hexMovement: (cursor: H) => H): this {
    this._cursor = hexMovement(this._cursor)
    return this
  }

  build(): HexSet<H> {
    return new HexSet(this._hexes)
  }
}

export class HexSet<H extends Hex = Hex> {
  readonly hexes: H[]
  readonly top: number
  readonly bottom: number
  readonly left: number
  readonly right: number

  static builder(): HexSetBuilder {
    return new HexSetBuilder(new Hex())
  }

  constructor(hexes: H[]) {
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
