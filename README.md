# TypeScript Starters

![](https://github.com/hanggrian/typescript-starters/raw/assets/logo.png)

Common Node project templates with emphasis on **TypeScript,** separated by
target platform and kind of distribution.

| | Testing | Publishing | Website
--- | :---: | :---: | :---:
react-app | [Vitest] | &cross; | [Just the Docs]
react-library | [Vitest] | [Package Manager] | [TypeDoc], [Just the Docs]

## Frameworks

- Vitest testing framework for [Vite](https://vite.dev/) build tool.
- [ESLint](https://eslint.org/) code linter.
- Coverage command included in Vitest.

## Project layout

- Root directory:
  - GitHub [README](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes/),
    [LICENSE](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository/),
    and [gitignore](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files/)
    file.
  - [EditorConfig](https://editorconfig.org/) enforces IDE settings.
  - [CircleCI](https://circleci.com/) to run test every commit, also triggers
    [Codecov](https://codecov.io/) coverage.
- Website module:
  - [Jekyll](https://jekyllrb.com/) for generating webpages displaying README
    and other content.
  - The webpages are manually deployed with `jekyll build`.

[Vitest]: https://vitest.dev/
[Package Manager]: https://www.npmjs.com/
[TypeDoc]: https://typedoc.org/
[Just the Docs]: https://just-the-docs.com/
