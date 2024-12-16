import { TraitCardGrid } from "@/components/TraitCardGrid"
import { traitCategories } from "@/models/traits"

export default function Traits() {
  return <TraitCardGrid categories={Object.values(traitCategories)} />
}
