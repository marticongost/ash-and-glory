import { levelLabels, type Archetype, type Trait } from "@/models/traits"
import styles from "./TraitCardGrid.module.scss"
import { TraitCard } from "../TraitCard"
import { groupBy, recordToList } from "@/modules/utils"

export interface TraitCardGridProps {
  archetypes: Archetype[]
}

export const TraitCardGrid = ({ archetypes }: TraitCardGridProps) => (
  <div className={styles.TraitCardGrid}>
    {archetypes.map((archetype) => (
      <div key={archetype.id} className={styles.archetype}>
        <div className={styles.archetypeTitle}>{archetype.title}</div>
        <div className={styles.levels}>
          {recordToList(
            groupBy(archetype.traits, (trait) => trait.level),
            (level, traits) => (
              <div key={level} className={styles.level}>
                <div className={styles.levelTitle}>Nivell {levelLabels[level]}</div>
                <div className={styles.traits}>
                  {traits.map((trait) => (
                    <TraitCard key={trait.id} trait={trait} />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    ))}
  </div>
)
