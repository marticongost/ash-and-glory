import { FocusCardGrid } from "@/components/FocusCardGrid"
import { focuses } from "@/models/focus"
import { makeMetadata } from "../metadata"
import { requireSection } from "@/modules/navigation"

export const metadata = makeMetadata({ title: requireSection("focuses").title })

export default function Focuses() {
  return <FocusCardGrid focuses={Object.values(focuses)} />
}
