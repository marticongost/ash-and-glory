import type { JSXElementConstructor } from "react"
import AdvantageIcon from "@/svg/advantage.svg"
import DisadvantageIcon from "@/svg/disadvantage.svg"
import WarriorsIcon from "@/svg/archetypes/warriors.svg"
import TradersIcon from "@/svg/archetypes/traders.svg"
import AcademicsIcon from "@/svg/archetypes/academics.svg"
import ArchitectsIcon from "@/svg/archetypes/architects.svg"
import TyrantsIcon from "@/svg/archetypes/tyrants.svg"
import FarmersIcon from "@/svg/archetypes/farmers.svg"

import { Action, BuildingEnhancement, BuildingWithMinCost, Capability, Passive } from "./capabilities"
import {
  AnyDrive,
  AnyMaterial,
  Curiosity,
  Effort,
  Food,
  Glory,
  Gold,
  Growth,
  Ore,
  Population,
  Resolve,
  Strife,
  Wood,
} from "@/components/ResourceIcon"
import { buildings, buildingTypes } from "./buildings"
import { Reference } from "@/components/Reference"

export type ArchetypeId = "standard" | "warriors" | "traders" | "academics" | "architects" | "tyrants" | "farmers"
export type TraitCategoryId = ArchetypeId | "advantages" | "disadvantages" | "standard"

export interface TraitsCategoryProps {
  id: TraitCategoryId
  title: string
  traits: Omit<TraitProps, "category">[]
}

export abstract class TraitsCategory {
  readonly id: TraitCategoryId
  readonly title: string
  readonly traits: Trait[]

  constructor({ id, title, traits }: TraitsCategoryProps) {
    this.id = id
    this.title = title
    this.traits = traits.map((props) => new Trait({ ...props, category: this }))
  }

  abstract readonly icon?: JSXElementConstructor<any>
}

export interface ArchetypeProps extends TraitsCategoryProps {
  id: ArchetypeId
  icon: JSXElementConstructor<any>
}

export class Archetype extends TraitsCategory {
  readonly icon: JSXElementConstructor<any>

  constructor({ icon, ...baseProps }: ArchetypeProps) {
    super(baseProps)
    this.icon = icon
  }
}

export interface InnateTraitsCategoryProps extends TraitsCategoryProps {
  id: "advantages" | "disadvantages"
  icon: JSXElementConstructor<any>
}

export class InnateTraitsCategory extends TraitsCategory {
  readonly icon: JSXElementConstructor<any>

  constructor({ icon, ...baseProps }: InnateTraitsCategoryProps) {
    super(baseProps)
    this.icon = icon
  }
}

export class StandardTraitsCategory extends TraitsCategory {
  get icon(): JSXElementConstructor<any> | undefined {
    return undefined
  }
}

export type TraitLevel = 1 | 2 | 3

export const levelLabels: Record<TraitLevel, string> = {
  1: "I",
  2: "II",
  3: "III",
}

export interface TraitProps {
  category: TraitsCategory
  level?: TraitLevel
  id: string
  title: string
  capabilities: Array<Capability>
}

export class Trait {
  readonly category: TraitsCategory
  readonly level?: TraitLevel
  readonly id: string
  readonly title: string
  readonly capabilities: Capability[]

  constructor({ category, level, id, title, capabilities }: TraitProps) {
    this.category = category
    this.level = level
    this.id = id
    this.title = title
    this.capabilities = capabilities
  }
}

