# Contributing to RM-NG Video Player

Thank you for your interest in contributing to RM-NG Video Player! This guide will help you get started.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Angular CLI 21+

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/rm-ng/rm-ng-video-player.git
cd rm-ng-video-player
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm serve:demo
```

4. Build the library:

```bash
pnpm build:lib
```

## 🏗️ Project Structure

```
rm-ng-video-player-workspace/
├── projects/
│   └── rm-ng-video-player/          # Library source code
│       ├── src/
│       │   ├── lib/                 # Main library code
│       │   │   ├── components/      # UI components
│       │   │   ├── interfaces/      # TypeScript interfaces
│       │   │   ├── services/        # Angular services
│       │   │   └── rm-ng-video-player.ts  # Main component
│       │   └── public-api.ts        # Public API exports
│       ├── schematics/              # Angular schematics
│       └── package.json             # Library package config
├── src/                             # Demo application
└── dist/                            # Build output
```

## 🔧 Development Workflow

### Making Changes

1. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes in the appropriate directory:
   - Library code: `projects/rm-ng-video-player/src/lib/`
   - Demo app: `src/`
   - Documentation: `projects/rm-ng-video-player/README.md`

3. Test your changes:

```bash
pnpm build:lib
pnpm test:lib
pnpm lint:lib
```

4. Update the demo app if needed to showcase new features

### Code Style

- Use Angular's coding style guide
- Use TypeScript strict mode
- Follow the existing naming conventions
- Use signals and new control flow syntax where applicable
- Ensure proper cleanup to prevent memory leaks

### Component Guidelines

- All components should be standalone
- Use OnPush change detection strategy
- Implement proper accessibility (ARIA labels, keyboard navigation)
- Use signals for reactive state management
- Avoid direct DOM manipulation when possible

### Performance Considerations

- Keep bundle size minimal
- Ensure tree-shaking compatibility
- Use lazy loading where appropriate
- Avoid memory leaks with proper cleanup
- Test on various devices and network conditions

## 🧪 Testing

### Unit Tests

```bash
pnpm test:lib
```

### E2E Tests

```bash
pnpm e2e
```

### Manual Testing Checklist

- [ ] Video playback works across different browsers
- [ ] Controls are accessible via keyboard
- [ ] Touch gestures work on mobile devices
- [ ] Fullscreen mode functions correctly
- [ ] No memory leaks after component destruction
- [ ] Responsive design works on various screen sizes

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Build process or auxiliary tool changes

Example:

```bash
git commit -m "feat: add picture-in-picture support"
git commit -m "fix: resolve memory leak in video cleanup"
git commit -m "docs: update API documentation"
```

## 🚀 Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure all tests pass
4. Update the CHANGELOG.md
5. Submit a pull request with:
   - Clear description of changes
   - Screenshots/videos for UI changes
   - Breaking change notes if applicable

## 🐛 Bug Reports

When reporting bugs, please include:

- Angular version
- Browser and version
- Device type (desktop/mobile)
- Steps to reproduce
- Expected vs actual behavior
- Console errors if any
- Minimal reproduction example

## 💡 Feature Requests

For new features:

- Check existing issues first
- Explain the use case
- Consider backwards compatibility
- Discuss implementation approach
- Consider bundle size impact

## 📚 Documentation

- Update README.md for new features
- Add JSDoc comments for public APIs
- Update type definitions as needed
- Include examples in documentation
- Keep migration guides up to date

## 🎯 Roadmap

Current priorities:

1. Adaptive bitrate streaming
2. VR/360 video support
3. Live streaming capabilities
4. Advanced analytics
5. Subtitle/caption support
6. Chromecast integration
7. AirPlay support

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

Please be respectful and inclusive in all interactions. We want this to be a welcoming environment for all contributors.

## 🆘 Getting Help

- Check existing issues and discussions
- Join our Discord community
- Ask questions in GitHub Discussions
- Review the documentation wiki

Thank you for contributing! 🎉
