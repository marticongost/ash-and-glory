import { Section } from "@/components/Section"
import styles from "./FoundCityAction.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { Reference } from "@/components/Reference"
import { unitTypes } from "@/models/units"
import { terrainTypes } from "@/models/terrain"
import { buildings } from "@/models/buildings"
import { Glory, Growth, Population } from "@/components/ItemIcon"
import { traitCategories } from "@/models/traits"

export interface FoundCityActionProps extends StandardComponentProps {}

export const FoundCityAction = ({ ...baseProps }: FoundCityActionProps) => (
  <Section {...getStandardAttributes(baseProps, styles.FoundCityAction)} title="Fundar una ciutat">
    <p>
      Les unitats <Reference item={unitTypes.explorer} /> poden dur a terme aquesta acció per fundar una nova ciutat al
      territori on es trobin situades. La unitat és eliminada en el procés, representant un moviment migratori de
      l'imperi que culmina en la creació de la nova població.
    </p>
    <Section title="Requisits">
      <p>Per poder fundar una nova ciutat cal complir els següents requisits:</p>
      <ul>
        <li>
          El territori on es funda la ciutat no pot ser adjacent a cap territori que contingui edificis d'una altra
          ciutat
        </li>
        <li>
          El punt anterior no inclou <strong>característiques d'àrea</strong> que encara no s'hagin incorporat a cap
          ciutat; aquestes característiques no es consideren part d'una ciutat fins que es construeix un edifici en
          contacte amb el seu territori - moment en que són absorvides per la població
        </li>
        <li>El territori on es funda la ciutat ha de tenir un solar lliure</li>
        <li>
          No es poden fundar ciutats a territoris de tipus <Reference item={terrainTypes.wasteland} />
        </li>
        <li>
          Si hi ha unitats militars rivals al territori, els seus propietaris hauran de donar el consentiment a la
          creació de la nova ciutat
        </li>
        <li>
          Si no queden peces de <Reference item={buildings.cityCenter} />, no es podrà fundar la ciutat
        </li>
      </ul>
    </Section>
    <Section title="Cost">
      <p>
        El cost de l'acció s'incrementa proporcionalment a la mida de l'imperi controlat pel jugador. Per cada ciutat
        que el jugador ja controlés <em>abans</em> de la fundació de la nova ciutat, el jugador haurà de pagar un recurs{" "}
        <Growth />.
      </p>
    </Section>
    <Section title="Col·locació de la nova ciutat">
      <p>Un cop fundada la ciutat, s'apliquen els següents efectes:</p>
      <ul>
        <li>
          Es retorna la unitat <Reference item={unitTypes.explorer} /> a la reserva del jugador
        </li>
        <li>
          S'afegeix un edifici <Reference item={buildings.cityCenter} /> al solar on s'ha fundat la ciutat
        </li>
        <li>
          S'afegeix una unitat de <Population /> a la ciutat
        </li>
        <li>
          Es guanya un <Glory /> per cada ciutat que el jugador ja controlés <em>abans</em> de la fundació de la nova
          ciutat
        </li>
      </ul>
    </Section>
  </Section>
)
