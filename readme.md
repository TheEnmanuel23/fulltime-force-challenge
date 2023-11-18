
# Commit History Challenge


## What's inside?

This project is a [Monorepo](https://monorepo.tools/) solution, and it uses [Turborepo](https://turbo.build/repo), it  includes the following packages/apps:

### Apps and Packages

- `backend`: a RestAPI built with [NodeJS](https://nodejs.org/en), [TypeScript](https://www.typescriptlang.org/), [NestJS](https://nestjs.com/), and [tRpc](https://trpc.io/) app
- `fronted`: a [ReacJS](https://react.dev/) app built with [NextJS](https://nextjs.org/) , and [Tailwindcss](https://tailwindcss.com/) 
- `ui`: A [design system](https://www.invisionapp.com/inside-design/guide-to-design-systems/) that uses [ReactJS](https://react.dev/) to create a component library shared by  `front` and others.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: Used throughout the monorepo
- `tailwindcss-config`: Reuse tailwindcss configuration.


### Stack
- Monorepository with [Turborepo](https://turbo.build/repo).

- A [design system](https://www.invisionapp.com/inside-design/guide-to-design-systems/) to create reusable components.
- A [ReactJS](https://react.dev/)
- SSR support with [NextJS](https://nextjs.org/) 
- [Tailwindcss](https://tailwindcss.com/)
- [NestJS](https://nestjs.com/) as server framework
- [tRPC](https://trpc.io/) to share types across backend and frontend apps.
- [Turborepo](https://turbo.build/repo)

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

Some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd fulltime-force-challenge
npm install
npm run build
```

### Run locally

1. Clone the repository
```
git clone https://github.com/TheEnmanuel23/fulltime-force-challenge.git
```

2. Install dependencies:
```
cd fulltime-force-challenge
npm install
```

3. Add environment variables (**Backend**)
Create a file `.env` in the `./apps/backend` directory, then add these variables:
```
GT_TOKEN=123455
GT_USERNAME=TheEnmanuel23
GT_REPOSITORY=fulltime-force-challenge
```
The **GT_TOKEN** was sent via Email, you can rename the **.env.example file to .env** and just replace **GT_TOKEN**.

4. Add environment variables (**Frontend**)
Create a file `.env` in the `./apps/frontend` directory, then add these variables:
```
TRPC_SERVER=http://localhost:4000/trpc
URL_APP=http://localhost:3000
```
*You can rename the **.env.example file to .env**, just make sure the ports match the ports where the applications are running.*

**I'll delete the GitHub Token I used for this challenge once you have tested it**

5. Then in the root directory, run the command:
```
npm run dev
```

That command will run all the apps (backend and frontend)
```
frontend: http:localhost:3000
backend: http:localhost:4000
tRPC Server:  http:localhost:4000/trpc
```