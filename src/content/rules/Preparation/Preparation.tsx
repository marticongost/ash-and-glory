import { Section } from "@/components/Section"
import styles from "./Preparation.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { HexGrid } from "@/components/HexGrid"
import { Hex } from "@/modules/hex"

export interface PreparationProps extends StandardComponentProps {}

export const Preparation = ({ ...baseProps }: PreparationProps) => (
  <Section title="Preparació" {...getStandardAttributes(baseProps, styles.Preparation)}>
    <Section title="1. Escollir colors">
      Cada jugador escull un dels colors disponibles i pren els soldats, vaixells, colons i centres de ciutat
      corresponents
    </Section>
    <Section title="2. Escollir avantatges i desavantatges">
      <p>
        Repartir 5 <em>avantatges</em> i 5 <em>desavantatges</em> a cada jugador. D'entre les cartes obtingudes, cada
        jugador ha de quedar-se amb desavantatges amb un valor agregat d'entre 2 i 3 punts; i avantatges amb un valor
        agregat que no excedeixi el de les desavantatges. La selecció es fa simultàniament, esperant a revel·lar les
        cartes escullides conjuntament amb la resta de jugadors. Posar les cartes seleccionades a l'àrea de joc del
        jugador, de manera que tots els jugadors puguin veure-les. Les cartes no utilitzades es retiren del joc - no
        s'utilitzaran durant la partida.
      </p>
    </Section>
    <Section title="3. Preparar el mapa">
      <div className={styles.mapDistributions}>
        <MapDistribution
          playerCount={2}
          mapSize={4}
          startPositions={[
            [0, 3],
            [0, -3],
          ]}
        />
        <MapDistribution
          playerCount={3}
          mapSize={5}
          startPositions={[
            [0, -4],
            [4, 2],
            [-4, 2],
          ]}
        />
        <MapDistribution
          playerCount={4}
          mapSize={6}
          startPositions={[
            [-4, 3],
            [-3, -4],
            [3, 3],
            [4, -3],
          ]}
        />
        <MapDistribution
          playerCount={5}
          mapSize={7}
          startPositions={[
            [-4, -4],
            [4, -4],
            [-6, 2],
            [6, 2],
            [0, 6],
          ]}
        />
        <MapDistribution
          playerCount={6}
          mapSize={8}
          startPositions={[
            [0, 7],
            [0, -7],
            [-7, -4],
            [7, -4],
            [7, 3],
            [-7, 3],
          ]}
        />
        <MapDistribution
          playerCount={7}
          mapSize={9}
          startPositions={[
            [-8, 4],
            [-8, -3],
            [-2, -7],
            [5, -6],
            [8, 0],
            [5, 5],
            [-2, 7],
          ]}
        />
        <MapDistribution
          playerCount={8}
          mapSize={9}
          startPositions={[
            [0, -8],
            [6, -5],
            [8, 0],
            [6, 5],
            [0, 8],
            [-6, 5],
            [-8, 0],
            [-6, -5],
          ]}
        />
      </div>
    </Section>
  </Section>
)

interface MapDistributionProps {
  playerCount: number
  mapSize: number
  startPositions: Array<[number, number]>
}

const MapDistribution = ({ playerCount, mapSize, startPositions }: MapDistributionProps) => {
  const startHexes = startPositions.map((coords) => Hex.at(...coords))
  return (
    <Section title={`Distribució per ${playerCount} jugadors`} className={styles.mapDistributionSection}>
      <HexGrid
        className={styles.mapDistributionHexGrid}
        size={mapSize}
        hexDecorator={(hex) => {
          for (const startingHex of startHexes) {
            if (hex.is(startingHex)) {
              return { className: styles.startPosition }
            } else if (hex.distanceTo(startingHex) === 1) {
              return { className: styles.exploredLocation }
            }
          }
        }}
      />
    </Section>
  )
}
