import { Section } from "@/components/Section"
import styles from "./GameSequence.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { Reference } from "@/components/Reference"
import { traitCategories } from "@/models/traits"

export interface GameSequenceProps extends StandardComponentProps {}

export const GameSequence = ({ ...baseProps }: GameSequenceProps) => (
  <Section {...getStandardAttributes(baseProps, styles.GameSequence)} title="La seqüència del joc">
    <p>
      El joc s'estructura en una sèrie de <em>capítols</em>. A la seva vegada, cada capítol es divideix en un seguit de{" "}
      <em>fases</em>. Els jugadors participen de totes les fases, sovint alternant-se en una sèrie de <em>torns</em>.
      Quan la última fase del capítol acaba, es comença el següent capítol; la seqüència es repeteix fins que s'assoleix
      el final de la partida.
    </p>
    <p>Les fases del joc són les següents:</p>
    <ol>
      <li>Fase d'esdeveniments</li>
      <li>Fase de focus</li>
      <li>Fase d'acció</li>
      <li>Fase de neteja</li>
    </ol>
    <p>Les diferents fases s'expliquen a continuació.</p>
    <Section title="Ordre de joc">
      <p>
        Moltes de les fases s'estructuren en torns seqüencials (primer un dels jugadors resol el seu torn, seguit del
        torn del següent jugador, etc). En aquestes fases s'haurà d'establir un ordre de joc, per fixar l'ordre en que
        actuarà cada jugador.
      </p>
      <p>
        L'ordre de joc s'estableix començant pel <em>jugador inicial</em>, i seguint per cada un de la resta de jugadors
        en el sentit de les agulles del rellotge. En començar la partida, el jugador inicial es determina aleatòriament.
        Posteriorment, els jugadors poden gastar recursos per convertir-se en el jugador inicial, tal i com es descriu a
        la carta <Reference item={traitCategories.standard.traits[0]} />.
      </p>
    </Section>
  </Section>
)
