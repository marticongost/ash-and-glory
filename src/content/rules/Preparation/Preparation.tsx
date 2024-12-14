import { Section } from "@/components/Section"
import styles from "./Preparation.module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { HexGrid } from "@/components/HexGrid"

export interface PreparationProps extends StandardComponentProps {}

export const Preparation = ({ ...baseProps }: PreparationProps) => (
  <Section title="Preparació" {...getStandardAttributes(baseProps, styles.Preparation)}>
    <Section title="1. Escollir colors">
      Cada jugador escull un dels colors disponibles i pren els soldats, vaixells, colons i centres de ciutat
      corresponents
    </Section>
    <Section title="2. Escollir avantatges i desavantatges">
      Repartir 5 <em>avantatges</em> i 5 <em>desavantatges</em> a cada jugador. Cada jugador ha d'escollir avantatges
      per valor de 3 punts, i desavantatges per valor de 3 punts. La selecció es fa simultàniament, esperant a revel·lar
      les cartes escullides conjuntament amb la resta de jugadors. Posar les cartes seleccionades a l'àrea de joc del
      jugador, de manera que tots els jugadors puguin veure-les. Les cartes no utilitzades es retiren del joc.
    </Section>
    <Section title="3. Preparar el mapa">
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
          [-4, -4],
          [7, -4],
          [7, 3],
          [-7, 3],
        ]}
      />
    </Section>
  </Section>
)

interface MapDistributionProps {
  playerCount: number
  mapSize: number
  startPositions: Array<[number, number]>
}

const MapDistribution = ({ playerCount, mapSize, startPositions }: MapDistributionProps) => (
  <Section title={`Distribució per ${playerCount} jugadors`}>
    <HexGrid
      className={styles.mapDistributionHexGrid}
      size={mapSize}
      hexDecorator={(hex) => {
        for (const startPosition of startPositions) {
          if (hex.is(...startPosition)) {
            return { className: styles.startPosition }
          }
        }
      }}
    />
  </Section>
)
