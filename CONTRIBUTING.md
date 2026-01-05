# Contributing to React Modal Plugin

We welcome contributions! Please follow these guidelines to help keep the project consistent.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/myzbox/react-overlay.git
   cd react-overlay
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

4.  **Start development server**:
    ```bash
    npm run dev
    ```

## Project Structure

-   `src/components`: UI components (Modal, Drawer, Tooltip).
-   `src/hooks`: Custom React hooks (`useModal`, `useDraggable`).
-   `src/styles`: Shared styles (if any).

## Development Guidelines

-   **TypeScript**: Use strict typing. Avoid `any` whenever possible.
-   **Styling**: Use CSS Modules (`*.module.css`). Use CSS Variables for colors.
-   **Linting**: Ensure code passes linting rules.
    ```bash
    npm run lint
    ```

## Pull Requests

1.  Create a feature branch: `git checkout -b feature/my-new-feature`
2.  Commit your changes: `git commit -m 'Add new feature'`
3.  Push to the branch: `git push origin feature/my-new-feature`
4.  Open a Pull Request.
