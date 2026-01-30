# Trontium UI Copilot Instructions

You are an expert developer contributing to `trontium-ui`, a React UI component library managed as a monorepo. Follow these instructions to navigate the codebase, adhere to patterns, and maintain project quality.

## 🏗 Project Architecture

This project is a **monorepo** managed by `pnpm` workspaces.

### Workspace Structure

- **Root**: Configuration (`package.json`, `pnpm-workspace.yaml`), global scripts, and tooling.
- **`packages/ui`** (`@trontium/ui`): The core component library.
  - Source: `src/`
  - Output: `lib/` (CJS), `esm/` (ESM)
- **`apps/docs`**: Documentation site powered by **Dumi**.
- **`doc-site/`**: Static build output of the documentation.

### Core Technologies

- **Framework**: React 18+ (Functional Components + Hooks)
- **Language**: TypeScript (Strict typing)
- **Styling**: Less with BEM naming convention
- **Build**: Gulp (Components), Umi/Dumi (Docs)
- **Test**: Jest + React Testing Library
- **Versioning**: Changesets

## 🧩 Component Patterns

All components live in `packages/ui/src/[component-name]`. Strictly follow the **co-location** pattern.

### Directory Structure Reference

```
packages/ui/src/button/
├── index.ts           # Public export
├── button.tsx         # Component implementation
├── interface.ts       # Props interface & types
├── index.md           # Dumi documentation
├── style/
│   ├── index.ts       # Style entry (imports ./index.less)
│   └── index.less     # Less styles (BEM: .tron-btn)
├── demo/              # Usage examples
│   └── basic.tsx      # Demo component
└── __tests__/         # Unit tests
    └── index.test.tsx # Jest tests
```

### Development Guidelines

1.  **Naming**: Use kebab-case for directories/files, PascalCase for components.
2.  **Styling**:
    - Write styles in `style/index.less`.
    - Use global class names with prefix `tron-` (e.g., `tron-button`).
    - **Crucial**: Ensure `style/index.ts` imports the `.less` file.
    - **Do not** use CSS Modules.
3.  **Documentation (Dumi)**:
    - Write docs in `index.md`.
    - Reference demos using code blocks with `code` src (e.g., `<code src="./demo/basic.tsx">`).
4.  **Exports**:
    - Export the component from its `index.ts`.
    - Register the component in the global entry `packages/ui/src/index.ts`.
    - Respect `/* PLOP_INJECT_EXPORT */` markers if present.
5.  **Props**: Define interfaces in `interface.ts` and export them.

## 🛠 Workflows & Commands

Run all commands from the **project root**.

| Action | Command | Details |
| :-- | :-- | :-- |
| **Start Dev** | `pnpm start` | Starts Dumi doc site with hot reloading (port 3000). |
| **Build UI** | `pnpm build:ui` | Compiles `@trontium/ui` to `esm/` and `lib/`. |
| **Build Site** | `pnpm build:site` | Builds documentation to `doc-site/`. |
| **Test** | `pnpm test:ui` | Runs Jest unit tests for `packages/ui`. |
| **Size Limit** | `pnpm --filter @trontium/ui run size` | Check bundle size. |
| **Lint** | `pnpm commit` | Uses Commitizen for standardized commits. |
| **Release** | `pnpm release` | Builds UI and publishes via Changesets. |

## 🧪 Testing Strategy

- Tests are located in `__tests__` directories within component folders.
- Use `@testing-library/react` for behavior-driven testing.
- `jest` is the test runner.

## ⚠️ Common Pitfalls

- **Missing Style Import**: New components often fail visual checks because `style/index.ts` was forgotten.
- **Export Consistency**: Always export the default component AND named types from `index.ts`.
- **Changesets**: Required for any change affecting the published package/version.
