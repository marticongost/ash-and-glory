import { Content } from "@/components/Content"
import { Section } from "../../components/Section"
import { Introduction } from "@/content/rules/Introduction"
import { BasicConcepts } from "@/content/rules/BasicConcepts"
import { Article } from "@/components/Article"
import { Preparation } from "@/content/rules/Preparation"
import { GameSequence } from "@/content/rules/GameSequence"
import { makeMetadata } from "../metadata"
import { requireSection } from "@/modules/navigation"
import { EventsPhase } from "@/content/rules/EventsPhase"
import { FocusPhase } from "@/content/rules/FocusPhase"
import { ActionPhase } from "@/content/rules/ActionPhase"

export const metadata = makeMetadata({ title: requireSection("rules").title })

export default function Rules() {
  return (
    <Article title="Reglament">
      <Introduction />
      <BasicConcepts />
      <Preparation />
      <GameSequence />
      <EventsPhase />
      <FocusPhase />
      <ActionPhase />

      <Section title="Construir edificis"></Section>

      <Section title="Fundar noves ciutats"></Section>

      <Section title="Reclutament"></Section>

      <Section title="Maniobra"></Section>

      <Section title="Trets i arquetips"></Section>
    </Article>
  )
}
