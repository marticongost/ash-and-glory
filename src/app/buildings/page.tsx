import { buildings } from "@/models/buildings"
import { makeMetadata } from "../metadata"
import { requireSection } from "@/modules/navigation"
import { BuildingsSheet } from "@/components/BuildingsSheet"

export const metadata = makeMetadata({ title: requireSection("buildings").title })

export default function Buildings() {
  return <BuildingsSheet buildings={Object.values(buildings)} />
}
