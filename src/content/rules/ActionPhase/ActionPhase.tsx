import styles from "./ActionPhase.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { Section } from "@/components/Section"
import ActionIcon from "@/svg/action-timing/action.svg"
import InstantIcon from "@/svg/action-timing/instant.svg"
import ReactionIcon from "@/svg/action-timing/reaction.svg"
import { Reference } from "@/components/Reference"
import { Action, actionTimings } from "@/models/capabilities"
import {
  AnyDrive,
  AnyMaterial,
  Curiosity,
  Effort,
  Food,
  ForestHex,
  Gold,
  GrasslandHex,
  Growth,
  MountainHex,
  Ore,
  Population,
  PopulationLoss,
  Resolve,
  SeaHex,
  Strife,
  WastelandHex,
  Wood,
} from "@/components/ItemIcon"
import { population, populationLoss, resources } from "@/models/resources"
import { unitTypes } from "@/models/units"
import { Example } from "@/components/Example"
import { ResourceSetDisplay } from "@/components/ResourceSetDisplay"
import { CapabilityDisplay } from "@/components/CapabilityDisplay"
import { HexMap } from "@/components/HexMap"
import { HexSet, HexSetBuilder } from "@/modules/hex"
import { Territory } from "@/modules/map"
import { terrainTypes } from "@/models/terrain"
import { buildings } from "@/models/buildings"
import { PlayerReference } from "@/components/PlayerReference"

export interface ActionPhaseProps extends StandardComponentProps {}

