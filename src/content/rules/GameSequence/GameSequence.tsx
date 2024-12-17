import { Section } from "@/components/Section"
import styles from "./GameSequence.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { AnyDrive } from "@/components/ResourceIcon"

export interface GameSequenceProps extends StandardComponentProps {}

export const GameSequence = ({ ...baseProps }: GameSequenceProps) => (
  <Section {...getStandardAttributes(baseProps, styles.GameSequence)} title="La seqüència del joc">
    <p>
      El joc es divideix en quatre <em>eres</em>. Cada era compta amb una sèrie de <em>torns</em>, i torn està
      estructurat en un seguit de <em>fases</em>. Els jugadors actuen a la vegada, durant tots els torns, participant
      simultàniament en cada una de les fases. Quan la última fase del torn acaba, es comença el següent torn; la
      seqüència es repeteix fins que es completin tots els torns de la última era.
    </p>
    <Section title="Fase d'impuls">
      <p>
        En aquesta fase es determinen els impulsos <AnyDrive /> amb que els jugadors podran comptar durant el torn. Per
        fer-ho, un dels jugadors llança el nombre indicat de <em>daus d'impuls</em>, segons l'<em>era</em> activa. A
        continuació, cada jugador decideix quin subconjunt dels daus voldrà utilitzar, com s'indica a la taula següent:
      </p>
      <table>
        <thead>
          <tr>
            <th>Era</th>
            <th>Daus totals</th>
            <th>Daus seleccionables</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>I</td>
            <td>5</td>
            <td>3</td>
          </tr>
          <tr>
            <td>II</td>
            <td>6</td>
            <td>4</td>
          </tr>
          <tr>
            <td>III</td>
            <td>7</td>
            <td>5</td>
          </tr>
          <tr>
            <td>IV</td>
            <td>8</td>
            <td>6</td>
          </tr>
        </tbody>
      </table>
      <p>
        Per cada dau escollit, els jugadors obtenen el recurs indicat pel dau. Cada jugador fa la seva tria per separat;
        és a dir, els jugadors parteixen d'un mateix conjunt de resultats, però cada jugador decideix pel seu compte amb
        quins dels resultats obtinguts vol quedar-se.
      </p>
    </Section>
    <Section title="Fase de producció"></Section>
    <Section title="Fase de construcció"></Section>
    <Section title="Fase de producció"></Section>
    <Section title="Fase de maniobra"></Section>
    <Section title="Fase de neteja"></Section>
  </Section>
)
