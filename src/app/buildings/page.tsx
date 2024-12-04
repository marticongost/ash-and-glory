import { BuildingCardGrid } from "@/components/BuildingCardGrid";
import { buildings } from "@/models/buildings";

export default function Buildings() {
  return <BuildingCardGrid buildings={Object.values(buildings)} />
}