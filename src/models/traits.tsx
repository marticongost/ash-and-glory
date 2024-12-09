import type { JSXElementConstructor } from "react"
import WarriorsIcon from "@/svg/archetypes/warriors.svg"
import TradersIcon from "@/svg/archetypes/traders.svg"
import AcademicsIcon from "@/svg/archetypes/academics.svg"
import ArchitectsIcon from "@/svg/archetypes/architects.svg"
import TyrantsIcon from "@/svg/archetypes/tyrants.svg"

import { Action, BuildingEnhancement, BuildingWithMinCost, Capability, Passive } from "./capabilities"
import {
  AnyDrive,
  AnyMaterial,
  Curiosity,
  Effort,
  Glory,
  Gold,
  Ore,
  Population,
  Resolve,
  Strife,
  Wood,
} from "@/components/ResourceIcon"
import { buildings, buildingTypes } from "./buildings"

export type ArchetypeId = "warriors" | "traders" | "academics" | "architects" | "tyrants"

export interface ArchetypeProps {
  id: ArchetypeId
  title: string
  icon: JSXElementConstructor<any>
  traits: Omit<TraitProps, "archetype">[]
}

export class Archetype {
  readonly id: ArchetypeId
  readonly title: string
  readonly icon: JSXElementConstructor<any>
  readonly traits: Trait[]

  constructor({ id, title, icon, traits }: ArchetypeProps) {
    this.id = id
    this.title = title
    this.icon = icon
    this.traits = traits.map((traitProps) => new Trait({ ...traitProps, archetype: this }))
  }
}

export type TraitLevel = 1 | 2 | 3

export const levelLabels: Record<TraitLevel, string> = {
  1: "I",
  2: "II",
  3: "III",
}

export interface TraitProps {
  archetype: Archetype
  level: TraitLevel
  id: string
  title: string
  capabilities: Array<Capability>
}

export class Trait {
  readonly archetype: Archetype
  readonly level: TraitLevel
  readonly id: string
  readonly title: string
  readonly capabilities: Capability[]

  constructor({ archetype, level, id, title, capabilities }: TraitProps) {
    this.archetype = archetype
    this.level = level
    this.id = id
    this.title = title
    this.capabilities = capabilities
  }
}

export const archetypes: Record<ArchetypeId, Archetype> = {
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
            target: buildings["city-center"],
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
          new Action({
            id: "warmongers",
            cost: {},
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
          new Action({
            id: "bankers",
            cost: {},
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
          new Action({
            id: "innovation",
            cost: {},
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
            target: buildings.statue,
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
            target: buildings["city-center"],
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
}
