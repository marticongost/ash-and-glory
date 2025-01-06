import Image from "next/image"
import styles from "./page.module.css"
import { makeMetadata } from "./metadata"

export const metadata = makeMetadata()

export default function Home() {
  return <main className={styles.Home}>Home page</main>
}
