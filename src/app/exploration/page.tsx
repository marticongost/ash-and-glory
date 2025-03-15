import { makeMetadata } from "../metadata"
import { requireSection } from "@/modules/navigation"

export const metadata = makeMetadata({ title: requireSection("exploration").title })

export default function Areas() {
  return <div />
}
