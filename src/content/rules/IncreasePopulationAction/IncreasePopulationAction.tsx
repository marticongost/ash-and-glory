import { Section } from "@/components/Section"
import styles from "./IncreasePopulationAction.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { Reference } from "@/components/Reference"
import { resources } from "@/models/resources"
import { buildings } from "@/models/buildings"
import { initialCityMaxPopulation } from "@/models/values"

export interface IncreasePopulationActionProps extends StandardComponentProps {}

export const IncreasePopulationAction = ({ ...baseProps }: IncreasePopulationActionProps) => (
  <Section {...getStandardAttributes(baseProps, styles.IncreasePopulationAction)} title="Augmentar la població">
    <p>
      Alguns edificis, com ara el <Reference item={buildings.cityCenter} />, proporcionen una acció que permet augmentar
      la població de la ciutat. Per fer-ho, el jugador exhaureix l'edifici i paga el cost de l'acció de la forma
      habitual, i a continuació incrementa la població de la ciutat en una unitat de{" "}
      <Reference item={resources.population} />.
    </p>
    <Section title="Límit de població">
      <p>
        Les ciutats tenen un límit de població. Si la ciutat ha assolit el límit, no podrà executar-se aquesta acció
        fins que la població disminueixi per sota el límit o s'incrementi el límit. Inicialment, el límit és de{" "}
        {initialCityMaxPopulation}, però alguns trets i edificis (com ara <Reference item={buildings.housing} />)
        permeten incrementar-lo.
      </p>
    </Section>
  </Section>
)
