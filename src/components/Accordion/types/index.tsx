/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */

export type Data = unknown | object | any[]
export type DefinitionTemplate<TProps extends Data> = (props: TProps) => any

export interface AccordionMeta<T extends Data> {}
export interface SectionMeta<T extends Data> {}

export interface SectionDefinition<T extends Data> {
  header: DefinitionTemplate<Section<T>>
  content: DefinitionTemplate<Section<T>>
  descriptiveText: DefinitionTemplate<T>
  summary?: DefinitionTemplate<Section<T>>
  meta?: SectionMeta<T>
}

export interface Section<T extends Data> {
  id: number
  definition: SectionDefinition<T>
  isExpanded: boolean
  getValue: () => T
}

export interface AccordionOptions<T extends Data> {
  data: T[]
  definition: SectionDefinition<T>
  meta?: AccordionMeta<T>
}

export interface Accordion<T extends Data> {
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
