import { levelLabels, type Trait } from "@/models/traits"
import styles from "./TraitCard.module.scss"
import { createElement } from "react"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"
import { CapabilityDisplay } from "../CapabilityDisplay"

export interface TraitCardProps extends StandardComponentProps {
  trait: Trait
}

export const TraitCard = ({ trait, ...baseProps }: TraitCardProps) => (
  <div {...getStandardAttributes(baseProps, styles.TraitCard)}>
    <div className={styles.titleBar}>
      <div className={styles.classifiers}>
        {createElement(trait.archetype.icon, { className: styles.archetypeIcon })}
        <div className={styles.level}>
          <div className={styles.levelLabel}>{levelLabels[trait.level]}</div>
        </div>
      </div>
      <div className={styles.title}>{trait.title}</div>
    </div>
    <div className={styles.capabilities}>
      {trait.capabilities.map((capability) => (
        <CapabilityDisplay key={capability.id} capability={capability} />
      ))}
    </div>
  </div>
)
