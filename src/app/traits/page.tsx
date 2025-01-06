import { TraitCardGrid } from "@/components/TraitCardGrid"
import { traitCategories } from "@/models/traits"
import { makeMetadata } from "../metadata"
import { requireSection } from "@/modules/navigation"

export const metadata = makeMetadata({ title: requireSection("traits").title })

export default function Traits() {
  return <TraitCardGrid categories={Object.values(traitCategories)} />
}
