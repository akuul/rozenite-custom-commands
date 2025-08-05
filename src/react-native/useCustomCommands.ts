import { useRozeniteDevToolsClient } from '@rozenite/plugin-bridge';
import type { CustomCommandsEventMap } from '../shared/messaging';
import type { CustomCommand } from '../shared/types';
import { useEffect } from 'react';

export const useCustomCommands = (commands: CustomCommand[]) => {
  const client = useRozeniteDevToolsClient<CustomCommandsEventMap>({
    pluginId: 'rozenite-custom-commands',
  });

  useEffect(() => {
    if (!client) return;

    const commandMap = new Map(commands.map((cmd) => [cmd.id, cmd.command]));

    const sendCommands = () => {
      client.send('custom-commands', {
        commands: commands.map(({ id, title, description, category }) => ({
          id,
          title,
          description,
          category,
        })),
      });
    };

    const unsubInitial = client.onMessage('request-initial', sendCommands);

    const unsub = client.onMessage('command-callback', (event) => {
      const commandHandler = commandMap.get(event.id);
      if (commandHandler) {
        commandHandler(event?.args);
      }
    });

    return () => {
      unsubInitial.remove();
      unsub.remove();
    };
  }, [client, commands]);

  return client;
};
