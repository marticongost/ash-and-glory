type Constructor<ObjectType, Props = any> = new (...args: [Props]) => ObjectType

export const instantiate = <T, P>(obj: T | P, type: Constructor<T, P>): T =>
  obj instanceof type ? obj : new type(obj as P)
export const instantiateAll = <T, P>(objects: Array<T | P>, type: Constructor<T, P>): T[] =>
  objects.map((obj) => instantiate(obj, type))

export const repeat = <T,>(amount: number, supplier: (index: number) => T) => {
  const items = []
  for (let n = 0; n < amount; n++) {
    items.push(supplier(n))
  }
  return items
}

export type Key = string | number | symbol

export const groupBy = <T, K extends Key>(items: T[], getKey: (item: T) => K): Record<K, T[]> => {
  const record = {} as Record<K, T[]>
  for (const item of items) {
    const key = getKey(item)
    let list = record[key]
    if (list === undefined) {
      list = []
      record[key] = list
    }
    list.push(item)
  }
  return record
}

export const recordToList = <T, K extends Key, V>(record: Record<K, V>, mapper: (key: K, value: V) => T) =>
  Object.entries(record).map(([key, value]) => mapper(key as K, value as V))
