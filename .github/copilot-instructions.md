# Trontium UI Copilot Instructions

You are an expert developer working in the `trontium-ui` monorepo. This project is a React UI component library using TypeScript, managed with pnpm workspaces.

## 🏗 Project Architecture & Structure

This is a **monorepo** structure managed by `pnpm`.

- **Root**: Workspace config, linting, global scripts.
- **`packages/ui`**: The core component library (`@trontium/ui`).
- **`apps/docs`**: The documentation site (powered by `dumi`).
- **`doc-site/`**: Distribution output of the documentation site.

### Key Directories

- `packages/ui/src/[Component]`: Source code for individual components.
- `packages/ui/src/[Component]/style`: Component specific styles (Less).
- `packages/ui/src/[Component]/demo`: Usage examples for documentation.
- `packages/ui/src/[Component]/__tests__`: Unit tests.

## 🛠 Development Workflows

- **Start Dev Server**: `pnpm start` (Runs `apps/docs` in dev mode, hot-reloading changes from `packages/ui`).
- **Build Library**: `pnpm build:ui` (Builds `@trontium/ui` to `lib` (CJS) and `esm` (ESM)).
- **Build Docs**: `pnpm build:site` (outputs to `doc-site/`).
- **Run Tests**: `pnpm test:ui` (Jest).
- **Lint**: Pre-commit hooks via `husky` and `lint-staged`.

## 🧩 Component Development Pattern

When creating or modifying components in `packages/ui/src`, follow the **co-location** pattern. Use `packages/ui/src/button` as the gold standard structure:

```
packages/ui/src/my-component/
├── index.ts           # Public export
├── my-component.tsx   # Component implementation
├── interface.ts       # Type definitions
├── index.md           # Documentation (Dumi)
├── style/             # Styling
│   ├── index.ts       # Style entry point
│   └── index.less     # Less styles
├── demo/              # Demos
│   └── basic.tsx      # Example usage
└── __tests__/         # Tests
    └── index.test.tsx # Jest tests
```

### Conventions

1.  **Dumi Docs**: Documentation lives in `index.md` inside the component folder.
2.  **Demos**: Code examples must be in the `demo/` folder and referenced in `index.md`.
3.  **Styling**: Use strict BEM naming. Styles live in `style/index.less`. Do not use CSS Modules; use global class names prefixed (e.g., `tron-btn`).
4.  **Testing**: Write Unit tests using `jest` and `@testing-library/react` in `__tests__`.

## 📦 Dependency Management

- Use **pnpm** for all package operations.
- `package.json` scripts often use filters: `pnpm --filter @trontium/ui [command]`.
- Do not modify `package-lock.json` or `yarn.lock`; only `pnpm-lock.yaml`.

## 🎨 Tech Stack Details

- **Framework**: React 18+
- **Language**: TypeScript
- **Documentation**: Dumi (Co-located Markdown)
- **Styling**: Less
- **Bundler**: Gulp (for UI lib), Umi (for Docs)
- **Testing**: Jest

## ⚠️ Common Pitfalls

- **Style Imports**: When creating a component, ensure the style entry (`style/index.ts`) imports the `.less` file.
- **Exports**: Remember to export the new component in `packages/ui/src/index.ts`.
- **Dumi Metadata**: If docs are not updating, check the frontmatter in `index.md`.
