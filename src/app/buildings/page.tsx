import { BuildingCardGrid } from "@/components/BuildingCardGrid"
import { buildings } from "@/models/buildings"
import { makeMetadata } from "../metadata"
import { requireSection } from "@/modules/navigation"

export const metadata = makeMetadata({ title: requireSection("buildings").title })

export default function Buildings() {
  return <BuildingCardGrid buildings={Object.values(buildings)} />
}
