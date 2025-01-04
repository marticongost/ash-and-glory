import { FateCardGrid } from "@/components/FateCardGrid"
import { fates } from "@/models/fate"

export default function Fate() {
  return <FateCardGrid fates={Object.values(fates)} />
}