export const ActionPhase = ({ ...baseProps }: ActionPhaseProps) => (
  <Section {...getStandardAttributes(baseProps, styles.FocusPhase)} title="Fase d'acció">
    <p>
      En aquesta fase, els jugadors s'alternen en ordre de joc per activar les capacitats proporcionades pels seus trets
      i edificis.
    </p>

    <Section title="Passar">
      <p>
        Durant el seu torn, un jugador pot decidir renunciar al seu torn i <em>passar</em>. Normalment ho farà quan ja
        no disposi de més accions a executar, o no pugui pagar-ne el cost associat - però també es pot fer
        voluntàriament, per cedir la iniciativa als rivals i reaccionar a les seves decisions.
      </p>
      <p>
        Sigui com sigui, un jugador que passi no durà a terme cap acció, i finalitzarà el seu torn immediatament. El
        torn passarà al següent jugador, en ordre de joc.
      </p>
      <p>
        Si tots els jugadors passen de forma consecutiva, la Fase d'Acció conclourà, i el capítol continuarà amb la
        següent fase (la Fase de Neteja).
      </p>
    </Section>
    <Section title="Accions">
      <p>
        Si un jugador no ha passat, haurà de dur a terme una o més <em>accions</em>.
      </p>
      <Section title="Temps de les accions">
        <p>Segons el moment i velocitat amb que s'executen, les accions es classifiquen en els següents tipus:</p>
        <ul>
          <li>
            <Reference item={actionTimings.action} />: les accions més importants i decisives, sovint amb un efecte
            directe o indirecte sobre els demés jugadors. No es permet executar més d'una acció principal durant un
            mateix torn.
          </li>
          <li>
            <Reference item={actionTimings.instant} />: accions ràpides, de caire productiu i/o complementari. Se'n
            poden executar tantes per torn com es vulgui.
          </li>
          <li>
            <Reference item={actionTimings.reaction} />: accions desencadenades per una situació específica. A menys que
            s'indiqui el contrari, la seva aplicació és obligatòria, i es durà a terme immediatament després de la
            condició que l'activa, tants cops per torn com es compleixi la condició.
          </li>
        </ul>
        <p>
          El jugador podrà combinar accions de diferents tipus a la seva conveniència i en l'ordre que desitgi, sempre
          que es respectin els límits indicats per cada tipus d'acció, i se'n pugui pagar el cost.
        </p>
      </Section>
      <Section title="Origen de les accions">
        <p>Segons qui les confereixi, les accions es poden classificar en els següents tipus:</p>
        <ul>
          <li>
            <strong>Accions d'edifici</strong>: Accions vinculades als edificis construits pels jugadors a les seves
            ciutats. En executar una d'aquestes accions, cal seleccionar i <em>exhaurir</em> un edifici propi del tipus
            corresponent. Si el jugador no disposa d'edificis no exhaurits d'aquell tipus, no podrà dur a terme l'acció.
          </li>
          <li>
            <strong>Accions de tret</strong>: Accions vinculades als trets adquirits pels jugadors. Les accions{" "}
            <ActionIcon /> i <InstantIcon /> d'aquest tipus es poden executar un sol cop per capítol.
          </li>
        </ul>
      </Section>
      <Section title="Cost de les accions">
        <p>
          La majoria d'accions tenen un cost que els jugadors hauran de pagar per poder-les executar. El cost es denota
          a continuació del tipus de l'acció, com un seguit d'icones de recursos precedint a una icona de fletxa.
        </p>
        <p>A continuació es descriuen els diferents tipus de costos i com satisfer-los.</p>
        <Section title="Quantitats">
          <p>
            La <em>quantitat</em> de recursos que caldrà invertir per satisfer el cost d'una acció es pot especificar de
            diverses formes, tal i com es detalla als següents exemples:
          </p>
          <table>
            <tbody>
              <tr>
                <td>
                  <CapabilityDisplay capability={new Action({ id: "example1", cost: { wood: 1 }, effect: "..." })} />
                </td>
                <td>
                  Aquesta acció requereix gastar una única unitat de <Reference item={resources.wood} />.
                </td>
              </tr>
              <tr>
                <td>
                  <CapabilityDisplay
                    capability={new Action({ id: "example", cost: { food: 2, gold: 1 }, effect: "..." })}
                  />
                </td>
                <td>
                  Aquesta acció requereix gastar dues unitats de <Reference item={resources.food} /> i una d'
                  <Reference item={resources.gold} />.
                </td>
              </tr>
              <tr>
                <td>
                  <CapabilityDisplay
                    capability={new Action({ id: "example", cost: { population: "1+" }, effect: "..." })}
                  />
                </td>
                <td>
                  Aquesta acció té un cost variable, de com a mínim una unitat de{" "}
                  <Reference item={resources.population} />. Segons circumstàncies i factors indicats per l'acció, el
                  cost pot ser més elevat.
                </td>
              </tr>
              <tr>
                <td>
                  <CapabilityDisplay capability={new Action({ id: "example", cost: { effort: "X" }, effect: "..." })} />
                </td>
                <td>
                  Aquesta acció requereix gastar tants recursos <Reference item={resources.effort} /> com el jugador
                  vulgui. Com més recursos s'inverteixin, més potent serà l'efecte (tal com es descriurà al detall de
                  l'acció).
                </td>
              </tr>
              <tr>
                <td>
                  <CapabilityDisplay
                    capability={new Action({ id: "example", cost: { strife: "X", ore: "X" }, effect: "..." })}
                  />
                </td>
                <td>
                  Aquesta acció requereix gastar qualsevol nombre de recursos <Reference item={resources.strife} />, i
                  la mateixa quantitat de recursos <Reference item={resources.ore} />. Com més recursos s'inverteixin,
                  més potent serà l'efecte (tal com es descriurà al detall de l'acció).
                </td>
              </tr>
              <tr>
                <td>
                  <CapabilityDisplay capability={new Action({ id: "example1", cost: undefined, effect: "..." })} />
                </td>
                <td>Aquesta acció té un cost variable, que es detalla a una altra part de les regles.</td>
              </tr>
              <tr>
                <td>
                  <CapabilityDisplay capability={new Action({ id: "example1", cost: {}, effect: "..." })} />
                </td>
                <td>Aquesta acció no té cap cost associat i es pot dur a terme de forma totalment gratuïta.</td>
              </tr>
            </tbody>
          </table>
        </Section>
        <Section title="Impulsos i materials">
          <p>
            Si una acció requereix un o més impulsos o materials, el jugador haurà de pagar la quantitat indicada de
            recursos de la reserva de recursos del seu imperi. Els recursos gastats es retornen a la reserva general.
          </p>
          <p>Cal tenir present que:</p>
          <ul>
            <li>
              Si el cost indicat és <AnyDrive />, el jugador podrà pagar utilitzant qualsevol combinació d'impulsos de la seva reserva
              (
              <Growth />, <Effort />, <Curiosity />, <Strife /> o <Resolve />
              ).
            </li>
            <li>
              Si el cost indicat és <AnyMaterial />, el jugador podrà pagar utilitzant qualsevol combinació de materials de la seva
              reserva (<Food />, <Wood />, <Ore /> o <Gold />
              ).
            </li>
            <li>
              Cada <Resolve /> es podrà utilitzar per pagar qualsevol altre impuls (
              <Growth />, <Effort />, <Curiosity /> o <Strife />
              ).
            </li>
            <li>
              Cada <Gold /> es podrà utilitzar per pagar qualsevol altre material (<Food />, <Wood /> o <Ore />
              ).
            </li>
          </ul>
        </Section>
        <Section title="Població">
          <p>
            Els costos de població sempre fan referència a una ciutat concreta - normalment, la ciutat on es troba
            l'edifici que proporciona l'acció. Per satisfer-los, el jugador haurà d'utilitzar tanta població de la
            ciutat en qüestió com s'indiqui. Aquests costos prenen dues formes:
          </p>
          <ul>
            <li>
              <Reference item={population} />: el jugador ha de moure la quantitat indicada de treballadors de la{" "}
              <em>població activa</em> de la ciutat a la <em>població exhausta</em>.
            </li>
            <li>
              <Reference item={populationLoss} />: el jugador ha de retirar la quantitat indicada de treballadors de la{" "}
              <em>població activa</em> de la ciutat, i tornar-los a la reserva general.
            </li>
          </ul>
        </Section>
        <Section title="Territori">
          <p>
            Els costos de territori (<ForestHex />, <MountainHex />, <GrasslandHex />, <SeaHex /> i <WastelandHex />)
            requereixen que el jugador seleccioni i <em>exhaureixi</em> la quantitat demandada de territoris del tipus
            indicat. Els territoris seleccionats han de complir les condicions següents:
          </p>
          <ul>
            <li>
              Han d'estar en contacte amb el territori central de l'acció (normalment, el territori que conté l'edifici
              que proporciona l'acció). Dos territoris es consideren en contacte si són el mateix territori o si són
              adjacents.
            </li>
            <li>No poden haver estat prèviament exhaurits durant el capítol en curs</li>
            <li>
              No poden contenir unitats militars o vaixells d'altres jugadors, a menys que els jugadors en qüestió donin
              el seu consentiment a l'utilització del territori. Les unitats <Reference item={unitTypes.explorer} />{" "}
              rivals no compten a aquest efecte.
            </li>
          </ul>
          <p>
            Els territoris seleccionats passaran a considerar-se <em>exhaurits</em> durant la resta del capítol.
          </p>
          <Example>
            <p>
              El <PlayerReference number={1} /> i el <PlayerReference number={2} /> tenen un edifici{" "}
              <Reference item={buildings.sawmill} /> cada un a les posicions indicades:
            </p>
            <HexMap
              hexSet={Territory.beginSet({ label: "A", type: "grassland", owner: 1, buildings: [buildings.sawmill] })
                .push((c) => c.northEast({ label: "B", type: "forest" }))
                .push((c) => c.southEast({ label: "C", type: "forest", owner: 2, buildings: [buildings.sawmill] }))
                .push((c) => c.southWest({ label: "D", type: "forest" }))
                .build()}
            />
            <p>L'edifici proporciona la següent capacitat:</p>
            <CapabilityDisplay capability={buildings.sawmill.getCapability("produce-wood")} />
            <p>
              El <PlayerReference number={1} /> actua primer, i executa la capacitat del seu edifici. Tot i que
              l'edifici està en contacte amb 2 territoris <ForestHex /> (posicions B i D), només disposa d'una unitat de{" "}
              <Reference item={resources.population} /> no exhaurida a la ciutat, així que només pot exhaurir un dels
              territoris; escull exhaurir el territoris B, i guanya un sol recurs <Reference item={resources.wood} />.
            </p>
            <p>
              Al seu torn, el <PlayerReference number={2} /> també executa la capacitat del seu edifici. Té 3{" "}
              <ForestHex /> en contacte amb l'edifici i disposa de 3 <Reference item={resources.population} />, però el
              territori B ja ha estat exhaurit prèviament durant el capítol pel <PlayerReference number={1} />. Per
              tant, com a molt podrà exhaurir els territoris C i D per guanyar 2 recursos de{" "}
              <Reference item={resources.wood} />.
            </p>
          </Example>
        </Section>
      </Section>
    </Section>
  </Section>
)
