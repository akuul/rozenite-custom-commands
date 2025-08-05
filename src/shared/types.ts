export type CustomCommand = {
  id: string;
  title: string;
  command: (args?: Record<string, string>) => void;
  description?: string;
  category?: string;
};

export type ArgInput = { id: string; keyName: string; value: string };
export type InputFieldValues = 'keyName' | 'value';

export type SortedCommandByCategory = {
  categorized: Record<string, CustomCommandUI[]>;
  uncategorized: CustomCommandUI[];
};

export type CustomCommandUI = Omit<CustomCommand, 'command'>;
