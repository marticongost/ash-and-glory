import { makeMetadata } from "../../metadata"
import { requireSection } from "@/modules/navigation"
import { AreaCardGrid } from "@/components/AreaCardGrid"
import { areas } from "@/models/areas"

export const metadata = makeMetadata({ title: requireSection("exploration/areas").title })

export default function Areas() {
  return <AreaCardGrid areas={Object.values(areas)} />
}
