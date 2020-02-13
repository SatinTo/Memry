# Memry
Flash Card, Quiz based cross-platform app created by ReactJS on top on Ionic + Capacitor Framework


## Versioning Guideline
Format: MAJOR.MINOR.PATCH >>> (e.g. 10.2.41)

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
2. feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
3. BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of commits of any type.
4. types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
5. footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.
Additional types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE).


## Commit Conventions
### chore
updating grunt tasks etc; no production code change. "grunt task" means nothing that an external user would see

### ci
The `ci` type is used to identify development changes related to the continuous integration and deployment system - involving scripts, configurations or tools.

### docs
The `docs` type is used to identify documentation changes related to the project - whether intended externally for the end users (in case of a library) or internally for the developers.

### feat
The feat type is used to identify production changes related to new backward-compatible abilities or functionality.

### fix
The fix type is used to identify production changes related to backward-compatible bug fixes.

### perf
The perf type is used to identify production changes related to backward-compatible performance improvements.

### refactor
The refactor type is used to identify development changes related to modifying the codebase, which neither adds a feature nor fixes a bug - such as removing redundant code, simplifying the code, renaming variables, etc.

### style
The style type is used to identify development changes related to styling the codebase, regardless of the meaning - such as indentations, semi-colons, quotes, trailing commas and so on.

### test
The test type is used to identify development changes related to tests - such as refactoring existing tests or adding new tests.
