import { Section } from "@/components/Section"
import styles from "./BasicConcepts.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { DefinitionList } from "@/components/DefinitionList"
import {
  AnyDrive,
  Growth,
  Effort,
  Curiosity,
  Strife,
  Resolve,
  Food,
  Wood,
  Ore,
  Gold,
  Population,
  Glory,
} from "@/components/ResourceIcon"

export interface BasicConceptsProps extends StandardComponentProps {}

export const BasicConcepts = ({ ...baseProps }: BasicConceptsProps) => (
  <Section {...getStandardAttributes(baseProps, styles.BasicConcepts)} title="Concepts bàsics">
    <Section title="Recursos">
      <p>
        Els recursos medeixen la capacitat d'acció dels imperis. Els jugadors els acumulen i inverteixen al llarg del
        torn, utilitzant les capacitats dels seus <em>trets</em> i <em>edificis</em> per obtenir-los i transformar-los
        en altres tipus que puguin necessitar.
      </p>
      <p>Els recursos es classifiquen en diferents tipus, que s'expliquen a continuació.</p>

      <Section title="Impulsos">
        <p>
          Recursos fonamentals que es revel·len aleatòriament cada torn. Són l’element primordial a l’inici de la cadena
          econòmica, i s’utilitzen a diferents edificis per obtenir o activar diferents recursos, edificis o trets.
        </p>

        <p>
          Als materials del joc els impulsos es denoten amb una icona envoltada amb un octàgon; alternativament, un
          octàgon sense icona (<AnyDrive />) indica que es pot utilitzar qualsevol impuls per l’acció associada.
        </p>

        <p>Es divideixen en els següents tipus:</p>

        <DefinitionList
          definitions={[
            {
              term: (
                <>
                  <Growth /> Creixement
                </>
              ),
              description: (
                <>
                  Representa les ànsies dels imperis per expandir-se i créixer. Utilitzat per fundar noves ciutats,
                  construïr edificis i desmobilitzar tropes.
                </>
              ),
            },
            {
              term: (
                <>
                  <Effort /> Esforç
                </>
              ),
              description: (
                <>
                  Representa la capacitat de treball i força productiva dels imperis. Utilitzat per produir materials.
                </>
              ),
            },
            {
              term: (
                <>
                  <Curiosity /> Curiositat
                </>
              ),
              description: (
                <>
                  Representa la inventiva, ingenuïtat i vocació de recerca i descobriment d'un imperi. Utilitzat per
                  crear colons.
                </>
              ),
            },
            {
              term: (
                <>
                  <Strife /> Conflicte
                </>
              ),
              description: (
                <>
                  Representa la força, voluntat de dominació i capacitat per canalitzar l'agressivitat i el caos de
                  l'imperi. Utilitzar per reclutar soldats i naus, i moure-les sobre el mapa.
                </>
              ),
            },
            {
              term: (
                <>
                  <Resolve /> Determinació
                </>
              ),
              description: (
                <>
                  Comodí, pot utilitzar-se en lloc de qualsevol dels altres impulsos. A més, també pot ser requerit per
                  alguna de les accions de major impacte, com ara l'adquisició de nous trets i arquetips.
                </>
              ),
            },
          ]}
        />
      </Section>

      <Section title="Materials">
        <p>
          Els materials representen les diferents materies primeres que els jugadors poden produir. Solen obtenir-se a
          través d'edifics <em>productius</em>, invertint impulsos <AnyDrive /> i població <Population />.
        </p>
        <DefinitionList
          definitions={[
            {
              term: (
                <>
                  <Food /> Menjar
                </>
              ),
              description: <>S'utilitza per incrementar la població a les ciutats.</>,
            },
            {
              term: (
                <>
                  <Wood /> Fusta
                </>
              ),
              description: <>S'utilitza per construir edificis i vaixells.</>,
            },
            {
              term: (
                <>
                  <Ore /> Mineral
                </>
              ),
              description: <>S'utilitza per construir edificis i reclutar soldats.</>,
            },
            {
              term: (
                <>
                  <Gold /> Or
                </>
              ),
              description: <>Comodí; pot substituir qualsevol altre material.</>,
            },
          ]}
        />
      </Section>

      <Section title="Població">
        <p>
          La població representa la ma d'obra disponible a l'imperi. Als materials del joc es representa amb una icona
          de persona (<Population />
          ). Inicialment, la població resideix a les ciutats dels jugadors; cada ciutat compta amb la seva pròpia
          població independent, que no pot superar el <em>límit de població</em> suportat per la ciutat. Durant la
          partida, aquests habitants podran complir diferents funcions:
        </p>
        <ul>
          <li>Treballar als edificis de la ciutat</li>
          <li>Ser desplegats sobre el mapa com a colons</li>
          <li>Ser desplegats sobre el mapa com a soldats</li>
        </ul>
      </Section>

      <Section title="Glòria">
        <p>
          La glòria representa l'empremta que els imperis deixen a la història. Als materials del joc es representa com
          una corona de llorer (<Glory />
          ).
        </p>
        <p>
          L'objectiu dels jugadors és acumular el màxim de glòria possible abans que s'assoleixi el final de la partida.
        </p>
      </Section>
    </Section>
  </Section>
)
