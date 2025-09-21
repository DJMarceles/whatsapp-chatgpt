export type ToolDefinition<TInput = unknown, TOutput = unknown> = {
  name: string;
  description: string;
  input_schema: unknown;
  handler: (input: TInput) => Promise<TOutput> | TOutput;
};

export type ToolRegistry = Record<string, ToolDefinition>;

export function createToolRegistry(tools: ToolDefinition[]): ToolRegistry {
  return tools.reduce<ToolRegistry>((acc, tool) => {
    acc[tool.name] = tool;
    return acc;
  }, {});
}
