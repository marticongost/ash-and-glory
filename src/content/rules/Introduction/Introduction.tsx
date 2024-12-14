import { Section } from "@/components/Section"
import styles from "./Introduction.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface IntroductionProps extends StandardComponentProps {}

export const Introduction = ({ ...baseProps }: IntroductionProps) => (
  <Section {...getStandardAttributes(baseProps, styles.Introduction)} title="Introducció">
    <em>Ash and Glory</em> és un joc d'expansió i conquesta en un món de déus ambiciosos i imperis trencats. Els
    jugadors controlen el destí d'una civilització en un món fantàstic: sota la seva tutela, les seves gents fundaran
    poderoses ciutats, desenvoluparan la seva cultura i competiran per l'hegemonia, ja sigui a cop d'espasa, d'acords
    comercials o d'influència política.
  </Section>
)
