# node-ts-boilerplate

👩🏻‍💻 Developer Ready: A comprehensive template. Works out of the box for most [Node.js][nodejs] projects.

🏃🏽 Instant Value: All basic tools included and configured:

- [TypeScript][typescript] [4.7][typescript-4-7].
- Using [Babel-node](https://babeljs.io/docs/en/babel-node) for transpilation.
- [ESLint][eslint] with some initial rules recommendation.
- [Jest][jest] for fast unit testing and code coverage.
- Type definitions for Node.js and Jest.
- [Prettier][prettier] to enforce consistent code style.
- NPM [scripts](#available-scripts) for common operations.
- .editorconfig for consistent file format.
- Simple example of TypeScript code and unit test.
- Use all ES6 features *(including experimental and proposal)*.
- Minimal `.env` files for environment customization.
- Clean imports: No relative files path.
- Zero dependencies: Install your own packages.
- `yarn` PM by default.

🤲 Free as in speech: available under the APLv2 license.

## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

### Use as a repository template

To start,
- Just clone this repository.
- Copy `.env.development.sample` to `.env`.
- Start adding your code in the `src` and unit tests in the `__tests__` directories.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/jiifw/node-ts-boilerplate
cd node-ts-boilerplate
yarn
```

### Download latest release

Download and unzip the current **main** branch or one of the tags:

```sh
wget https://github.com/jiifw/node-ts-boilerplate/archive/main.zip -O node-ts-boilerplate.zip
unzip node-ts-boilerplate.zip && rm node-ts-boilerplate.zip
```

## Available Scripts

- `start` - Serve built project.
- `clean` - remove coverage data, Jest cache, transpiled files and runtime files.
- `prebuild` - lint source files and tests before building.
- `build` - transpile TypeScript to ES6 (node compatible).
- `build:watch` - interactive watch mode to automatically transpile source files.
- `build:debug` - interactive watch mode with debugger to automatically transpile source files.
- `build:prod` - transpile TypeScript to ES6 for production *(minified)*.
- `lint` - lint source files and tests.
- `prettier` - reformat files.
- `test` - run tests.
- `test:watch` - interactive watch mode to automatically re-run tests.

## Additional Information

### CommonJS Modules

This template uses native *CommonJS*.

Please do not open issues for questions regarding ESM or TS-Node on this repo.

## License

Licensed under the APLv2. See the [LICENSE](https://github.com/jiifw/node-ts-boilerplate/blob/main/LICENSE) file for details.
