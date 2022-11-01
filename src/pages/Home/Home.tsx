import { Content, NavLink } from "components"

export const Home = () => {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full" id="content">
        <Content>
          The{" "}
          <NavLink
            to="https://design-system.service.gov.uk/"
            external
            text="GOV.UK Design System"
          />{" "}
          is a set of components and styles designed for consistency and accessibility.
        </Content>
        <Content>
          <NavLink to="https://vitejs.dev/" external text="Vite" /> is a build tool created by Evan
          You, the creator of Vue. It allows for faster development thanks to super fast Hot Module
          Reload (HMR), fast cold start times, and CSS + JSX + TypeScript support out of the box.
        </Content>
        <Content>
          <NavLink to="https://vitest.dev/" external text="Vitest" /> is a blazingly fast unit test
          framework. Powered by Vite, Vitest also has a dev server under the hood when running the
          tests. This allows Vitest to provide a beautiful UI to view and interact with your tests.
        </Content>
        <Content>
          <NavLink to="https://tanstack.com/" external text="TanStack" /> is high-quality
          open-source software, developed by Tanner Lindsay. This demo integrates React Query and
          React Table.
        </Content>
      </div>
    </div>
  )
}
