import { makeMetadata } from "../../metadata"
import { requireSection } from "@/modules/navigation"
import { areaShapes } from "@/models/areas"
import { AreaShapeGrid } from "@/components/AreaShapeGrid"

export const metadata = makeMetadata({ title: requireSection("exploration/shapes").title })

export default function Shapes() {
  return <AreaShapeGrid shapes={areaShapes} />
}
