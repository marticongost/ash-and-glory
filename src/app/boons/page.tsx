import { BoonCardGrid } from "@/components/BoonCardGrid"
import { boons } from "@/models/boons"

export default function Boons() {
  return <BoonCardGrid boons={Object.values(boons)} />
}