export const traitCategories: Record<TraitCategoryId, TraitsCategory> = {
  standard: new StandardTraitsCategory({
    id: "standard",
    title: "Estàndard",
    traits: [
      {
        id: "basic-capabilities",
        title: "Capacitats estàndard",
        capabilities: [
          new Passive({
            id: "storage",
            moment: "turnEnd",
            effect: (
              <>
                Emmagetzemar un <AnyDrive /> i/o un <AnyMaterial />
              </>
            ),
          }),
          new Action({
            id: "acquire-trait",
            cost: { resolve: "1+" },
            effect: (
              <>
                Adquirir un tret. Els primers 3 trets costen <Resolve />; els posteriors, <Resolve amount={2} />.
              </>
            ),
          }),
          new Action({
            id: "flexibility",
            cost: { anyDrive: 2 },
            effect: (
              <>
                Guanyar <Resolve />
              </>
            ),
          }),
          new Action({
            id: "catch-up",
            cost: { anyDrive: 1 },
            effect: (
              <>
                Guanyar <Resolve />. Només pel(s) jugador(s) amb menys <Glory /> a l'inici del torn.
              </>
            ),
          }),
          new Action({
            id: "found-city",
            cost: { growth: "1+" },
            effect: (
              <>
                Substituir un colon propi per una ciutat. El cost és de un <Growth /> per cada ciutat que el jugador ja
                controli. Guanyar la mateixa quantitat en <Glory />.
              </>
            ),
          }),
        ],
      },
    ],
  }),
  advantages: new InnateTraitsCategory({
    id: "advantages",
    title: "Avantatges",
    icon: AdvantageIcon,
    traits: [
      {
        level: 1,
        id: "rich",
        title: "Rics",
        capabilities: [
          new Passive({
            id: "rich",
            moment: "gameStart",
            effect: (
              <>
                Guanyar <Gold amount={2} />
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "rugged",
        title: "Soferts",
        capabilities: [
          new Passive({
            id: "rugged",
            moment: "whenSupportingPopulation",
            effect: <>Permet ignorar la primera penalització del torn per fam.</>,
          }),
        ],
      },
      {
        level: 1,
        id: "mountaineers",
        title: "Muntanyers",
        capabilities: [
          new Passive({
            id: "mountaineers",
            moment: "manouverStage",
            effect: <>El moviment per muntanyes costa un punt de maniobra menys del normal.</>,
          }),
        ],
      },
      {
        level: 1,
        id: "sylvan",
        title: "Silvans",
        capabilities: [
          new Passive({
            id: "sylvan",
            moment: "manouverStage",
            effect: <>El moviment per boscos costa un punt de maniobra menys del normal.</>,
          }),
        ],
      },
      {
        level: 1,
        id: "canibals",
        title: "Caníbals",
        capabilities: [
          new Passive({
            id: "canibals",
            moment: "afterWinningBattle",
            effect: (
              <>
                Guanyar <Food />
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "tough",
        title: "Durs",
        capabilities: [
          new Passive({
            id: "tough",
            moment: "combat",
            effect: <>+1 a la defensa</>,
          }),
        ],
      },
      {
        level: 1,
        id: "skilled",
        title: "Hàbils",
        capabilities: [
          new Passive({
            id: "skilled",
            moment: "gameStart",
            effect: <>Adquirir un tret</>,
          }),
        ],
      },
      {
        level: 1,
        id: "devote",
        title: "Devots",
        capabilities: [
          new Passive({
            id: "devote",
            moment: "gameStart",
            effect: <>Començar amb 2 punts de devoció del déu escollit</>,
          }),
        ],
      },
      {
        level: 1,
        id: "prepared",
        title: "Preparats",
        capabilities: [
          new Passive({
            id: "prepared",
            moment: "gameStart",
            effect: (
              <>
                Guanyar <AnyDrive />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "numerous",
        title: "Numerosos",
        capabilities: [
          new Passive({
            id: "population-gain",
            moment: "gameStart",
            effect: (
              <>
                Guanyar <Population />
              </>
            ),
          }),
          new Passive({
            id: "city-size-limit",
            effect: <>Augmentar la població màxima de les ciutats en 1</>,
          }),
        ],
      },
      {
        level: 2,
        id: "seers",
        title: "Clarividents",
        capabilities: [
          new Action({
            id: "peek-combat-cards",
            moment: "beforeCombat",
            cost: { curiosity: 1 },
            effect: <>Veure la meitat (arrodonint cap a baix) de la ma de cartes de combat del rival.</>,
          }),
          new Passive({
            id: "peek-event-cards",
            moment: "afterEventResolved",
            effect: (
              <>
                Veure les següents dues cartes d'esdeveniment. Barrejar-les, i deixar-ne una sobre el piló i una a sota.
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "resolute",
        title: "Estoics",
        capabilities: [
          new Action({
            id: "resolute",
            moment: "afterEventRevealed",
            cost: { effort: 1 },
            effect: <>Ignorar l'efecte de l'esdeveniment sobre el jugador.</>,
          }),
        ],
      },
      {
        level: 2,
        id: "berserkers",
        title: "Berserkers",
        capabilities: [
          new Passive({
            id: "berserkers",
            moment: "combat",
            effect: <>+2 a l'atac, -1 a la defensa</>,
          }),
        ],
      },
      {
        level: 2,
        id: "amphibious",
        title: "Amfibis",
        capabilities: [
          new Passive({
            id: "amphibious",
            moment: "manouverStage",
            effect: (
              <>
                Permet que els colons i soldats entrin a territoris costers (caselles de mar adjacents a una casella de
                terra), amb un cost de 3 punts de maniobra.
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "expansive",
        title: "Expansius",
        capabilities: [
          new Action({
            id: "expansive",
            cost: { anyDrive: 1 },
            effect: (
              <>
                Guanyar <Growth />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "hard-working",
        title: "Treballadors",
        capabilities: [
          new Action({
            id: "hard-working",
            cost: { anyDrive: 1 },
            effect: (
              <>
                Guanyar <Effort />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "curious",
        title: "Curiosos",
        capabilities: [
          new Action({
            id: "curious",
            cost: { anyDrive: 1 },
            effect: (
              <>
                Guanyar <Curiosity />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "combative",
        title: "Combatius",
        capabilities: [
          new Action({
            id: "combative",
            cost: { anyDrive: 1 },
            effect: (
              <>
                Guanyar <Strife />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "versatile",
        title: "Versàtils",
        capabilities: [
          new Action({
            id: "versatile",
            cost: { anyDrive: 2 },
            effect: (
              <>
                Guanyar <Resolve />
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "born-warriors",
        title: "Guerrers innats",
        capabilities: [
          new Passive({
            id: "born-warriors",
            moment: "combat",
            effect: (
              <>
                +1 a l'atac i la defensa. En robar cartes de combat, robar-ne una addicional i descartar una de les
                cartes robades.
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "powerful-army",
        title: "Exèrcit poderós",
        capabilities: [
          new Passive({
            id: "powerful-army",
            moment: "gameStart",
            effect: <>Desplegar un soldat addicional a la ciutat inicial.</>,
          }),
        ],
      },
      {
        level: 3,
        id: "well-stocked",
        title: "Previsors",
        capabilities: [
          new Passive({
            id: "well-stocked",
            moment: "gameStart",
            effect: (
              <>
                Guanyar <Food /> i afegir un <Reference item={buildings.granary} /> a la ciutat inicial.
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "winged",
        title: "Alats",
        capabilities: [
          new Passive({
            id: "winged",
            moment: "manouverStage",
            effect: (
              <>
                Ignorar les penalitzacions al moviment de boscos i muntanyes. +1 a l'atac i la defensa contra enemics
                que no tinguin aquest avantatge.
              </>
            ),
          }),
        ],
      },
    ],
  }),
  disadvantages: new InnateTraitsCategory({
    id: "disadvantages",
    title: "Desavantatges",
    icon: DisadvantageIcon,
    traits: [
      {
        id: "feeble",
        level: 2,
        title: "Febles",
        capabilities: [
          new Passive({
            id: "feeble",
            moment: "combat",
            effect: "-1 a l'atac i la defensa",
          }),
        ],
      },
      {
        id: "atheist",
        level: 3,
        title: "Ateus",
        capabilities: [
          new Passive({
            id: "atheist",
            effect: (
              <>
                El jugador no pot construir ni utilitzar edificis <em>religiosos</em>
              </>
            ),
          }),
        ],
      },
    ],
  }),
  warriors: new Archetype({
    id: "warriors",
    title: "Guerrers",
    icon: WarriorsIcon,
    traits: [
      {
        level: 1,
        id: "training",
        title: "Entrenament",
        capabilities: [
          new Passive({
            id: "repeat-attack-die",
            moment: "combat",
            effect: <>Permet repetir un dau d'atac en resoldre un combat</>,
          }),
        ],
      },
      {
        level: 1,
        id: "draft",
        title: "Lleva",
        capabilities: [
          new BuildingEnhancement({
            id: "draft",
            target: buildings["cityCenter"],
            capabilities: [
              new Action({
                id: "draft",
                cost: { anyDrive: 1, population: 1 },
                effect: (
                  <>
                    Eliminar un <Population /> i reclutar un soldat a la casella de l'edifici
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 1,
        id: "advanced-logistics",
        title: "Logística avançada",
        capabilities: [
          new Passive({
            id: "advanced-logistics",
            moment: "manouverStage",
            effect: <>Guanyar +1 punt de maniobra per torn</>,
          }),
        ],
      },
      {
        level: 1,
        id: "siege-machines",
        title: "Màquines de guerra",
        capabilities: [
          new Action({
            id: "siege-machines",
            moment: "manouverStage",
            cost: { wood: "1+" },
            effect: (
              <>
                Abans de començar un combat a una ciutat, gastar 1-3 <Wood />. Per cada
                <Wood /> gastat es podrà repetir el resultat d'un dau d'atac
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "warmongers",
        title: "Bel·licosos",
        capabilities: [
          new Passive({
            id: "warmongers",
            moment: "productionStage",
            effect: (
              <>
                Guanyar <Strife />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "expert-blacksmiths",
        title: "Ferrers experts",
        capabilities: [
          new Passive({
            id: "expert-blacksmiths",
            moment: "combat",
            effect: <>+1 a l'atac i la defensa</>,
          }),
        ],
      },
      {
        level: 2,
        id: "subjugators",
        title: "Subjugadors",
        capabilities: [
          new Passive({
            id: "subjugators",
            moment: "afterCityConquered",
            effect: (
              <>
                Guanyar <Glory /> i <Gold />
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "military-theory",
        title: "Teoria militar",
        capabilities: [
          new Action({
            id: "military-theory",
            cost: { strife: 2 },
            effect: (
              <>
                Guanyar <Glory />
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "warlords",
        title: "Senyors de la guerra",
        capabilities: [
          new Action({
            id: "warlords",
            cost: { growth: 1 },
            moment: "afterDestroyingBarbarianCamp",
            effect: (
              <>
                Guanyar <Glory />, un <em>colon</em> i un <em>soldat</em> a la ubicació del camp destruit
              </>
            ),
          }),
        ],
      },
    ],
  }),
  traders: new Archetype({
    id: "traders",
    title: "Comerciants",
    icon: TradersIcon,
    traits: [
      {
        level: 1,
        id: "exporters",
        title: "Exportadors",
        capabilities: [
          new BuildingEnhancement({
            id: "exporters",
            target: buildings.harbour,
            capabilities: [
              new Action({
                id: "export",
                cost: { population: 1, curiosity: 1, anyMaterial: "1+" },
                effect: (
                  <>
                    Guanyar <Gold /> per cada <AnyMaterial />, fins a un màxim igual al nombre de <em>mars</em>{" "}
                    adjacents
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 1,
        id: "hagglers",
        title: "Embaucadors",
        capabilities: [
          new BuildingEnhancement({
            id: "hagglers",
            target: buildings.market,
            capabilities: [
              new Action({
                id: "hagglers",
                cost: { anyDrive: 2 },
                effect: (
                  <>
                    Guanyar <Resolve />
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 1,
        id: "creative-economy",
        title: "Economia creativa",
        capabilities: [
          new Action({
            id: "creative-economy",
            cost: { anyDrive: 1, gold: 1 },
            effect: (
              <>
                Guanyar <Resolve />
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "enterpreneurship",
        title: "Emprenedoria",
        capabilities: [
          new Passive({
            id: "enterpreneurship",
            moment: "whenBuilding",
            effect: (
              <>
                Permet gastar <Curiosity /> com a <AnyMaterial /> a l'hora de pagar el cost d'un edifici{" "}
                <em>econòmic</em>
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "bankers",
        title: "Banquers",
        capabilities: [
          new Passive({
            id: "bankers",
            moment: "productionStage",
            effect: (
              <>
                Guanyar <Gold />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "riches-from-beyond-the-sea",
        title: "Riqueses de més enllà del mar",
        capabilities: [
          new BuildingEnhancement({
            id: "riches-from-beyond-the-sea",
            target: buildings.harbour,
            capabilities: [
              new Action({
                id: "riches-from-beyond-the-sea",
                cost: { curiosity: "1+", population: 1 },
                effect: (
                  <>
                    Guanyar <Gold /> per cada <Curiosity />, fins a un màxim igual al número de mars adjacents al port
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 2,
        id: "reputed-artisans",
        title: "Artesans reputats",
        capabilities: [
          new BuildingEnhancement({
            id: "reputed-artisans",
            target: buildings.workshop,
            capabilities: [
              new Action({
                id: "reputed-artisans",
                cost: { gold: 1, effort: 1 },
                effect: (
                  <>
                    Guanyar <Glory />. Màxim per torn d'un cop per edifici i ruta comercial oberta.
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 3,
        id: "commercial-empire",
        title: "Imperi comercial",
        capabilities: [
          new Action({
            id: "commercial-empire",
            cost: { gold: 2 },
            effect: (
              <>
                Guanyar <Glory />
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "cosmopolitan",
        title: "Cosmopolites",
        capabilities: [
          new Action({
            id: "cosmopolitan",
            cost: { curiosity: "1+" },
            effect: (
              <>
                Guanyar <Resolve />, fins a un màxim igual al nombre de rutes comercials obertes
              </>
            ),
          }),
        ],
      },
    ],
  }),
  academics: new Archetype({
    id: "academics",
    title: "Acadèmics",
    icon: AcademicsIcon,
    traits: [
      {
        level: 1,
        id: "research",
        title: "Recerca",
        capabilities: [
          new Passive({
            id: "research",
            moment: "turnEnd",
            effect: (
              <>
                Cada <em>Universitat</em> pot emmagatzemar un <Curiosity />
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "experimentation",
        title: "Experimentació",
        capabilities: [
          new Action({
            id: "experimentation",
            cost: { curiosity: 1 },
            effect: (
              <>
                Llançar 1d10 i aplicar el resultat indicat:
                <table>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>
                        <h4>Catàstrofe</h4>
                        Perdre un <Population /> a una ciutat
                      </td>
                    </tr>
                    <tr>
                      <th>2-4</th>
                      <td>
                        <h4>Resultat decebedor</h4>
                        Sense efecte
                      </td>
                    </tr>
                    <tr>
                      <th>5-8</th>
                      <td>
                        <h4>Resultat prometedor</h4>
                        Guanyar <AnyDrive /> (qualsevol impuls excepte <Resolve />)
                      </td>
                    </tr>
                    <tr>
                      <th>9</th>
                      <td>
                        <h4>Resultat excepcional</h4>
                        Guanyar <Resolve />
                      </td>
                    </tr>
                    <tr>
                      <th>10</th>
                      <td>
                        <h4>Descobriment inesperat</h4>
                        Guanyar <Glory />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "ingenuity",
        title: "Enginy",
        capabilities: [
          new Action({
            id: "ingenuity",
            cost: { curiosity: 1 },
            effect: (
              <>
                Guanyar <AnyMaterial />
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "scientific-community",
        title: "Comunitat científica",
        capabilities: [
          new Passive({
            id: "scientific-community",
            moment: "whenBuilding",
            effect: (
              <>
                Permet gastar <Curiosity /> en comptes de <AnyMaterial /> en construir edificis <em>acadèmics</em>
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "innovation",
        title: "Innovació",
        capabilities: [
          new Passive({
            id: "innovation",
            moment: "productionStage",
            effect: (
              <>
                Guanyar <Curiosity />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "march-of-progress",
        title: "La marxa del progrés",
        capabilities: [
          new Passive({
            id: "march-of-progress",
            moment: "whenAcquiringTraits",
            effect: (
              <>
                Es pot gastar <Curiosity /> en comptes de <Resolve />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "advanced-materials",
        title: "Materials avançats",
        capabilities: [
          new BuildingEnhancement({
            id: "advanced-materials",
            target: buildings.university,
            capabilities: [
              new Action({
                id: "advanced-materials",
                cost: { curiosity: 1 },
                effect: (
                  <>
                    Guanyar <Gold /> i <Effort />
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 3,
        id: "breakthrough",
        title: "Descobriment revolucionari",
        capabilities: [
          new Action({
            id: "breakthrough",
            cost: { curiosity: 2 },
            effect: (
              <>
                Guanyar <Glory />
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "volumes-of-knowledge",
        title: "Volums de coneixement",
        capabilities: [
          new Passive({
            id: "volumes-of-knowledge",
            moment: "turnStart",
            effect: (
              <>
                Convertir els <Curiosity /> emmagatzemats en <Resolve />
              </>
            ),
          }),
        ],
      },
    ],
  }),
  architects: new Archetype({
    id: "architects",
    title: "Arquitectes",
    icon: ArchitectsIcon,
    traits: [
      {
        level: 1,
        id: "architecture",
        title: "Arquitectura",
        capabilities: [
          new Passive({
            id: "architecture",
            moment: "whenBuilding",
            effect: (
              <>
                Permet gastar <Curiosity /> en comptes de <Ore />
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "urban-planning",
        title: "Planificació urbana",
        capabilities: [
          new Passive({
            id: "urban-planning",
            effect: <>Incrementa en 1 la mida màxima de les ciutats</>,
          }),
        ],
      },
      {
        level: 1,
        id: "sustainability",
        title: "Sostenibilitat",
        capabilities: [
          new Passive({
            id: "susteinability",
            effect: <>Augmenta en 1 el límit de població de les ciutats</>,
          }),
        ],
      },
      {
        level: 1,
        id: "walls",
        title: "Muralles",
        capabilities: [
          new Passive({
            id: "walls",
            effect: <>+1 a la defensa als setges contra les ciutats del jugador</>,
          }),
        ],
      },
      {
        level: 2,
        id: "monumental-splendor",
        title: "Monuments esplendorosos",
        capabilities: [
          new BuildingEnhancement({
            id: "monumental-splendor",
            target: buildings.monument,
            capabilities: [
              new Action({
                id: "monumental-splendor",
                cost: { anyDrive: 1 },
                effect: (
                  <>
                    Guanyar <Resolve />
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 2,
        id: "efficient-construction",
        title: "Construcció eficient",
        capabilities: [
          new Passive({
            id: "efficient-construction",
            effect: (
              <>
                Permet reduir en un <AnyMaterial /> el cost dels edificis amb un cost de 4+ <AnyMaterial />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "roads",
        title: "Carreteres",
        capabilities: [
          new Passive({
            id: "roads",
            moment: "manouverStage",
            effect: (
              <>
                Els exèrcits i colons que comencin el seu moviment a una ciutat del jugador guanyen 2 punts de maniobra.
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "harmonious-cities",
        title: "Ciutats harmonioses",
        capabilities: [
          new Passive({
            id: "harmonious-cities",
            moment: "gameEnd",
            effect: (
              <>
                Cada ciutat amb 5 o més edificis proporciona <Glory />
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "distant-visitors",
        title: "Visitants de terres llunyanes",
        capabilities: [
          new BuildingEnhancement({
            id: "distant-visitors",
            target: new BuildingWithMinCost({ minCost: 5 }),
            capabilities: [
              new Action({
                id: "distant-visitors",
                cost: { growth: 1 },
                effect: (
                  <>
                    Guanyar <Gold /> i <Resolve />. Màxim un cop per torn per edifici i ruta comercial oberta.
                  </>
                ),
              }),
            ],
          }),
        ],
      },
    ],
  }),
  tyrants: new Archetype({
    id: "tyrants",
    title: "Tirans",
    icon: TyrantsIcon,
    traits: [
      {
        level: 1,
        id: "corruption",
        title: "Corrupció",
        capabilities: [
          new Action({
            id: "corruption",
            cost: { glory: 1 },
            effect: (
              <>
                Guanyar <Resolve />
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "slavery",
        title: "Esclavitud",
        capabilities: [
          new Action({
            id: "slavery",
            cost: { strife: 1, population: "1+" },
            effect: (
              <>
                Guanyar <Gold /> per cada <Population />
              </>
            ),
          }),
        ],
      },
      {
        level: 1,
        id: "bleed-the-people",
        title: "Munyir el poble",
        capabilities: [
          new BuildingEnhancement({
            id: "bleed-the-people",
            target: buildings["cityCenter"],
            capabilities: [
              new Action({
                id: "bleed-the-people",
                cost: { strife: "1+" },
                effect: (
                  <>
                    Guanyar <Gold /> per cada <Strife />, fins a un màxim dels edificis
                    <em>militars</em> a la ciutat
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 1,
        id: "strike-fear",
        title: "Infondre por",
        capabilities: [
          new BuildingEnhancement({
            id: "strike-fear",
            target: buildingTypes.government,
            capabilities: [
              new Passive({
                id: "strike-fear",
                moment: "turnEnd",
                effect: (
                  <>
                    Emmgatzemar un <Strife />
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 2,
        id: "autocracy",
        title: "Autocràcia",
        capabilities: [
          new Action({
            id: "autocracy",
            cost: { population: 1 },
            effect: (
              <>
                Guanyar <Resolve />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "blind-obedience",
        title: "Obediència cega",
        capabilities: [
          new Action({
            id: "blind-obedience",
            moment: "afterActionExecuted",
            cost: { strife: 1 },
            effect: (
              <>
                Permet tornar a executar l'acció una segona vegada durant el torn en curs. No pot aplicar-se a{" "}
                <em>Obediència cega</em>.
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "leader-cult",
        title: "Culte al líder",
        capabilities: [
          new Passive({
            id: "leader-cult",
            effect: (
              <>
                Redueix en <AnyMaterial /> el cost dels edificis <em>governamentals</em>
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "absolute-power",
        title: "Poder absolut",
        capabilities: [
          new Action({
            id: "absolute-power",
            cost: { population: 1, anyDrive: 2 },
            effect: (
              <>
                Guanyar <Glory />
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "reign-of-terror",
        title: "Regnat de terror",
        capabilities: [
          new Passive({
            id: "reign-of-terror",
            moment: "turnStart",
            effect: (
              <>
                Convertir els <Strife /> emmagatzemats en <Resolve />
              </>
            ),
          }),
        ],
      },
    ],
  }),
  farmers: new Archetype({
    id: "farmers",
    title: "Grangers",
    icon: FarmersIcon,
    traits: [
      {
        level: 1,
        id: "shepherds",
        title: "Ramaders",
        capabilities: [
          new BuildingEnhancement({
            id: "shepherds",
            target: buildings.farm,
            capabilities: [
              new Passive({
                id: "shepherds",
                effect: <>Permet comptar les muntanyes com si fossin camps</>,
              }),
            ],
          }),
        ],
      },
      {
        level: 1,
        id: "huners",
        title: "Caçadors",
        capabilities: [
          new BuildingEnhancement({
            id: "hunters",
            target: buildings.farm,
            capabilities: [
              new Passive({
                id: "shepherds",
                effect: <>Permet comptar els boscos com si fossin camps</>,
              }),
            ],
          }),
        ],
      },
      {
        level: 1,
        id: "intensive-agriculture",
        title: "Agricultura intensiva",
        capabilities: [
          new BuildingEnhancement({
            id: "intensive-agriculture",
            target: buildings.farm,
            capabilities: [
              new Passive({
                id: "shepherds",
                moment: "whenBuilding",
                effect: (
                  <>
                    Reduir el cost de construcció en <AnyMaterial />
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 1,
        id: "crop-rotation",
        title: "Rotació de conreus",
        capabilities: [
          new BuildingEnhancement({
            id: "crop-rotation",
            target: buildings.granary,
            capabilities: [
              new Passive({
                id: "crop-rotation",
                moment: "turnEnd",
                effect: (
                  <>
                    Permet emmagatzemar un <Growth />
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 2,
        id: "fertility",
        title: "Fertilitat",
        capabilities: [
          new Passive({
            id: "fertility",
            moment: "productionStage",
            effect: (
              <>
                Guanyar <Growth />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "festival",
        title: "Festival",
        capabilities: [
          new Action({
            id: "festival",
            cost: { food: "2+" },
            effect: (
              <>
                Guanyar <Resolve /> per cada <Food amount={2} />
              </>
            ),
          }),
        ],
      },
      {
        level: 2,
        id: "exceptional-chefs",
        title: "Xefs excepcionals",
        capabilities: [
          new BuildingEnhancement({
            id: "exceptional-chefs",
            target: buildings.workshop,
            capabilities: [
              new Action({
                id: "exceptional-chefs",
                cost: { food: 1, effort: 1 },
                effect: (
                  <>
                    Guanyar <Glory />. Màxim per torn d'un cop per edifici i ruta comercial oberta.
                  </>
                ),
              }),
            ],
          }),
        ],
      },
      {
        level: 3,
        id: "abundance",
        title: "Abundància",
        capabilities: [
          new Action({
            id: "abundance",
            cost: { growth: 2 },
            effect: (
              <>
                Guanyar <Glory />
              </>
            ),
          }),
        ],
      },
      {
        level: 3,
        id: "sustained-growth",
        title: "Creixement sostingut",
        capabilities: [
          new Passive({
            id: "sustained-growth",
            moment: "turnStart",
            effect: (
              <>
                Convertir els <Growth /> emmagatzemats en <Resolve />
              </>
            ),
          }),
        ],
      },
    ],
  }),
}
