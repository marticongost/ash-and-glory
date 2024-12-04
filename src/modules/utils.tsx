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
