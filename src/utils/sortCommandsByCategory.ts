import { SortedCommandByCategory, type CustomCommandUI } from '../shared/types';

export const sortCommandsCategories = (commands: CustomCommandUI[]) => {
  const { categorized, uncategorized } =
    commands.reduce<SortedCommandByCategory>(
      (acc, command) => {
        if (command.category) {
          if (!acc.categorized[command.category]) {
            acc.categorized[command.category] = [];
          }
          acc.categorized[command.category].push(command);
        } else {
          acc.uncategorized.push(command);
        }
        return acc;
      },
      { categorized: {}, uncategorized: [] }
    );

  const categories = Object.keys(categorized);

  return { categorized, uncategorized, categories };
};
