# Contributing to SafeChange Core

Thank you for your interest in contributing to SafeChange Core! We welcome contributions from serious collaborators who are committed to advancing AI safety and system integrity.

## ⚖️ Important: License Agreement

**Before contributing, please understand:**

SafeChange Core is licensed under a **proprietary license**, not an open-source license. By contributing to this project, you:

1. **Grant Rights:** You grant SafeChange Core maintainers perpetual, worldwide, non-exclusive rights to use, modify, and distribute your contributions under the project's proprietary license. Contributors retain ownership of their original contributions but grant necessary rights for project use.
2. **Acknowledge Ownership:** You acknowledge that the project maintainers retain control over licensing decisions for the combined work
3. **Confirm Originality:** You confirm that your contributions are your original work or that you have the right to submit them
4. **Accept Terms:** You accept that your contributions may be used in commercial offerings and licensed products

If you are contributing on behalf of your employer, ensure you have permission to contribute under these terms.

## 🌟 Becoming a Serious Collaborator

We prioritize contributions from individuals and organizations that demonstrate:

- **Long-term commitment** to AI safety and system integrity
- **Technical expertise** in relevant domains (AI, formal verification, type systems, etc.)
- **Quality contributions** that align with project goals
- **Financial support** or other forms of project investment (optional but valued)

### Recognized Collaborator Benefits

Serious collaborators who make significant contributions receive:

✅ **Recognition** in project documentation and marketing materials  
✅ **Extended license rights** for their own projects and organizations  
✅ **Priority voice** in architectural and roadmap decisions  
✅ **Early access** to new features and beta releases  
✅ **Direct communication** with project maintainers  
✅ **Co-authorship** opportunities on publications and presentations

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

By contributing to SafeChange Core, you agree that your contributions will be licensed under the project's proprietary license. Contributors do not retain licensing rights over their contributions but are acknowledged for their work.

For commercial use of your own contributions, you may request an extended license. Contact jaityagi11@gmail.com for licensing inquiries.

---

## 💰 Financial Support

While not required, financial support through [GitHub Sponsors](https://github.com/sponsors/jaityagi11) or direct donations:
- Demonstrates serious commitment to the project
- Helps fund ongoing development and maintenance
- May result in priority licensing consideration
- Provides access to enhanced support and benefits

For corporate sponsorship opportunities, contact: jaityagi11@gmail.com

---

Thank you for helping make AI-driven software safer! 🚀

For licensing, partnership, or investment inquiries:  
**Email:** jaityagi11@gmail.com
