<div align="center">

# create-react-app-typescript-json5-setup

Using **[json5](https://json5.org/)** in a **[TypeScript](https://github.com/microsoft/TypeScript)**
**[React](https://github.com/facebook/react)** project, based on **[create-react-app](https://github.com/facebook/create-react-app)**.

</div>

<br><br><br>

## How to use .json5 files in a TypeScript React app

This project is an example React application that uses `json5` files, for instance in order to improve the process of writing and reading
translation files (e.g. with **[react-intl](https://formatjs.io/docs/react-intl)**). You can clone it and play around with it
(see [Commands](#commands)). The following sub-chapters explain how to setup `json5` file support in a `create-react-app` project, and how
to import and use them just like plain `json` files.

<br>

### 1. Install dependencies

First of all, we need a few new dependencies. In particular:

- We need **[react-app-rewired](https://github.com/timarney/react-app-rewired)** to hook into the Webpack configuration that `react-scripts`
  uses under the hood (without having to eject the config)
- We use the Webpack **[json5-loader](https://github.com/webpack-contrib/json5-loader)** to enable json5 file support in our build process

Add both dependencies to your `package.json` file and install them. For example:

```diff
  {
    "devDependencies": {
+     "react-app-rewired": "2.1.x",
+     "json-loader": "4.0.x"
    }
  }
```

<br>

### 2. Customize the build process

First, replace all mentions of `react-scripts` within the `scripts` area of your `package.json` file by `react-app-rewired`. This enables us
to tap into the build process in the next step. For example:

```diff
  {
    "scripts": {
-     "start": "react-scripts start",
+     "start": "react-app-rewired start",
-     "build": "react-scripts build",
+     "build": "react-app-rewired build",
-     "test": "react-scripts test",
+     "test": "react-app-rewired test",
    }
  }
```

Then, create a file named `react-app-rewired.config.js` (or whatever name you prefer) within the root folder of your project. This file will
be used by `react-app-rewired` when the build process runs, and allows us to customize the underlying Webpack configuration before the build
runs. Fill it with the following content:

```js
/**
 * React App Rewired Config
 */
module.exports = {
  // Update webpack config to use custom loader for .json5 files
  webpack: (config) => {
    // Add .json5 file extension support
    config.resolve.extensions.push('.json5');

    // Add .json5 file processing support
    config.module.rules[1].oneOf.unshift({
      loader: 'json5-loader',
      test: /\.json5$/i,
      type: 'javascript/auto',
    });

    return config;
  },
};
```

Finally, reference the `react-app-rewired.config.js` file in your `package.json` file by adding the following line:

```diff
  {
+   "config-overrides-path": "react-app-rewired.config.js",
  }
```

<br>

### 3. Add typings

Next, we need to enable TypeScript to understand `json5` files, so that eventually we can import `json5` files just like we would import
plain `json` files. To do that, create a typings file in your project (e.g. `typings.d.ts` in `src`) with the following content:

```ts
/**
 * Make TypeScript recognize json5 files as generic value containers
 */
declare module '*.json5' {
  const value: any;
  export default value;
}
```

> Note: Typescript should automatically include custom typings files. If not, you may update your `tsconfig.json` file to do so.

<br>

### 4. Import json5 files

Now you can start using `json5` files! Just import them like `json` files, and use them in your code. The create-react-app (or Webpack under
the hood, to be particular) will include the file contents in your bundle. For example:

```ts
import en from './i18n/en.json5';

// Your code ...
```

So, for example, if you are using **[react-intl](https://formatjs.io/docs/react-intl)** for your internationalization purposes, you can
import the translation `.json5` files and hand them over to the provider:

```tsx
import de from './i18n/de.json5';
import en from './i18n/en.json5';

const App = () => {
  return (
    <IntlProvider locale="en" messages={{ de, en }}>
      {/* Your code */}
    </IntlProvider>
  );
};
```

<br><br>

## Commands

The following commands are available:

| Command               | Description                                        | CI                 |
| --------------------- | -------------------------------------------------- | ------------------ |
| `npm start`           | Creates a development build, running in watch mode |                    |
| `npm run build`       | Creates a production build                         | :heavy_check_mark: |
| `npm run start:build` | Runs the production build                          |                    |
| `npm run test`        | Executes all unit tests                            | :heavy_check_mark: |
| `npm run test:watch`  | Executes all unit tests, running in watch mode     |                    |
