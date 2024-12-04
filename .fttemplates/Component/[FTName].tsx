import styles from "./[FTName].module.scss"
import { getStandardAttributes, type StandardComponentProps } from "@/modules/react-utils"

export interface [FTName]Props extends StandardComponentProps {
}

export const [FTName] = ({...baseProps}: [FTName]Props) => <div {...getStandardAttributes(baseProps, styles.[FTName])}></div>