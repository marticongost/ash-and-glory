import { FocusCardGrid } from "@/components/FocusCardGrid"
import { focuses } from "@/models/focus"

export default function Focuses() {
  return <FocusCardGrid focuses={Object.values(focuses)} />
}
