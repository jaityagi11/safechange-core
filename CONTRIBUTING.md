# Contributing to SafeChange Core

Thank you for your interest in contributing to SafeChange Core! We welcome contributions from the community.

## 🌟 How Can I Contribute?

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the problem
- Expected behavior vs. actual behavior
- Your environment (OS, Node version, etc.)
- Any relevant code samples or error messages

### Suggesting Features

We love new ideas! When suggesting a feature:
- Explain the problem it solves
- Describe your proposed solution
- Consider how it fits with SafeChange's core mission of system integrity
- Provide examples of how it would be used

### Contributing Code

1. **Fork the repository** and create a new branch from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, documented code
   - Follow existing code style and conventions
   - Add tests for new functionality
   - Ensure all tests pass

3. **Commit your changes**
   - Use clear, descriptive commit messages
   - Reference any related issues

4. **Submit a Pull Request**
   - Provide a clear description of the changes
   - Link to any related issues
   - Ensure CI checks pass

## 🧪 Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/safechange-core.git
cd safechange-core

# Install dependencies (if applicable)
npm install

# Run tests (if applicable)
npm test
```

## 📝 Code Style Guidelines

- Use TypeScript for all code
- Follow functional programming principles where possible
- Maintain immutability in state transitions
- Write clear, self-documenting code
- Add comments only when necessary to explain "why", not "what"
- Ensure all functions have proper type annotations

## 🔒 Safety and Invariants

When contributing to SafeChange Core, always remember:
- Never compromise system invariants
- All state transitions must be validated
- Changes should maintain or improve safety guarantees
- Add tests that prove invariants are preserved

## ✅ Testing

- Write tests for all new functionality
- Ensure existing tests pass
- Include both positive and negative test cases
- Test boundary conditions
- Validate that invalid states are properly rejected

## 📖 Documentation

- Update documentation for any changed functionality
- Add code examples for new features
- Keep the README.md up to date
- Document any breaking changes

## 🤝 Code Review Process

1. All submissions require review from maintainers
2. Reviewers will check for:
   - Code quality and style
   - Test coverage
   - Documentation
   - Safety and invariant preservation
3. Address review feedback promptly
4. Once approved, maintainers will merge your PR

## 💬 Getting Help

- Open an issue for questions or discussions
- Join our Discord community *(coming soon)*
- Check existing issues and documentation first

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Maintain professionalism

## 🎯 Priority Areas

We're particularly interested in contributions in these areas:
- Additional state transition primitives
- Performance optimizations
- More comprehensive invariant tests
- Integration examples with AI systems
- Documentation improvements

## 📄 License

By contributing to SafeChange Core, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make AI-driven software safer! 🚀
