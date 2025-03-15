import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.scss"
import styles from "./layout.module.scss"
import { Navigation } from "@/components/Navigation"
import { InnerNavigation } from "@/components/InnerNavigation"

const headingFont = localFont({
  src: "./fonts/AveriaSerifLibre-Bold.ttf",
  variable: "--heading-font-family",
  weight: "400",
})

const logoFont = localFont({
  src: "./fonts/PirataOne-Regular.ttf",
  variable: "--logo-font-family",
  weight: "400",
})

const regularFont = localFont({
  src: [
    { path: "./fonts/RobotoCondensed-Regular.ttf", weight: "400" },
    { path: "./fonts/RobotoCondensed-Medium.ttf", weight: "500" },
    { path: "./fonts/RobotoCondensed-Light.ttf", weight: "300" },
  ],
  variable: "--regular-font-family",
})

const fonts = [headingFont, logoFont, regularFont]

export const metadata: Metadata = {
  title: "Ash & Glory",
  description: "Un joc d'expansió i conquesta en un món de déus ambiciosos i imperis trencats",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={fonts.map((font) => font.variable).join(" ")}>
        <header className={styles.header}>
          <div className={styles.bar}>
            <div className={styles.heading}>
              <span>Ash</span> <span>&amp;</span> <span>Glory</span>
            </div>
            <Navigation />
          </div>
          <InnerNavigation />
        </header>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  )
}
