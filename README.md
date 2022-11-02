# Vite React GDS

## Overview

As a developer primarily working with [GDS](https://design-system.service.gov.uk/) the intention is to replace the use of [CRA](https://reactjs.org/docs/create-a-new-react-app.html) and [Jest](https://jestjs.io/) with [Vite](https://vitejs.dev/) and [Vitest](https://vitest.dev/). This project is a test bed to ensure that implementation features work both in development and production builds.

## Features

- Template project utilising [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)
- Code built with [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/)
- Routing, including pre-loading data with [React Router 6.4](https://reactrouter.com/en/main)
- API calls handled by a Fetch wrapper built with [Typescript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- API caching and additional features supported by [React Query v4](https://tanstack.com/query/v4/)
- API headers implemented using a custom hook integrated with simple state management from [Valtio](https://github.com/pmndrs/valtio)
- API development mocking mechanism to elimate the need for additional test server functionality
- [GDS Table](https://design-system.service.gov.uk/components/table/) component supporting sorting and pagination built on top of [React Table v8](https://tanstack.com/table/v8/)
- [GDS Sass](https://frontend.design-system.service.gov.uk/sass-api-reference/) styling integrated into Vite build
- Vitest unit tests including server mocking with [Mirage](https://miragejs.com/)

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
docker compose up -d
```

## Unit Testing

```bash
yarn test
yarn test:ui
```

## Issues

- There is currently a known [issue](https://github.com/vitejs/vite/issues/5310) with running Vite in Chrome, with the developer tools open, on MacOS and Linux. Please refer to the folowing [solution](https://wilsonmar.github.io/maximum-limits/).
- During the development I was unable to get the mocking of API calls working using [MSW](https://mswjs.io/) and Node 18. This is the reason for the use of [Mirage](https://miragejs.com/) in the example unit test.

## Future Work

- Complete Unit Tests
- Explore and test additional features provided by React Router 6.4
- Add support for [Storybook](https://storybook.js.org/)
- Add additional features of the [GDS Table](https://design-system.service.gov.uk/components/table/)
- Create Headless UI implementation of the [GDS Accordion](https://design-system.service.gov.uk/components/accordion/)

## Credits

Thanks to:

- [Andrew Marshall](https://www.linkedin.com/in/andrew-marshall-210966/) for his work on GDS in [PA Consulting](https://www.paconsulting.com/)

## License

[MIT](./LICENSE) License © 2022-Present [Barry Jacobs](https://github.com/barryjacobs)
