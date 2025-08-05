# Rozenite Custom Commands

[![mit licence][license-badge]][license]

**Rozenite Custom Commands** is a plugin for the **[Rozenite](https://www.rozenite.dev/)** package.  
Plugin allows developers to define custom commands and execute then directly from the React Native DevTools.

## Features

- 🔌 Easy integration with **[Rozenite](https://www.rozenite.dev/)**
- 🛠️ Define custom commands in your app code
- 🖱️ Execute commands from the React Native DevTools interface
- ⚡ Instantly trigger app logic, actions

## Getting started

```bash
npm install -D rozenite-custom-commands
# or
yarn add -D rozenite-custom-commands
# or
bun add -D rozenite-custom-commands
```

## Demo

https://github.com/user-attachments/assets/a1cb930c-dfec-443f-a2be-f31a31e3667c

## API

#### `useCustomCommands(commands: CustomCommand[])`

Commands can be grouped into categories and executed dynamically with optional arguments.

```ts
type CustomCommand = {
  /**
   * Unique identifier for the command.
   */
  id: string;

  /**
   * Displayed title of the command in DevTools.
   */
  title: string;

  /**
   * Callback function invoked when the command is executed from DevTools.
   * You may send optional arguments from inputs fields inside DevTools.
   *
   * DevTools UI inputs accepts key and value. You can pick those values e.g
   * command: (args) => console.log('Received from DevTools:', args?.message)
   */
  command: (args?: Record<string, string>) => void;

  /**
   * Optional short description for the command.
   */
  description?: string;

  /**
   * Optional category name. Commands under the same category will be grouped together.
   * If omitted, the command appears at the top.
   */
  category?: string;
};
```

## Usage

```tsx
import { useCustomCommands } from 'rozenite-custom-commands';

export const App = () => {
  useCustomCommands([
    {
      id: 'custom_alert',
      title: 'Show Alert',
      description: 'Show Alert with Test title',
      category: 'Alerts',
      command: () => Alert.alert('Test'),
    },
    {
      id: 'different_alert',
      title: 'Show Alert (params)',
      description: 'Show Alert with a title defined inside Devtools',
      category: 'Alerts',
      command: (arg) => {
        const name = arg?.name ?? 'Default';
        Alert.alert(name);
      },
    },
    {
      id: 'navigate_back',
      title: 'Navigate Back',
      description: 'Navigates to previous screen',
      category: 'React Navigation',
      command: () => {
        if (navigationRef.isReady() && navigationRef.canGoBack()) {
          navigationRef.goBack();
        }
      },
    },
    {
      id: 'navigate_to',
      title: 'Navigates to screen (params)',
      description: 'Navigates to specific screen defined inside input',
      category: 'React Navigation',
      command: (arg) => {
        const screenName = arg?.screen ?? '';
        navigationRef.navigate(screenName);
      },
    },
  ]);
};
```

## Known Issues

- You have to refresh DevTools by refreshing app after adding new commands.

## License

MIT

[license-badge]: https://img.shields.io/badge/LICENSE-MIT-green?style=for-the-badge
[license]: https://github.com/akuul/react-native-bluechat/blob/main/LICENSE
