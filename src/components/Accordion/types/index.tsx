/* eslint-disable */
export interface AccordionMeta<T> {}
export interface SectionMeta<T> {}

export type DefinitionTemplate<TProps extends object> = (props: TProps) => any

export interface Section<T> {
  id: number
  definition: SectionDefinition<T>
  isExpanded: boolean
  getValue: () => T
}

export interface SectionDefinition<T> {
  header?: DefinitionTemplate<Section<T>>
  summary?: DefinitionTemplate<Section<T>>
  content?: DefinitionTemplate<Section<T>>
  meta?: SectionMeta<T>
}

export interface AccordionOptions<T> {
  data: T[]
  definition: SectionDefinition<T>
  meta?: AccordionMeta<T>
}

export interface Accordion<T> {
  options: AccordionOptions<T>
  setOptions: (newOptions: AccordionOptions<T>) => void
  getSections: () => Section<T>[]
  getShowOpenAll: () => boolean
  toggleSectionExpanded: (index: number) => void
  toggleAllExpanded: () => void
}

export type Renderable<TProps> = React.ReactNode | React.ComponentType<TProps>

export const flexRender = <TProps extends object>(
  Component: Renderable<TProps>,
  props: TProps
): React.ReactNode | JSX.Element => {
  return !Component ? null : isReactComponent<TProps>(Component) ? (
    <Component {...props} />
  ) : (
    Component
  )
}

const isReactComponent = <T,>(component: unknown): component is React.ComponentType<T> => {
  return (
    isClassComponent(component) || typeof component === "function" || isExoticComponent(component)
  )
}

const isClassComponent = (component: any) => {
  return (
    typeof component === "function" &&
    (() => {
      const proto = Object.getPrototypeOf(component)
      return proto.prototype && proto.prototype.isReactComponent
    })()
  )
}

const isExoticComponent = (component: any) => {
  return (
    typeof component === "object" &&
    typeof component.$$typeof === "symbol" &&
    ["react.memo", "react.forward_ref"].includes(component.$$typeof.description)
  )
}
