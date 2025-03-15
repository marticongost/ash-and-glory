import { Example } from "@/components/Example"
import { AnyDrive } from "@/components/ItemIcon"
import { focusCardsDraft, focusLevelLabels, getFocusCardLevelsForChapter, type FocusLevel } from "@/models/focus"
import styles from "./FocusPhase.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { Section } from "@/components/Section"
import { repeat } from "@/modules/utils"

export interface FocusPhaseProps extends StandardComponentProps {}

export const FocusPhase = ({ ...baseProps }: FocusPhaseProps) => (
  <Section {...getStandardAttributes(baseProps, styles.FocusPhase)} title="Fase de focus">
    <p>
      En aquesta fase es determinen els impulsos <AnyDrive /> amb que els jugadors podran comptar durant el capítol.
    </p>
    <Section title="Repartir cartes de focus">
      <p>
        Per començar, cal determinar els impulsos als que els jugadors podran optar durant el capítol en curs. Per
        fer-ho, es comença repartint {focusCardsDraft.initialHandSize} cartes de focus dels nivells adequats a cada
        jugador, com es descriu a continuació.
      </p>
      <p>
        Les cartes de focus van del nivell 1 al 3, en ordre creixent de potència i capacitats. Al primer capítol, totes
        les cartes que es robaran seran de nivell 1, oferint possibilitats més limitades als jugadors; a mida que el joc
        avanci, la baralla de nivell 1 serà progressivament substituida per les baralles de nivell 2 i 3, proporcionant
        més capacitats i oportunitats.
      </p>
      <p>
        A partir del segon capítol, i a cada capítol posterior, es canviarà progressivament la composició de les cartes
        a repartir, substituint una de les cartes de menor nivell per una del nivell immediatament superior. Aquest
        efecte és acumulatiu al llarg dels diferents capítols, de manera que eventualment totes les cartes de nivell 1
        seran substituides per cartes de nivell 2, i finalment totes les cartes acabaran sent de nivell 3. Arribats a
        aquest últim estadi, ja no es faran més substitucions.
      </p>
      <Example>
        <ul>
          {repeat(focusCardsDraft.firstChapterWithStableComposition, (index) => {
            const chapter = index + 1
            const cardsForChapter = getFocusCardLevelsForChapter(chapter)
            const desc = []
            for (const [level, levelCards] of Object.entries(cardsForChapter)) {
              if (levelCards) {
                const levelLabel = focusLevelLabels[Number(level) as FocusLevel]
                desc.push(`${levelCards} ${levelCards === 1 ? "carta" : "cartes"} de nivell ${levelLabel}`)
              }
            }
            const chapterLabel =
              chapter === focusCardsDraft.firstChapterWithStableComposition ? `${chapter} i posteriors` : chapter
            return (
              <li key={index}>
                Al capítol {chapterLabel}, els jugadors reben {desc.join(" i ")}
              </li>
            )
          })}
        </ul>
      </Example>
    </Section>
    <Section title="Escollir cartes de focus">
      <p>
        En aquest punt, els jugadors decidiran quines de les cartes de focus revelades voldran utilitzar durant el
        capítol en curs. Per fer-ho, cada jugador escull una de les cartes rebudes, i l'aparta davant seu, cap per
        avall. La resta de cartes es passen al jugador següent, en sentit i horari, i també cap per avall. A
        continuació, els jugadors escullen una segona carta d'entre les cartes que els ha entregat el seu veí. Altre
        cop, passen la resta de cartes al següent jugador.
      </p>
      <p>
        Aquest procés es repeteix fins que tots els jugadors hagin seleccionat un total de{" "}
        {focusCardsDraft.finalHandSize} cartes. Les cartes descartades a la última selecció s'afegeixen a la pila de
        descartament general.
      </p>
    </Section>
  </Section>
)
