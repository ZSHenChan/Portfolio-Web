This website is for personal use only.

## Getting Started

Install dependencies

```bash
bun i
```

Local development

```bash
bun dev
```

## Development

### Adding new Function Call

- Declare and export new function [here](./app/lib/chatbot/functionCalls.ts)
- Declare and export app actions [here](./app/context/AppActionsContext.tsx)
  - AppActionsContextProps
  - Declare function under AppActionsContextProvider
- Declare and export function handlers [here](./app/lib/chatbot/functionHandlers.ts)
- Update system instruction for fetching function [fetchFunctionCalls](./app/lib/chatbot/fetchFunctionCalls.ts)
