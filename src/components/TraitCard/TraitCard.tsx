import { levelLabels, type Trait } from "@/models/traits"
import styles from "./TraitCard.module.scss"
import { createElement } from "react"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { CapabilityList } from "../CapabilityList"

export interface TraitCardProps extends StandardComponentProps {
  trait: Trait
}

export const TraitCard = ({ trait, ...baseProps }: TraitCardProps) => (
  <div {...getStandardAttributes(baseProps, styles.TraitCard)} data-category={trait.category.id} data-id={trait.id}>
    <div className={styles.titleBar}>
      {trait.category.icon || trait.level ? (
        <div className={styles.classifiers}>
          {trait.category.icon ? createElement(trait.category.icon, { className: styles.categoryIcon }) : null}
          {trait.level ? (
            <div className={styles.level}>
              <div className={styles.levelLabel}>{levelLabels[trait.level]}</div>
            </div>
          ) : null}
        </div>
      ) : null}
      <div className={styles.title}>{trait.title}</div>
    </div>
    <CapabilityList className={styles.capabilities} capabilities={trait.capabilities} />
  </div>
)
