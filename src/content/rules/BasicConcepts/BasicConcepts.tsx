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
  <Section {...getStandardAttributes(baseProps, styles.BasicConcepts)} title="Conceptes bàsics">
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
                  crear exploradors.
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
          de persona <Population />. Inicialment, la població resideix a les ciutats dels jugadors; cada ciutat compta
          amb la seva pròpia població independent, que no pot superar el <em>límit de població</em> suportat per la
          ciutat. Durant la partida, aquests habitants podran complir diferents funcions:
        </p>
        <ul>
          <li>Treballar als edificis de la ciutat</li>
          <li>Ser desplegats sobre el mapa com a exploradors</li>
          <li>Ser desplegats sobre el mapa com a soldats</li>
        </ul>
      </Section>

      <Section title="Glòria">
        <p>
          La glòria representa l'empremta que els imperis deixen a la història. Als materials del joc es representa com
          una corona de llorer <Glory />.
        </p>
        <p>
          L'objectiu dels jugadors és acumular el màxim de glòria possible abans que s'assoleixi el final de la partida.
        </p>
      </Section>
    </Section>
    <Section title="Ciutats">
      <p>
        Les ciutats representen els centres de població i poder dels imperis sobre el mapa. Contenen una sèrie
        d'edificis i una quantitat de població <Population />.
      </p>
    </Section>
    <Section title="Edificis">
      <p>
        Els edificis s'ubiquen a les ciutats dels jugadors, i representen els diferents focus i capacitats de les
        mateixes. A mida que el joc progressi, els jugadors faran créixer les seves ciutats afegint-hi nous edificis,
        que els permetran produir més recursos i accedir a noves capacitats i accions.
      </p>
    </Section>
    <Section title="Trets i arquetips">
      <p>
        Cada imperi comptarà amb un seguit de <em>trets</em>, que representen les seves àrees de focus i interès, les
        particularitats de la seva cultura i fortaleses i debilitats que els fan únics.
      </p>
      <p>
        Cada imperi comença amb un conjunt de trets, que els proporcionen certs avantatges i desavantatges. Per exemple,
        un imperi podria ser ric, i començar amb més or que els demés; però per contra, els seus habitants podrien
        tendir a ser golafres, invertint més recursos dels que caldria en proveïr-se de grans quantitats de menjar.
      </p>
      <p>
        Al llarg de la partida els jugadors poden optar a obtenir nous trets, per guanyar noves habilitats i capacitats
        especials. Aquests trets s'organitzen en <em>arquetips</em>, que representen conjunts temàtics relacionats en
        que els imperis poden aprofundir. Per exemple, un imperi podria tenir especial interès en comerciar amb els
        demés jugadors, i podria adquirir trets de l'arquetip <em>Comerciants</em> per guanyar capacitats relacionades
        amb l'establiment de rutes comercials; un altre imperi podria preferir una estratègia més agressiva, adquirint
        trets de l'arquetip <em>Guerrers</em> per millorar les seves capacitats ofensives. Els jugadors poden combinar
        aquests arquetips lliurement per personalitzar i modelar el seu imperi.
      </p>
    </Section>
  </Section>
)
