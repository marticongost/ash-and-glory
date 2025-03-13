import styles from "./ActionPhase.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { Section } from "@/components/Section"
import { Actions } from "../Actions"

export interface ActionPhaseProps extends StandardComponentProps {}

export const ActionPhase = ({ ...baseProps }: ActionPhaseProps) => (
  <Section {...getStandardAttributes(baseProps, styles.ActionPhase)} title="Fase d'acció">
    <p>
      En aquesta fase, els jugadors s'alternen en ordre de joc per activar les capacitats proporcionades pels seus trets
      i edificis.
    </p>

    <Section title="Passar">
      <p>
        Durant el seu torn, un jugador pot decidir renunciar al seu torn i <em>passar</em>. Normalment ho farà quan ja
        no disposi de més accions a executar, o no pugui pagar-ne el cost associat - però també es pot fer
        voluntàriament, per cedir la iniciativa als rivals i reaccionar a les seves decisions.
      </p>
      <p>
        Sigui com sigui, un jugador que passi no durà a terme cap acció, i finalitzarà el seu torn immediatament. El
        torn passarà al següent jugador, en ordre de joc.
      </p>
      <p>
        Si tots els jugadors passen de forma consecutiva, la Fase d'Acció conclourà, i el capítol continuarà amb la
        següent fase (la Fase de Neteja).
      </p>
    </Section>

    <Actions />
  </Section>
)
