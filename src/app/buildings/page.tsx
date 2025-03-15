import { buildings, type Building, type BuildingTypeId } from "@/models/buildings"
import { makeMetadata } from "../metadata"
import { requireSection } from "@/modules/navigation"
import { BuildingsSheet } from "@/components/BuildingsSheet"

export const metadata = makeMetadata({ title: requireSection("buildings").title })

export default function Buildings() {
  return (
    <BuildingsSheet
      buildingGroups={[
        { title: "Bàsics", buildings: [buildings.cityCenter, buildings.housing] },
        { title: "Productius", buildings: ofType("production") },
        { title: "Econòmics", buildings: ofType("economic") },
        { title: "Militars", buildings: ofType("military") },
        { title: "Religiosos", buildings: ofType("religious") },
        { title: "Coneixement", buildings: ofType("academic", "magic") },
        { title: "Monumentals", buildings: ofType("monumental") },
      ]}
    />
  )
}

const ofType = (...typeIds: BuildingTypeId[]): Building[] =>
  Object.values(buildings).filter((building) => building.types.find((type) => typeIds.includes(type.id)))
