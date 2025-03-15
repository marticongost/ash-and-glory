import { Section } from "@/components/Section"
import styles from "./BuildAction.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { Reference } from "@/components/Reference"
import { buildings } from "@/models/buildings"
import { maxCitySize } from "@/models/values"

export interface BuildActionProps extends StandardComponentProps {}

export const BuildAction = ({ ...baseProps }: BuildActionProps) => (
  <Section {...getStandardAttributes(baseProps, styles.BuildAction)} title="Construir edificis">
    <p>
      Els edificis <Reference item={buildings.cityCenter} /> proporcionen una acció que permet ampliar la ciutat
      construint nous edificis. Per fer-ho, el jugador exhaureix el <Reference item={buildings.cityCenter} /> de la
      forma habitual, i a continuació escull un o més edifics que vulgui construir, d'entre tots els disponibles (veure
      el full de referència d'edificis).
    </p>
    <Section title="Cost de la construcció">
      <p>
        Tot i que l'acció en sí és gratuïta, cada un dels edificis escollits té un cost, que s'indica al full de
        referència. El jugador haurà de pagar tants recursos com la suma total de tots els edificis que vulgui construir
        aquell torn.
      </p>
    </Section>
    <Section title="Territoris vàlids">
      <p>Cada edifici construit s'ha d'afegir a un territori que compleixi les següents condicions:</p>
      <ul>
        <li>Ha d'estar en contacte amb qualsevol dels edificis prèviament construits a la ciutat</li>
        <li>No pot ser adjacent a una altra ciutat</li>
        <li>
          No pot estar ocupat per unitats militars d'un adversari, a menys que el seu propietari doni el seu
          consentiment a la construcció
        </li>
        <li>
          Ha de comptar amb un solar lliure. Alternativament, com a part de l'acció de construcció, el jugador pot
          decidir derribar qualsevol nombre d'edificis anteriorment construits per fer lloc als nous edificis.
        </li>
        <li>
          Compleix qualsevol restricció específica aplicable a l'edifici seleccionat; per exemple, alguns edificis només
          es poden construir una vegada per ciutat, o requereixen estar en contacte amb un tipus de terreny particular
        </li>
      </ul>
      <p>
        Si es construeixen múltiples edificis es poden repartir en territoris diferents, sempre que cadascun compleixi
        les condicions anteriors.
      </p>
    </Section>
    <Section title="Mida màxima de la ciutat">
      <p>
        Cal tenir present que les ciutats tenen una mida màxima. Normalment aquest límit és de {maxCitySize}, tot i que
        alguns trets el poden augmentar o reduir. Si una ciutat ha assolit la seva mida màxima, ja no s'hi podran
        construir edificis a nous solars; només es podran derribar edificis anteriorment construits per substituir-los
        per altres.
      </p>
    </Section>
    <Section title="Col·locació dels edificis">
      <p>
        Un cop escollits els edificis i pagats els seus costos, el jugador col·loca les peces d'efici corresponents als
        territoris seleccionats.
      </p>
      <p>
        Cal tenir present que la quantitat de peces de cada tipus d'edifici és limitada; si no queden peces d'un tipus,
        ja no es podrà construir aquell edifici (a menys que un jugador decideixi derribar-ne un).
      </p>
    </Section>
  </Section>
)
