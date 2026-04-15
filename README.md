# qual.is

[![Service](https://github.com/Qualis/www-knowledge-matchmaker-qual-is/actions/workflows/service.yml/badge.svg)](https://github.com/Qualis/www-knowledge-matchmaker-qual-is/actions/workflows/service.yml)

## Features

- Built with Next.js 15 and React 19
- Responsive design with Tailwind CSS
- Dark/Light theme support
- Markdown-based blog posts with gray-matter
- SEO optimized with next-seo
- Unit + E2E testing
- Automated architectural boundary enforcement

## Architecture

This project follows **Hexagonal Architecture**, organizing code into distinct layers with clear dependency rules and boundaries.

### Project Structure

```
www-knowledge-matchmaker-qual-is/
├── _posts/                # Markdown blog posts
├── decisions/             # Architecture Decision Records (ADRs)
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
├── .husky/                # Git hooks (pre-commit)
├── e2e/                   # Playwright E2E tests
├── public/                # Static assets (images, fonts)
├── src/
│   ├── domain/            # Core business rules (innermost layer)
│   │   └── repositories/  # Port interfaces defining data access contracts
│   ├── application/       # Application business rules
│   │   ├── use-cases/     # Single-purpose business operations
│   │   └── services/      # Orchestration of use cases
│   ├── infrastructure/    # Framework & external dependencies (outermost layer)
│   │   ├── repositories/  # Adapter implementations (FileSystem, InMemory)
│   │   └── di/            # Dependency injection container
│   ├── app/               # Interface adapters (Next.js App Router)
│   │   ├── _components/   # React components
│   │   ├── posts/         # Post pages
│   │   ├── about/         # About page
│   │   ├── blog/          # Blog listing
│   │   └── layout.tsx     # Root layout
│   ├── interfaces/        # TypeScript type definitions
│   └── lib/               # Utility functions and helpers
├── vitest.config.ts       # Vitest configuration
├── playwright.config.ts   # Playwright configuration
├── eslint.config.mjs      # ESLint configuration
├── next.config.js         # Next.js configuration
└── tsconfig.json          # TypeScript configuration
```

### Layer Responsibilities

#### Domain Layer (`src/domain/`)

The core business logic, completely framework-agnostic.

- **Ports**: Interfaces that define contracts (e.g., `IPostRepository`)
- **No external dependencies**: Cannot import from application, infrastructure, or interface layers
- **Pure business rules**: Contains only domain concepts and abstractions

#### Application Layer (`src/application/`)

Orchestrates business logic and coordinates domain objects.

- **Use Cases**: Single-purpose operations (e.g., `GetPostBySlugUseCase`)
- **Services**: Coordinate multiple use cases
- **Depends only on domain layer**: Cannot import from infrastructure or interface layers

#### Infrastructure Layer (`src/infrastructure/`)

Implements technical capabilities and external system integrations.

- **Adapters**: Concrete implementations of domain ports (e.g., `FileSystemPostRepository`)
- **Dependency Injection**: Container managing object lifecycles
- **Framework Integration**: File system, databases, external APIs

#### Interface Layer (`src/app/`)

User interface and external communication.

- **Next.js Pages**: Server components and API routes
- **React Components**: UI presentation
- **Depends on application layer**: Uses services and use cases

### Architectural Testing

The project uses **dependency-cruiser** to automatically enforce hexagonal architecture boundaries. These tests ensure that:

- **Domain layer** remains pure with no outward dependencies
- **Application layer** only depends on domain and interfaces
- **Infrastructure layer** correctly implements domain ports
- **Interface layer** uses application services without direct infrastructure coupling
- **No circular dependencies** exist between modules

## Getting Started

### Prerequisites

- Node.js 22.x or later
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Development

### Available Scripts

#### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
```

#### Code Quality

```bash
npm run lint         # Check formatting with Prettier
npm run lint:eslint  # Run ESLint checks
npm run format       # Auto-format code with Prettier
npm run type-check   # Run TypeScript type checking
npm run quality      # Run all quality checks
```

#### Testing

```bash
npm test                    # Run unit tests in watch mode
npm run test:unit           # Run unit tests once
npm run test:unit:watch     # Run unit tests in watch mode
npm run test:unit:ui        # Open Vitest UI
npm run test:coverage       # Generate coverage report
npm run test:e2e            # Run E2E tests
npm run test:e2e:ui         # Run E2E tests in UI mode
npm run test:e2e:debug      # Debug E2E tests
npm run test:e2e:report     # Show Playwright report
npm run test:architecture   # Run architectural boundary tests
npm run test:all            # Run all tests (audit, quality, architecture, unit, e2e)
```

#### Security

```bash
npm audit                # Check for dependency vulnerabilities
npm audit fix            # Automatically fix vulnerabilities
```

### Claude Code Skills

This project includes [Claude Code](https://claude.com/claude-code) skills (`.claude/skills/`) that assist with development workflows. Some are triggered automatically by context, while others can be invoked manually.

#### Manually Invoked

Use these by describing the action to Claude Code (e.g., "scaffold a new feature", "generate tests for this class"):

| Skill | Trigger Phrases |
|-------|----------------|
| **Hexagonal Architecture Scaffolder** | "create a new feature", "scaffold a feature", "add a new use case" |
| **Test Generator** | "generate tests", "write tests for", "add test coverage" |
| **Self-Documenting Refactor** | "remove comments", "make code self-documenting" |
| **Simplify** | "review changed code", "simplify this" |
| **Keybindings Help** | "customize keyboard shortcuts", "rebind keys" |
| **Loop** | `/loop 5m /foo` — run a command on a recurring interval |

#### Automatically Invoked

These activate based on context without any explicit request:

| Skill | When |
|-------|------|
| **Systematic Debugging** | A bug, test failure, or unexpected behavior is encountered |
| **Test-Driven Development** | Implementing a feature or bugfix |
| **Verification Before Completion** | About to claim work is complete or create a PR |
| **Claude API** | Code imports Anthropic SDK or user asks about Claude API |
