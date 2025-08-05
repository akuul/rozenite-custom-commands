import type { CustomCommandUI } from './types';

export type CustomCommandsEventMap = {
  'request-initial': unknown;
  'custom-commands': {
    commands: CustomCommandUI[];
  };
  'command-callback': {
    id: string;
    args?: Record<string, string>;
  };
};
