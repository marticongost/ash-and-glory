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
  Explorer,
  Food,
  Glory,
  Gold,
  Growth,
  Infantry,
  Militia,
  Ore,
  Population,
  PopulationLoss,
  Resolve,
  SeaHex,
  Strife,
  WastelandHex,
  Wood,
} from "@/components/ItemIcon"
import { buildings, buildingTypes } from "./buildings"
import { Reference } from "@/components/Reference"
import { areaTypes } from "./areas"

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
            moment: "chapterEnd",
            effect: (
              <>
                Emmagetzemar un <AnyDrive /> i/o fins a <AnyMaterial amount={2} />
              </>
            ),
          }),
          new Action({
            id: "acquire-trait",
            cost: { resolve: "X" },
            effect: <>Adquirir un tret de nivell X.</>,
          }),
          new Action({
            id: "flexibility",
            timing: "instant",
            cost: { anyDrive: 2 },
            effect: (
              <>
                Guanyar <Resolve />
              </>
            ),
          }),
          new Action({
            id: "catch-up",
            timing: "instant",
            cost: { anyDrive: 1 },
            effect: (
              <>
                Guanyar <Resolve />. Només pel(s) jugador(s) amb menys <Glory />.
              </>
            ),
          }),
          new Action({
            id: "found-city",
            cost: { growth: "1+" },
            effect: (
              <>
                Substituir un explorador propi per una ciutat. El cost és de un <Growth /> per cada ciutat que el
                jugador ja controli. Guanyar la mateixa quantitat en <Glory />.
              </>
            ),
          }),
          new Action({
            id: "becomeFirstPlayer",
            cost: { anyDrive: 1 },
            effect: (
              <>
                Convertir-se en el primer jugador. No es pot utilitzar si un altre jugador ja l'ha utilitzat durant el
                capítol en curs.
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
            effect: <>Permet ignorar la primera penalització del capítol per fam.</>,
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
            timing: "reaction",
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
            timing: "reaction",
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
            effect: (
              <>
                Permet que les unitats terrestres entrin a territoris costers (caselles de mar adjacents a una casella
                de terra), amb un cost de 3 punts de maniobra.
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
            timing: "instant",
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
            timing: "instant",
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
            timing: "instant",
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
            timing: "instant",
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
            timing: "instant",
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
            effect: (
              <>
                Desplegar un <Infantry /> addicional a la ciutat inicial.
              </>
            ),
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
        id: "helpless",
        level: 1,
        title: "Indefensos",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "gameStart",
            effect: <>Es comença la partida sense soldats</>,
          }),
        ],
      },
      {
        id: "divided",
        level: 1,
        title: "Dividits",
        capabilities: [
          new Passive({
            id: "setup",
            moment: "gameStart",
            effect: <>Colocar dos marcadors sobre la carta</>,
          }),
          new Passive({
            id: "penalty",
            effect: (
              <>
                Mentre la carta tingui marcadors, no es poden utilitzar recursos <Resolve />
              </>
            ),
          }),
          new Action({
            id: "discard",
            cost: { strife: 1 },
            effect: (
              <>
                Retirar un marcador. Si era l'últim, guanyar <Resolve />
              </>
            ),
          }),
        ],
      },
      {
        id: "secluded",
        level: 1,
        title: "Tancats",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "gameStart",
            effect: <>Es comença la partida amb 2 territoris menys</>,
          }),
        ],
      },
      {
        id: "isolationists",
        level: 1,
        title: "Aïllacionistes",
        capabilities: [
          new Passive({
            id: "penalty",
            effect: (
              <>
                Desplegar <Explorer /> costa <Resolve /> en comptes de <Curiosity />
              </>
            ),
          }),
        ],
      },
      {
        id: "cowards",
        level: 1,
        title: "Covards",
        capabilities: [
          new Passive({
            id: "penalty",
            effect: (
              <>
                Combatre contra cartes d'
                <Reference item={areaTypes.threat} /> costa un <Strife /> addicional
              </>
            ),
          }),
        ],
      },
      {
        id: "undead",
        level: 1,
        title: "No morts",
        capabilities: [
          new Passive({
            id: "dontRequireFood",
            effect: (
              <>
                No es pot guanyar <Food />, ni construir <Reference item={buildings.farm} /> o{" "}
                <Reference item={buildings.granary} />.
              </>
            ),
          }),
          new Action({
            id: "reanimate",
            cost: { anyDrive: "X" },
            effect: (
              <>
                Guanyar X <Population /> a la ciutat
              </>
            ),
          }),
          new Action({
            id: "reanimateFallen",
            moment: "afterWinningBattle",
            timing: "reaction",
            cost: { anyDrive: "X" },
            effect: (
              <>
                Guanyar X <Militia /> a l'exèrcit (màxim igual al número d'unitats eliminades)
              </>
            ),
          }),
        ],
      },
      {
        id: "daredevils",
        level: 1,
        title: "Temeraris",
        capabilities: [
          new Passive({
            id: "daredevils",
            effect: <>-1 a la defensa</>,
          }),
        ],
      },
      {
        id: "talasofobia",
        level: 1,
        title: "Talassofòbia",
        capabilities: [
          new Passive({
            id: "penalty",
            effect: (
              <>
                Els moviments per <SeaHex /> costen un punt de maniobra addicional
              </>
            ),
          }),
        ],
      },
      {
        id: "chaotic",
        level: 1,
        title: "Caòtics",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "whenChoosingFocus",
            effect: <>S'ha d'agafar sempre la primera carta de focus</>,
          }),
        ],
      },
      {
        id: "codeOfHonor",
        level: 1,
        title: "Codi d'honor",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "afterLoosingBattle",
            effect: (
              <>
                Perdre un punt de <Glory />
              </>
            ),
          }),
        ],
      },
      {
        id: "poorLands",
        level: 2,
        title: "Terres pobres",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "gameStart",
            effect: (
              <>
                Substituir dos dels territoris inicials per <WastelandHex />
              </>
            ),
          }),
        ],
      },
      {
        id: "sinners",
        level: 2,
        title: "Pecadors",
        capabilities: [
          new Passive({
            id: "setup",
            moment: "gameStart",
            effect: <>Colocar un marcador a la carta</>,
          }),
          new Passive({
            id: "penalty",
            effect: (
              <>
                Mentre la carta tingui el marcador, el jugador no pot guanyar <Glory />
              </>
            ),
          }),
          new Action({
            id: "redemption",
            cost: { resolve: 2 },
            effect: <>Retirar el marcador</>,
          }),
        ],
      },
      {
        id: "wasteful",
        level: 2,
        title: "Malgastadors",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "chapterStart",
            effect: (
              <>
                Descartar un <AnyMaterial /> emmagatzemat
              </>
            ),
          }),
        ],
      },
      {
        id: "obtuse",
        level: 2,
        title: "Obtusos",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "whenChoosingFocus",
            effect: <>No es pot escollir la última carta revel·lada</>,
          }),
        ],
      },
      {
        id: "ostentatious",
        level: 2,
        title: "Ostentadors",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "gameEnd",
            effect: (
              <>
                Si el jugador té menys de 3 edificis <Reference item={buildingTypes.monumental} />, perdre dos punts de{" "}
                <Glory /> per cada edifici que li falti.
              </>
            ),
          }),
        ],
      },
      {
        id: "gluttons",
        level: 2,
        title: "Golafres",
        capabilities: [
          new Action({
            id: "staveOff",
            cost: { food: 1 },
            effect: <>Afegir un marcador a aquesta carta</>,
          }),
          new Passive({
            id: "penalty",
            moment: "gameEnd",
            effect: (
              <>
                Si hi ha menys de 6 marcadors a la carta, perdre un punt de <Glory /> per cada marcador que falti.
              </>
            ),
          }),
        ],
      },
      {
        id: "greedy",
        level: 2,
        title: "Avariciosos",
        capabilities: [
          new Action({
            id: "staveOff",
            cost: { gold: 1 },
            effect: <>Afegir un marcador a aquesta carta</>,
          }),
          new Passive({
            id: "penalty",
            moment: "gameEnd",
            effect: (
              <>
                Si hi ha menys de 4 marcadors a la carta, perdre un punt de <Glory /> per cada marcador que falti.
              </>
            ),
          }),
        ],
      },
      {
        id: "megalomaniacs",
        level: 2,
        title: "Megalòmans",
        capabilities: [
          new Action({
            id: "staveOff",
            cost: { resolve: 1 },
            effect: <>Afegir un marcador a aquesta carta</>,
          }),
          new Passive({
            id: "penalty",
            moment: "gameEnd",
            effect: (
              <>
                Si hi ha menys de 4 marcadors a la carta, perdre un punt de <Glory /> per cada marcador que falti.
              </>
            ),
          }),
        ],
      },
      {
        id: "bloodlust",
        level: 2,
        title: "Sed de sang",
        capabilities: [
          new Action({
            id: "staveOff",
            moment: "afterBattle",
            cost: { resolve: 1 },
            effect: <>Afegir un marcador a aquesta carta</>,
          }),
          new Passive({
            id: "penalty",
            moment: "gameEnd",
            effect: (
              <>
                Si hi ha menys de 4 marcadors a la carta, perdre un punt de <Glory /> per cada marcador que falti.
              </>
            ),
          }),
        ],
      },
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
        id: "centralists",
        level: 2,
        title: "Centralistes",
        capabilities: [
          new Passive({
            id: "centralists",
            effect: (
              <>
                La ciutat inicial del jugador es considera la seva capital. En construir en altres ciutats, no es poden
                construir edificis <Reference item={buildingTypes.monumental} />,{" "}
                <Reference item={buildingTypes.academic} /> o <Reference item={buildingTypes.economic} /> si la capital
                no compta amb una còpia del mateix edifici. A més, la mida de les ciutats secundàries mai podrà igualar
                o superar la de la capital.
              </>
            ),
          }),
        ],
      },
      {
        id: "perfectionists",
        level: 2,
        title: "Perfeccionistes",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "gameEnd",
            effect: (
              <>
                Si el jugador té menys de 2 trets de nivell 3, perdre 3 <Glory /> per cada tret que li falti
              </>
            ),
          }),
        ],
      },
      {
        id: "dogmatic",
        level: 3,
        title: "Dogmàtics",
        capabilities: [
          new Passive({
            id: "penalty",
            moment: "gameEnd",
            effect: (
              <>
                Designar un dels arquetips posseïts com a arquetip principal. Si s'han adquirit trets d'altres
                arquetips, perdre tants punts de <Glory /> com la suma total de tots els seus nivells.
              </>
            ),
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
      {
        id: "infertile",
        level: 3,
        title: "Infèrtils",
        capabilities: [
          new Passive({
            id: "limitation",
            effect: (
              <>
                No es pot utilitzar <Resolve /> per pagar costos de <Growth />
              </>
            ),
          }),
        ],
      },
      {
        id: "lazy",
        level: 3,
        title: "Dropos",
        capabilities: [
          new Passive({
            id: "limitation",
            effect: (
              <>
                No es pot utilitzar <Resolve /> per pagar costos de <Effort />
              </>
            ),
          }),
        ],
      },
      {
        id: "reactionary",
        level: 3,
        title: "Reaccionaris",
        capabilities: [
          new Passive({
            id: "limitation",
            effect: (
              <>
                No es pot utilitzar <Resolve /> per pagar costos de <Curiosity />
              </>
            ),
          }),
        ],
      },
      {
        id: "pacifists",
        level: 3,
        title: "Pacifistes",
        capabilities: [
          new Passive({
            id: "limitation",
            effect: (
              <>
                No es pot utilitzar <Resolve /> per pagar costos de <Strife />
              </>
            ),
          }),
        ],
      },
      {
        id: "hermetic",
        level: 3,
        title: "Hermètics",
        capabilities: [
          new Passive({
            id: "penalty",
            effect: <>El jugador no pot establir o beneficiar-se de rutes comercials</>,
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
                cost: { strife: 1 },
                effect: (
                  <>
                    Reclutar <Militia /> a l'edifici
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
            effect: <>Guanyar +1 punt de maniobra per capítol</>,
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
            cost: { wood: "1+" },
            timing: "reaction",
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
            timing: "reaction",
            effect: (
              <>
                Guanyar <Glory />, <Explorer /> i <Militia /> a la ubicació del camp destruit
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
                cost: { population: 1, curiosity: 1, anyMaterial: "X", seaHex: "X" },
                timing: "instant",
                effect: (
                  <>
                    Guanyar X <Gold />
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
                timing: "instant",
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
            timing: "instant",
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
            moment: "chapterStart",
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
                timing: "instant",
                cost: { curiosity: "X", population: 1, seaHex: "X" },
                effect: (
                  <>
                    Guanyar X <Gold />
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
                    Guanyar <Glory />. Màxim per capítol d'un cop per edifici i ruta comercial oberta.
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
            timing: "instant",
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
            moment: "chapterEnd",
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
                        <PopulationLoss />
                      </td>
                    </tr>
                    <tr>
                      <th>2-4</th>
                      <td>Sense efecte</td>
                    </tr>
                    <tr>
                      <th>5-8</th>
                      <td>
                        <AnyDrive /> (excepte <Resolve />)
                      </td>
                    </tr>
                    <tr>
                      <th>9</th>
                      <td>
                        Guanyar <Resolve />
                      </td>
                    </tr>
                    <tr>
                      <th>10</th>
                      <td>
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
            timing: "instant",
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
            moment: "chapterStart",
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
                timing: "instant",
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
            moment: "chapterStart",
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
                timing: "instant",
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
            effect: (
              <>
                Els exèrcits i exploradors que comencin el seu moviment a una ciutat del jugador guanyen 2 punts de
                maniobra.
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
                timing: "instant",
                cost: { growth: 1 },
                effect: (
                  <>
                    Guanyar <Gold /> i <Resolve />. Màxim un cop per capítol per edifici i ruta comercial oberta.
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
            timing: "instant",
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
            timing: "instant",
            cost: { strife: 1, population: "X" },
            effect: (
              <>
                Guanyar X <Gold />
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
                timing: "instant",
                cost: { strife: "X" },
                effect: (
                  <>
                    Guanyar X <Gold />, fins a un màxim igual als edificis
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
                moment: "chapterEnd",
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
            timing: "instant",
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
            timing: "reaction",
            cost: { strife: 1 },
            effect: (
              <>
                L'acció executada no s'exhaureix, i podrà tornar a executar-se durant el capítol en curs (no afegir el
                marcador d'acció executada sobre la carta, ni girar l'edifici a la banda exhaurida, si es tracta d'una
                acció d'edifici). No pot aplicar-se a <em>Obediència cega</em>.
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
            moment: "chapterStart",
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
                moment: "chapterEnd",
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
            timing: "instant",
            cost: { food: "2X" },
            effect: (
              <>
                Guanyar X <Resolve />
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
                cost: { food: 1, effort: 1, population: 1 },
                effect: (
                  <>
                    Guanyar <Glory />. Màxim per capítol d'un cop per edifici i ruta comercial oberta.
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
            moment: "chapterStart",
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
