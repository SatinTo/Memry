# Memry
Flash Card, Quiz based cross-platform app created by ReactJS on top on Ionic + Capacitor Framework


## Versioning Guideline
The versioning will be generated automatically. This section is for reference only.

Format: `MAJOR.MINOR.PATCH` >>> (e.g. `10.2.41`)

The commit contains the following structural elements, to communicate intent to the consumers of your library:

1. fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
2. feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
3. BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of commits of any type.
4. types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
5. footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.
Additional types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE).


## Commit Conventions

### Format of commit message
```html
<type>(<scope>): <subject>

<body>

<footer>
```

### Definitions

| Type  | Description  |
|---|---|
| `chore`  | updating grunt tasks etc; no production code change. "grunt task" means nothing that an external user would see  |
| `ci`  | to identify development changes related to the continuous integration and deployment system - involving scripts, configurations or tools  |
| `docs`  | to identify documentation changes related to the project - whether intended externally for the end users (in case of a library) or internally for the developers.  |
| `feat`  | to identify production changes related to new backward-compatible abilities or functionality |
| `fix`  | to identify production changes related to backward-compatible bug fixes |
| `perf`  | to identify production changes related to backward-compatible performance improvements  |
| `refactor`  | to identify development changes related to modifying the codebase, which neither adds a feature nor fixes a bug - such as removing redundant code, simplifying the code, renaming variables, etc. |
| `style`  | to identify development changes related to styling the codebase, regardless of the meaning - such as indentations, semi-colons, quotes, trailing commas and so on. |
| `test`  | to identify development changes related to tests - such as refactoring existing tests or adding new tests. |


### Examples

Commit message with description and breaking change footer
```
feat: allow provided config object to extend other configs
BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

Commit message with ! to draw attention to breaking change
```
refactor!: drop support for Node 6
```

Commit message with both ! and BREAKING CHANGE footer
```
refactor!: drop support for Node 6

BREAKING CHANGE: refactor to use JavaScript features not available in Node 6.
```

Commit message with no body
```
docs: correct spelling of CHANGELOG
```

Commit message with scope

```
feat(lang): add polish language
```

Commit message with multi-paragraph body and multiple footers
```
fix: correct minor typos in code

see the issue for details

on typos fixed.

Reviewed-by: Z
Refs #133
```
