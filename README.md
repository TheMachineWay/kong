# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

- The provided exercise files are a starting point and they have room for improvement; feel free to modify
- Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
- In the exercise you are utilizing a local API; however, code your submission as if you are using a production API, accounting for typical issues that can occur

### Links

- Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>

## Functional Requirements

- [Vue 3](https://vuejs.org/) and TypeScript
- User should be able to view the name, a brief description, versions available, and other info shown in the mock for services
- User should be able to search for services ([See search endpoint details below](#searching-the-services-endpoint))
- User should be able to click on a service to view more details
- User should be able to paginate through services (client-side implementation)
- The create Service Package button doesn't have to be operable -- interacting with this elements could do nothing, could be fully implemented (stretch goal), or something in between
- Please update the `README` in the project with a section to describe your design considerations, assumptions, and trade-offs made during this exercise. Also feel free to include any notes about your submission

## Additional Considerations (if applicable)

- The UI should be responsive and look great at different browser viewport sizes
- Pixel-perfect implementation
- Routing and views (e.g. navigating to a given service from its card)
- State management with [Pinia](https://pinia.vuejs.org/)
- [Component Tests and/or Unit Tests](#run-component-and-unit-tests-with-vitest-and-optionally-vue-test-utils)
- Other items covered in your Panel 1 interview

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI, and what tradeoffs you make. Specifically we'll be looking at the following:

- How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
- Code quality, including appropriate componentization and modularity
- TypeScript usage
- Coding (and Vue) best-practices
- The project should pass type checking and build successfully
- How you dedicate the allotted time to focus on your strengths
- Test coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Clone the repository

```sh
git clone git@github.com:Kong/konnect-team-interview-frontend-exercise.git
```

### pnpm

This repository uses [`pnpm`](https://pnpm.io) rather than `npm` or `yarn`. [See here for instructions on installing pnpm](https://pnpm.io/installation).

### Install dependencies

```sh
pnpm install
```

### Compile and Hot-Reload for Development

Start the backend which serves the `services` API:

```sh
pnpm dev:server
```

In a separate terminal, start the Vue app:

```sh
pnpm dev:ui
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `pnpm dev:server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string;
  name: string;
  description: string;
  type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Linting and fixing the code

#### ESLint

```sh
# Run the linter
pnpm lint

# Fix linting errors
pnpm lint:fix
```

#### Stylelint

```sh
# Run stylelint
pnpm stylelint

# Fix stylelint errors
pnpm stylelint:fix
```

### Run Component and Unit Tests with [Vitest](https://vitest.dev/) and optionally [Vue Test Utils](https://test-utils.vuejs.org/)

Component and unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`. In the starter project, see `src/components/ServiceCatalog.spec.ts` for an example.

```sh
# Run tests
pnpm test

# or run the tests in the Vitest UI
pnpm test:open
```

### Build and Minify for Production

```sh
pnpm build
```

### Preview your built application

First, you'll need to build the app

```sh
pnpm build
```

Next, run the API server

```sh
pnpm dev:server
```

Now run the `preview` command

```sh
pnpm preview
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar with conventional commits, it is **recommended** to use the following command in order to create your commits:

```sh
# Stage your changes
git add -A

# Trigger the commitizen CLI to help compose your commit message
pnpm commit
```

This will trigger the Commitizen interactive prompt for building your commit message.



# Abhishek's Notes

## Milestones

### Must
1. [x] export the images and icons from figma
2. [x] Identify css variables from figma
2. [x] Create the App header
3. [x] Create the routing for links
4. [x] Add pinia store and implement debounce and search functionality
5. [x] Implement the Service header component
6. [x] Implement the Service Card component
7. [x] Add error handling
8. [x] Implement the pagination
9. [x] Implement the Version view modal
10. [ ] Tests
11. [x] Mobile design
12. [x] Mobile nav
13. [x] Add skeleton loader

## Assumptions and trade-offs
- largest mobile screen 540px and largest tablet at 840px. any screen larger than 840 will get desktop view
- exported or created icons locally in svg format. In real world scenario would recommend icons and images on a CDN
- There were font sizes used in figma with sizes 12px, 13px etc. Have created uniform sizing of 12px. limited font sizes to 10, 12, 14, 16, 20 and 32px
- Service cards stretch to full width as sometimes on some screen sizes there was a lot of white space on the right side
- API url is read from environment variable `VITE_API_URL`. If no env variable is set then default is set to `/`


## Implemented Features
- Pinia store is added to store the services
- Debounce is added to search the services
- Skeleton loader is added to show the loading state when service call is in progress
- Modal is added in teleport layer to show the version details and mobile nav
- search results are bookmarkable as search queries are stored in the url
- pagination is bookmarkable as well as current page number is stored in url
- Placeholder pages for Organization and Settings are added
- Service description is truncated on second line and a title is added. The description is shown in browser native title if mouse stays long enough on the description. Ideally this should be added with tooltip

## Suggested features

### Dev features
0. Login or sign up functionality
1. Ability to add tags in services
2. Filtering and sorting of services based on status, latest versions, tags, etc
3. Search with autocomplete UI
4. Analytics for user interactions
5. Multi language support
6. Api rate limiting
7. Dark mode: Since target users are developers
8. Accessibility: ARIA roles, keyboard navigation, etc
9. CI/CD pipeline
10. UI walkthrough for first time users


### Social features
1. a way for users to discover other users and connect with them. It could be achieved in several ways
  a. By trending services
  b. trending users
  c. By a global search where users can search for all services on the platform
2. Ability to mark own services public or private
3. Ability to bookmark, like, or comment on services of other users
4. Rating and scores
5. Badge system for developers when they create services. Some badges could be
  a. Star: When user's service appears in trending services
  b. Pro: When user has created more than x number of services
  c. Streak
  d. Collaborator
6. Notifications
