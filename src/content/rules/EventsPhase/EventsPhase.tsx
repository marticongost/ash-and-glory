import { Section } from "@/components/Section"
import styles from "./EventsPhase.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface EventsPhaseProps extends StandardComponentProps {}

export const EventsPhase = ({ ...baseProps }: EventsPhaseProps) => (
  <Section {...getStandardAttributes(baseProps, styles.EventsPhase)} title="Fase d'esdeveniments">
    <p>
      En aquesta fase, els jugadors robaran una <em>carta d'esdeveniment</em> i en resoldran els efectes. Els
      esdeveniments represent circumstàncies i situacions inusuals que introdueixen un element de sorpresa i
      impredictibilitat a la partida.
    </p>
    <p>
      Els esdeveniments poden tenir efectes molt variats, representant des de catàstrofes i reptes a bonances i
      oportunitats. Igualment, podran tenir duracions i activacions molt variades: alguns es resolen immediatament,
      d'altres poden afectar fases posteriors del capítol, i alguns fins i tot romanen en joc múltiples capítols.
    </p>
  </Section>
)
