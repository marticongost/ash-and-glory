import { TraitCardGrid } from "@/components/TraitCardGrid"
import { archetypes } from "@/models/traits"

export default function Traits() {
  return <TraitCardGrid archetypes={Object.values(archetypes)} />
}
