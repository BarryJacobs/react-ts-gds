# Vite React GDS

## Overview

As a developer primarily working with [GDS](https://design-system.service.gov.uk/) the intention is to replace the use of [CRA](https://reactjs.org/docs/create-a-new-react-app.html) and [Jest](https://jestjs.io/) with [Vite](https://vitejs.dev/) and [Vitest](https://vitest.dev/). This project is a test bed to ensure that implementation features work both in development and production builds.

## Features

- Template project with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- Code built with [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/)
- Routing, including pre-loading data with [React Router 6.4](https://reactrouter.com/en/main)
- API calls handled by a Fetch wrapper built with [Typescript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- API caching and additional features supported by [React Query v4](https://tanstack.com/query/v4/)
- API headers with simple state management from [Valtio](https://github.com/pmndrs/valtio)
- API development mocking mechanism to eliminate the need for additional test server functionality
- [GDS Table](https://design-system.service.gov.uk/components/table/) component supporting sorting and pagination built on top of [React Table v8](https://tanstack.com/table/v8/)
- [GDS Accordion](https://design-system.service.gov.uk/components/accordion/) components, built using Headless UI, implementing both the original and latest designs
- [GDS Autocomplete](https://designnotes.blog.gov.uk/2017/04/20/were-building-an-autocomplete/) There is no current control available, that doesn't included deprecated React code, so built a new one based on [React-Select](https://react-select.com/home)
- [GDS Sass](https://frontend.design-system.service.gov.uk/sass-api-reference/) styling integrated into Vite build
- [Docker Compose](https://docs.docker.com/compose/gettingstarted/) implementation hosted at http://localhost:3000/
- Vitest unit tests including server mocking with [Mirage](https://miragejs.com/)
- Accessibility testing with [Jest Axe](https://github.com/nickcolley/jest-axe)
- [Storybook v7](https://storybook.js.org/docs/7.0/react/get-started/introduction) demos implementing the examples shown in [GDS Tables](https://design-system.service.gov.uk/components/table/)

## Installation

```bash
yarn install
```

## Development

```bash
yarn dev
```

## Production

```bash
yarn build
yarn preview
```

## Docker

```bash
docker compose build
docker compose up
```

## Unit Tests

```bash
yarn test
yarn test:ui
```

## Storybook

```bash
yarn storybook
```

## Issues

- There is currently a known [issue](https://github.com/vitejs/vite/issues/5310) with running Vite in Chrome, with the developer tools open, on MacOS and Linux. Please refer to the folowing [solution](https://wilsonmar.github.io/maximum-limits/).

## Credits

Thanks to:

- [Andrew Marshall](https://www.linkedin.com/in/andrew-marshall-210966/) for his work on GDS in [PA Consulting](https://www.paconsulting.com/). These components are contained in the folder components/GDS.

## License

[MIT](./LICENSE) License © 2022-Present [Barry Jacobs](https://github.com/barryjacobs)
