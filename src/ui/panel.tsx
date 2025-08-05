import { useRozeniteDevToolsClient } from '@rozenite/plugin-bridge';
import { useEffect, useMemo, useState } from 'react';
import { CustomCommandsEventMap } from '../shared/messaging';
import { CustomCommandUI } from '../shared/types';
import { sortCommandsCategories } from '../utils/sortCommandsByCategory';
import { CommandCard } from './command-card';
import { Header } from './header';
import './panel.css';

type CustomCommand2 = {
  id: string;
  title: string;
  description?: string;
  category?: string;
};

export default function CustomCommandsPanel() {
  const [commands, setCommands] = useState<CustomCommandUI[]>([]);

  const client = useRozeniteDevToolsClient<CustomCommandsEventMap>({
    pluginId: 'rozenite-custom-commands',
  });

  useEffect(() => {
    if (!client) return;

    client.send('request-initial', {});

    const unsub = client.onMessage('custom-commands', (event) => {
      setCommands(event.commands);
    });

    return () => unsub.remove();
  }, [client]);

  const { uncategorized, categorized, categories } = useMemo(
    () => sortCommandsCategories(commands),
    [commands]
  );

  const onExecuteClick = (
    command: CustomCommand2,
    payload?: Record<string, string>
  ) => {
    client?.send('command-callback', {
      id: command.id,
      args: payload,
    });
  };

  return (
    <div className='custom-commands-panel'>
      <Header />

      {uncategorized.length > 0 && (
        <section>
          <div className='grid'>
            {uncategorized.map((command) => (
              <CommandCard
                key={`${command.id}-${command.title}-${command.description}`}
                command={command}
                onExecute={(payload) => onExecuteClick(command, payload)}
              />
            ))}
          </div>
        </section>
      )}

      {categories.map((category) => (
        <section key={category}>
          <h2 className='category-header'>{category}</h2>
          <div className='grid'>
            {categorized[category].map((command) => (
              <CommandCard
                key={`${command.id}-${command.title}-${command.description}`}
                command={command}
                onExecute={(payload) => onExecuteClick(command, payload)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
