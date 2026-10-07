# Contributing

Thanks for helping make quantum computing easier to learn. The most valuable contributions are reports of anything wrong or confusing.

## Report a problem

- **A lesson is wrong or unclear:** use the "Report it on GitHub" link at the bottom of any lesson, or open a [content error](https://github.com/tarakparikhio/QIP/issues/new?template=content-error.yml) issue. Quote the sentence or equation and, if you can, point to a source.
- **Something on the site is broken:** open a [bug report](https://github.com/tarakparikhio/QIP/issues/new?template=bug.yml) with the page URL and steps to reproduce.

## Change the code or content

1. Fork the repository and create a branch.
2. Install and run the site:

   ```bash
   npm --prefix website install
   npm --prefix website run dev   # http://localhost:3000
   ```

3. Before opening a pull request, run the same checks as CI:

   ```bash
   npm --prefix website run check:full
   ```

4. Keep explanations plain and accurate. Lesson authoring rules live in [`.github/instructions/lesson-authoring.instructions.md`](.github/instructions/lesson-authoring.instructions.md). Do not rename the `qcpath-progress` storage key, because that resets every learner's progress.

## License

By contributing, you agree that code is released under the [MIT License](LICENSE) and written learning material under [CC BY 4.0](LICENSE-CONTENT.md).
