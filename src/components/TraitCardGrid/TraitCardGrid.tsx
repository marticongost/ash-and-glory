import { levelLabels, type TraitsCategory } from "@/models/traits"
import styles from "./TraitCardGrid.module.scss"
import { TraitCard } from "../TraitCard"
import { groupBy, recordToList } from "@/modules/utils"

export interface TraitCardGridProps {
  categories: TraitsCategory[]
}

export const TraitCardGrid = ({ categories }: TraitCardGridProps) => (
  <div className={styles.TraitCardGrid}>
    {categories.map((category) => (
      <div key={category.id} className={styles.category}>
        <div className={styles.categoryTitle}>{category.title}</div>
        <div className={styles.levels}>
          {recordToList(
            groupBy(category.traits, (trait) => trait.level ?? 0),
            (level, traits) => (
              <div key={level} className={styles.level}>
                {level != 0 ? <div className={styles.levelTitle}>Nivell {levelLabels[level]}</div> : null}
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
