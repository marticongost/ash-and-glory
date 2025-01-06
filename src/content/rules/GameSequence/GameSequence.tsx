import { Section } from "@/components/Section"
import styles from "./GameSequence.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { AnyDrive } from "@/components/ResourceIcon"
import { eligibleBoonCards, revealedBoonCards } from "@/models/values"
import { Example } from "@/components/Example"

export interface GameSequenceProps extends StandardComponentProps {}

export const GameSequence = ({ ...baseProps }: GameSequenceProps) => (
  <Section {...getStandardAttributes(baseProps, styles.GameSequence)} title="La seqüència del joc">
    <p>
      El joc s'estructura en una sèrie de <em>torns</em>. A la seva vegada, cada torn es divideix en un seguit de{" "}
      <em>fases</em>. Els jugadors no s'alternen per jugar els seus torns, si no que tots els jugadors participen
      conjuntament a cada torn, actuant simultàniament a cada una de les fases. Quan la última fase del torn acaba, es
      comença el següent torn; la seqüència es repeteix fins que s'assoleixi el final de la partida.
    </p>
    <Section title="Fase de destí">
      <p>
        En aquesta fase es determinen els impulsos <AnyDrive /> amb que els jugadors podran comptar durant el torn, i
        els possibles <em>esdeveniments</em> que ocurriran.
      </p>
      <Section title="Resoldre un esdeveniment">
        <p>
          En primer lloc, els jugadors robaran una <em>carta d'esdeveniment</em> i en resoldran els efectes. Els
          esdeveniments represent circumstàncies i situacions inusuals que introdueixen un element de sorpresa i
          impredictibilitat a la partida.
        </p>
        <p>
          Els esdeveniments poden tenir efectes molt variats, representant des de catàstrofes i reptes a bonances i
          oportunitats. Igualment, podran tenir duracions i activacions molt variades: alguns es resolen immediatament,
          d'altres poden afectar fases del torn posteriors, i alguns fins i tot romanen en joc múltiples torns.
        </p>
      </Section>
      <Section title="Revelar cartes d'impuls">
        <p>
          A continuació cal determinar els impulsos als que els jugadors podran optar durant el torn. Per fer-ho, es
          revelaran {revealedBoonCards} cartes d'impuls del nivell adequat, situades en una fila visible per a tots els
          jugadors.
        </p>
        <p>
          Al primer torn, totes les cartes d'impuls robades seran de nivell 1; a mida que el joc avanci, la baralla de
          nivell 1 serà progressivament substituida per les baralles de nivell 2 i 3, proporcionant cartes d'impuls més
          potents. Per representar aquesta evolució, a partir del segon torn i a cada torn posterior es canviarà
          progressivament la composició de les cartes a revelar. Per fer-ho, escollir una de les cartes a revelar de
          menor nivell i substituir-la per una carta del nivell immediatament superior. Aquest efecte és acumulatiu al
          llarg dels diferents torns, de manera que eventualment totes les cartes de nivell 1 seran substituides per
          cartes de nivell 2, i finalment totes les cartes acabaran sent de nivell 3. Arribats a aquest últim estadi, ja
          no es faran més substitucions.
        </p>
        <Example>
          <ul>
            <li>Al torn 1, els jugadors revelen {revealedBoonCards} cartes de nivell 1</li>
            <li>Al torn 2, els jugadors revelen {revealedBoonCards - 1} cartes de nivell 1, i una de nivell 2</li>
            <li>Al torn 3, els jugadors revelen {revealedBoonCards - 2} cartes de nivell 1, i dues de nivell 2</li>
            <li>...</li>
            <li>
              Al torn {revealedBoonCards + 1}, els jugadors revelen {revealedBoonCards} cartes de nivell 2
            </li>
            <li>
              Al torn {revealedBoonCards + 2}, els jugadors revelen {revealedBoonCards - 1} cartes de nivell 2 i una de
              nivell 3
            </li>
            <li>
              Al torn {revealedBoonCards + 3}, els jugadors revelen {revealedBoonCards - 2} cartes de nivell 2 i dues de
              nivell 3
            </li>
            <li>...</li>
            <li>
              Al torn {revealedBoonCards * 2 + 1} i posteriors, els jugadors revelen {revealedBoonCards} cartes de
              nivell 3
            </li>
          </ul>
        </Example>
      </Section>
      <Section title="Escollir cartes d'impuls">
        <p>
          En aquest punt, els jugadors decidiran quines de les cartes d'impuls revelades voldran utilitzar durant el
          torn. Cada jugador fa la seva tria per separat, escollint {eligibleBoonCards} de les cartes i obtenint els
          recursos indicats. Aquesta tria serà fonamental per determinar la varietat i efectivitat de les accions a les
          que podrà optar cada jugador durant la resta del torn, i permetrà que el destí dels jugadors divergeixi segons
          les seves decisions.
        </p>
      </Section>
    </Section>
    <Section title="Fase de producció"></Section>
    <Section title="Fase de construcció"></Section>
    <Section title="Fase de producció"></Section>
    <Section title="Fase de maniobra"></Section>
    <Section title="Fase de neteja"></Section>
  </Section>
)
