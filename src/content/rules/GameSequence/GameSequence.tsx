import { Section } from "@/components/Section"
import styles from "./GameSequence.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { AnyDrive } from "@/components/ItemIcon"
import { eligibleFocusCards, revealedFocusCards } from "@/models/values"
import { Example } from "@/components/Example"

export interface GameSequenceProps extends StandardComponentProps {}

export const GameSequence = ({ ...baseProps }: GameSequenceProps) => (
  <Section {...getStandardAttributes(baseProps, styles.GameSequence)} title="La seqüència del joc">
    <p>
      El joc s'estructura en una sèrie de <em>capítols</em>. A la seva vegada, cada capítol es divideix en un seguit de{" "}
      <em>fases</em>. Els jugadors participen de totes les fases, sovint alternant-se en una sèrie de <em>torns</em>.
      Quan la última fase del capítol acaba, es comença el següent capítol; la seqüència es repeteix fins que s'assoleix
      el final de la partida.
    </p>
    <Section title="Fase d'esdeveniments">
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
    <Section title="Fase de focus">
      <p>
        En aquesta fase es determinen els impulsos <AnyDrive /> amb que els jugadors podran comptar durant el capítol.
      </p>
      <Section title="Revelar cartes de focus">
        <p>
          A continuació cal determinar els impulsos als que els jugadors podran optar durant el capítol en curs. Per
          fer-ho, es revelaran {revealedFocusCards} cartes de focus del nivell adequat, situades en una fila visible per
          a tots els jugadors.
        </p>
        <p>
          Al primer capítol, totes les cartes de focus robades seran de nivell 1; a mida que el joc avanci, la baralla
          de nivell 1 serà progressivament substituida per les baralles de nivell 2 i 3, proporcionant cartes de focus
          més potents. Per representar aquesta evolució, a partir del segon capítol i a cada capítol posterior es
          canviarà progressivament la composició de les cartes a revelar. Per fer-ho, escollir una de les cartes a
          revelar de menor nivell i substituir-la per una carta del nivell immediatament superior. Aquest efecte és
          acumulatiu al llarg dels diferents capítols, de manera que eventualment totes les cartes de nivell 1 seran
          substituides per cartes de nivell 2, i finalment totes les cartes acabaran sent de nivell 3. Arribats a aquest
          últim estadi, ja no es faran més substitucions.
        </p>
        <Example>
          <ul>
            <li>Al capítol 1, els jugadors revelen {revealedFocusCards} cartes de nivell 1</li>
            <li>Al capítol 2, els jugadors revelen {revealedFocusCards - 1} cartes de nivell 1, i una de nivell 2</li>
            <li>Al capítol 3, els jugadors revelen {revealedFocusCards - 2} cartes de nivell 1, i dues de nivell 2</li>
            <li>...</li>
            <li>
              Al capítol {revealedFocusCards + 1}, els jugadors revelen {revealedFocusCards} cartes de nivell 2
            </li>
            <li>
              Al capítol {revealedFocusCards + 2}, els jugadors revelen {revealedFocusCards - 1} cartes de nivell 2 i
              una de nivell 3
            </li>
            <li>
              Al capítol {revealedFocusCards + 3}, els jugadors revelen {revealedFocusCards - 2} cartes de nivell 2 i
              dues de nivell 3
            </li>
            <li>...</li>
            <li>
              Al capítol {revealedFocusCards * 2 + 1} i posteriors, els jugadors revelen {revealedFocusCards} cartes de
              nivell 3
            </li>
          </ul>
        </Example>
      </Section>
      <Section title="Escollir cartes de focus">
        <p>
          En aquest punt, els jugadors decidiran quines de les cartes de focus revelades voldran utilitzar durant el
          capítol en curs. Cada jugador fa la seva tria per separat, escollint {eligibleFocusCards} de les cartes i
          obtenint els recursos indicats. Aquesta tria serà fonamental per determinar la varietat i efectivitat de les
          accions a les que podrà optar cada jugador durant la resta del capítol, i permetrà que el destí dels jugadors
          divergeixi segons les seves decisions.
        </p>
      </Section>
    </Section>
    <Section title="Fase d'acció"></Section>
    <Section title="Fase de neteja"></Section>
  </Section>
)
