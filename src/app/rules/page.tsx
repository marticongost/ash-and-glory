import { Content } from "@/components/Content"
import { Section } from "../../components/Section"
import { DefinitionList } from "@/components/DefinitionList"
import { AnyDrive, Curiosity, Effort, Growth, Resolve, Strife } from "@/components/ResourceIcon"
import { Introduction } from "@/content/rules/Introduction"
import { BasicConcepts } from "@/content/rules/BasicConcepts"

export default function Rules() {
  return (
    <Content>
      <h1>Reglament</h1>

      <Introduction />
      <BasicConcepts />

      <Section title="Preparació"></Section>

      <Section title="La seqüència del joc">
        <Section title="Fase de destí"></Section>

        <Section title="Fase de producció"></Section>

        <Section title="Fase de construcció"></Section>

        <Section title="Fase de producció"></Section>

        <Section title="Fase de maniobra"></Section>

        <Section title="Fase de neteja"></Section>
      </Section>

      <Section title="Construir edificis"></Section>

      <Section title="Fundar noves ciutats"></Section>

      <Section title="Reclutament"></Section>

      <Section title="Maniobra"></Section>

      <Section title="Trets i arquetips"></Section>
    </Content>
  )
}
