import type { Metadata } from "next"

export const siteTitle = "Ash & Glory"

export interface MakeMetadataProps {
  title?: string
}

export const makeMetadata = ({ title }: MakeMetadataProps = {}): Metadata => {
  return {
    title: title ? `${title} - ${siteTitle}` : siteTitle,
  }
}
