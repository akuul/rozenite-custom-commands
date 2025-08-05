export let useCustomCommands: typeof import('./src/react-native/useCustomCommands').useCustomCommands;

if (process.env.NODE_ENV !== 'production') {
  useCustomCommands =
    require('./src/react-native/useCustomCommands').useCustomCommands;
} else {
  useCustomCommands = () => null;
}
