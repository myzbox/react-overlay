# Contributing to @myzbox/react-overlay

Thank you for taking the time to contribute! 🎉  
All contributions are welcome — bug reports, suggestions, and improvements.

---

## 📋 Requirements

- Node.js 18+
- React 18+
- Basic knowledge of TypeScript and React hooks

---

## 🛠 Development Setup

1. Fork the repository
2. Clone your fork locally
   ```bash
   git clone https://github.com/myzbox/react-overlay.git
   cd react-overlay
   npm install
   npm run build
   ```
3. **Start development server**:
   ```bash
   npm run dev
   ```

## 🧠 Project Guidelines

Please follow these principles when contributing:

- **Hooks must remain pure**: Do not access `ref.current` during render.
- **Avoid unnecessary state**: Prefer derived values over stored state.
- **Styling**: Use **Vanilla CSS Modules** (`*.module.css`). Avoid SASS/SCSS.
- **API Consistency**: Keep the API backward-compatible for v0.x / v1.x.
- **Accessibility**: Ensure all components maintain WAI-ARIA compliance (aria-labels, focus management).
- **TypeScript**: Use strict typing. Avoid `any` whenever possible.

## 🐞 Reporting Bugs

When reporting bugs, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- React version
- Browser/environment details

## 🚀 Submitting a Pull Request

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes.
3. Ensure the project builds successfully:
   ```bash
   npm run lint
   npm run build
   ```
4. Update documentation if needed.
5. Commit with a clear message.
6. Open a pull request.

## 🧪 Code Style

- Follow existing formatting and conventions.
- Keep changes focused and minimal.
- No breaking changes without prior discussion.

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for helping improve this project! 🙌
