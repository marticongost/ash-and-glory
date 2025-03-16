import type { CSSProperties } from "react"

export interface StandardComponentProps {
  className?: string
  id?: string
  style?: CSSProperties
  data?: Record<string, any>
}

export const getStandardAttributes = (
  { className, id, style, data }: StandardComponentProps,
  baseClassName?: string,
): Record<string, any> => {
  const props: Record<string, any> = {
    className: mergeClassName(baseClassName, className),
    id,
    style,
  }
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      props[`data-${key}`] = value
    }
  }
  return props
}

export const mergeClassName = (baseClassName?: string, className?: string): string => {
  if (baseClassName?.length && className?.length) {
    return `${baseClassName} ${className}`
  }
  return (baseClassName || className) ?? ""
}

export const mergeStyle = (baseStyle: CSSProperties | undefined, overrides: CSSProperties | undefined): CSSProperties =>
  Object.assign({}, baseStyle ?? {}, overrides ?? {})
